/* =====================================================================
   Freisteller für Kleidungsstücke
   ---------------------------------------------------------------------
   Erkennt das Kleidungsstück auf einem Foto mit einem KI-Modell (IS-Net,
   «isnet-general-use», Apache-2.0) und macht alles rundherum durchsichtig.
   Läuft komplett im Browser (onnxruntime-web, WebAssembly) – das Foto
   verlässt das Gerät nicht.

   Ablauf:
   1. Foto auf 1024 × 1024 skalieren, normalisieren, Modell ausführen
   2. Maske aufräumen: Rauschen weg, nur das Kleidungsstück (und z. B. den
      zweiten Schuh) behalten, kleine Löcher füllen, Kanten weich
   3. Maske auf Fotogrösse bringen, Hintergrund transparent, zuschneiden

   Ohne Internet oder wenn das Modell nicht lädt, wird automatisch die
   einfache Methode (Randfarbe) verwendet.

   Verwendung:
     const erg = await Freisteller.freistellen(dateiOderBild, { fortschritt: (text, anteil) => … });
     // erg = { canvas, dataUrl, methode: "ki" | "einfach" } oder null
   ===================================================================== */
(function (global) {
  "use strict";

  const KONFIG = {
    ortVersion: "1.20.1",
    // onnxruntime-web liegt bei der App (assets/ort/), damit nichts von fremden Servern nötig ist
    ortBasis: global.FREISTELLER_ORT_BASE || "assets/ort/",
    // Modell (IS-Net, 8-Bit, ca. 46 MB) in 4 Teilen à max. 12 MB, damit jeder Hoster es annimmt
    modellTeile: global.FREISTELLER_MODELL_TEILE || [0, 1, 2, 3].map((i) => "assets/modelle/isnet-q8.teil" + i + ".bin"),
    groesse: 1024,          // Eingangsgrösse des Modells
    maxSeite: 1600,         // Arbeitsgrösse des Fotos (längste Seite)
    cacheName: "lookbook-freisteller-v1",
  };

  // ---------- onnxruntime-web und Modell laden (einmal, danach im Cache) ----------
  let sitzungPromise = null;

  function skriptLaden(src) {
    return new Promise((ok, fehl) => {
      if (global.ort) return ok();
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => ok();
      s.onerror = () => fehl(new Error("onnxruntime-web konnte nicht geladen werden"));
      document.head.appendChild(s);
    });
  }

  async function modellHolen(fortschritt) {
    const basis = global.location ? global.location.href : undefined;
    const urls = KONFIG.modellTeile.map((t) => new URL(t, basis).href);
    const schluessel = urls[0] + "#ganz";
    let cache = null;
    try { cache = await caches.open(KONFIG.cacheName); } catch (f) { cache = null; }
    if (cache) {
      const treffer = await cache.match(schluessel);
      if (treffer) return new Uint8Array(await treffer.arrayBuffer());
    }
    // Teile nacheinander laden, Fortschritt über alle Teile
    const teile = [];
    let geladen = 0;
    const geschaetzt = 46 * 1000 * 1000;
    for (const url of urls) {
      const antwort = await fetch(url);
      if (!antwort.ok) throw new Error("Modell nicht gefunden (" + antwort.status + ")");
      if (antwort.body && fortschritt) {
        const leser = antwort.body.getReader();
        const stuecke = [];
        for (;;) {
          const { done, value } = await leser.read();
          if (done) break;
          stuecke.push(value);
          geladen += value.length;
          fortschritt("KI wird einmalig geladen … " + Math.min(99, Math.round((geladen / geschaetzt) * 100)) + " %", geladen / geschaetzt);
        }
        teile.push(...stuecke);
      } else {
        const b = new Uint8Array(await antwort.arrayBuffer());
        geladen += b.length;
        teile.push(b);
      }
    }
    const gesamt = teile.reduce((a, t) => a + t.length, 0);
    const puffer = new Uint8Array(gesamt);
    let pos = 0;
    for (const t of teile) { puffer.set(t, pos); pos += t.length; }
    if (cache) {
      try { await cache.put(schluessel, new Response(puffer, { headers: { "Content-Type": "application/octet-stream" } })); } catch (f) { /* Speicher voll: egal */ }
    }
    return puffer;
  }

  function sitzung(fortschritt) {
    if (!sitzungPromise) {
      sitzungPromise = (async () => {
        await skriptLaden(new URL(KONFIG.ortBasis + "ort.wasm.min.js", global.location.href).href);
        const ort = global.ort;
        ort.env.wasm.wasmPaths = new URL(KONFIG.ortBasis, global.location.href).href;
        // Mehrere Threads gehen nur mit speziellen Server-Headern; GitHub Pages hat die nicht.
        ort.env.wasm.numThreads = global.crossOriginIsolated ? Math.min(4, navigator.hardwareConcurrency || 2) : 1;
        const modell = await modellHolen(fortschritt);
        return ort.InferenceSession.create(modell, { executionProviders: ["wasm"], graphOptimizationLevel: "all" });
      })().catch((f) => { sitzungPromise = null; throw f; });
    }
    return sitzungPromise;
  }

  // ---------- Bild laden ----------
  function bildLaden(quelle) {
    if (quelle instanceof HTMLImageElement || quelle instanceof HTMLCanvasElement) return Promise.resolve(quelle);
    return new Promise((ok, fehl) => {
      const url = URL.createObjectURL(quelle);
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); ok(img); };
      img.onerror = () => { URL.revokeObjectURL(url); fehl(new Error("Das Foto konnte nicht gelesen werden.")); };
      img.src = url;
    });
  }

  function leinwand(w, h) {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    return c;
  }

  // ---------- Maske nachbearbeiten (reine Funktion, auch ohne Browser testbar) ----------
  // roh: Float32Array (w*h), Werte 0..1. Gibt Float32Array zurück (Alpha 0..1).
  function maskeNachbearbeiten(roh, w, h) {
    const n = w * h;
    // 1. auf 0..1 strecken
    let min = Infinity, max = -Infinity;
    for (let i = 0; i < n; i++) { const v = roh[i]; if (v < min) min = v; if (v > max) max = v; }
    const m = new Float32Array(n);
    const span = max - min || 1;
    for (let i = 0; i < n; i++) m[i] = (roh[i] - min) / span;

    // 2. zusammenhängende Flächen finden (Schwelle 0.5)
    const lab = new Int32Array(n);
    const groessen = [0];
    const stapel = new Int32Array(n);
    let anzahl = 0;
    for (let i = 0; i < n; i++) {
      if (lab[i] || m[i] <= 0.5) continue;
      anzahl++;
      let sp = 0, g = 0;
      stapel[sp++] = i; lab[i] = anzahl;
      while (sp) {
        const p = stapel[--sp]; g++;
        const x = p % w;
        if (x > 0 && !lab[p - 1] && m[p - 1] > 0.5) { lab[p - 1] = anzahl; stapel[sp++] = p - 1; }
        if (x < w - 1 && !lab[p + 1] && m[p + 1] > 0.5) { lab[p + 1] = anzahl; stapel[sp++] = p + 1; }
        if (p >= w && !lab[p - w] && m[p - w] > 0.5) { lab[p - w] = anzahl; stapel[sp++] = p - w; }
        if (p < n - w && !lab[p + w] && m[p + w] > 0.5) { lab[p + w] = anzahl; stapel[sp++] = p + w; }
      }
      groessen.push(g);
    }
    if (!anzahl) return m;
    // 3. nur grosse Flächen behalten (das Teil, beim Schuhpaar beide Schuhe) – Rauschen fällt weg
    let groesste = 0;
    for (let k = 1; k <= anzahl; k++) if (groessen[k] > groesste) groesste = groessen[k];
    const behalten = new Uint8Array(anzahl + 1);
    for (let k = 1; k <= anzahl; k++) behalten[k] = groessen[k] >= groesste * 0.12 ? 1 : 0;
    let keep = new Uint8Array(n);
    for (let i = 0; i < n; i++) keep[i] = lab[i] && behalten[lab[i]] ? 1 : 0;

    // 4. kleine Löcher im Teil füllen (Hintergrund, der nicht mit dem Rand verbunden ist und klein ist)
    const flaeche = keep.reduce((a, b) => a + b, 0);
    const loch = new Int32Array(n);
    let lochNr = 0;
    for (let i = 0; i < n; i++) {
      if (keep[i] || loch[i]) continue;
      lochNr++;
      let sp = 0, g = 0, randBeruehrt = false;
      const start = sp;
      stapel[sp++] = i; loch[i] = lochNr;
      const pixel = [];
      while (sp > start) {
        const p = stapel[--sp]; g++; pixel.push(p);
        const x = p % w, y = (p / w) | 0;
        if (x === 0 || y === 0 || x === w - 1 || y === h - 1) randBeruehrt = true;
        if (x > 0 && !keep[p - 1] && !loch[p - 1]) { loch[p - 1] = lochNr; stapel[sp++] = p - 1; }
        if (x < w - 1 && !keep[p + 1] && !loch[p + 1]) { loch[p + 1] = lochNr; stapel[sp++] = p + 1; }
        if (p >= w && !keep[p - w] && !loch[p - w]) { loch[p - w] = lochNr; stapel[sp++] = p - w; }
        if (p < n - w && !keep[p + w] && !loch[p + w]) { loch[p + w] = lochNr; stapel[sp++] = p + w; }
      }
      if (!randBeruehrt && g < flaeche * 0.003) for (const p of pixel) keep[p] = 1;
    }

    // 5. Bereich leicht erweitern (weiche Kanten behalten) und Kern bestimmen
    const weit = morph(keep, w, h, 3, true);
    const kern = morph(keep, w, h, 4, false);
    const out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      if (!weit[i]) { out[i] = 0; continue; }
      out[i] = kern[i] ? 1 : m[i];   // im Inneren des Teils immer ganz deckend (keine Sprenkel)
    }
    return out;
  }

  // Dilatation (wachsen=true) bzw. Erosion mit quadratischem Fenster, getrennt in x und y
  function morph(src, w, h, r, wachsen) {
    const tmp = new Uint8Array(w * h), out = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let v = wachsen ? 0 : 1;
        for (let k = -r; k <= r; k++) {
          const xx = x + k;
          const s = xx < 0 || xx >= w ? (wachsen ? 0 : 0) : src[y * w + xx];
          if (wachsen ? s : !s) { v = wachsen ? 1 : 0; break; }
        }
        tmp[y * w + x] = v;
      }
    }
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let v = wachsen ? 0 : 1;
        for (let k = -r; k <= r; k++) {
          const yy = y + k;
          const s = yy < 0 || yy >= h ? 0 : tmp[yy * w + x];
          if (wachsen ? s : !s) { v = wachsen ? 1 : 0; break; }
        }
        out[y * w + x] = v;
      }
    }
    return out;
  }

  // ---------- KI-Freistellung ----------
  async function kiMaske(bildCanvas, fortschritt) {
    const s = await sitzung(fortschritt);
    const ort = global.ort;
    const N = KONFIG.groesse;
    fortschritt && fortschritt("Kleidungsstück wird erkannt …", null);
    const c = leinwand(N, N);
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(bildCanvas, 0, 0, N, N);
    const px = ctx.getImageData(0, 0, N, N).data;
    // Normalisierung wie beim Training: Wert / Maximum − 0.5
    let mx = 1;
    for (let i = 0; i < px.length; i += 4) { if (px[i] > mx) mx = px[i]; if (px[i + 1] > mx) mx = px[i + 1]; if (px[i + 2] > mx) mx = px[i + 2]; }
    const daten = new Float32Array(3 * N * N);
    for (let i = 0, j = 0; i < px.length; i += 4, j++) {
      daten[j] = px[i] / mx - 0.5;
      daten[N * N + j] = px[i + 1] / mx - 0.5;
      daten[2 * N * N + j] = px[i + 2] / mx - 0.5;
    }
    const eingabe = new ort.Tensor("float32", daten, [1, 3, N, N]);
    const ergebnis = await s.run({ [s.inputNames[0]]: eingabe });
    const roh = ergebnis[s.outputNames[0]].data;   // erster Ausgang = feinste Maske
    return maskeNachbearbeiten(roh, N, N);
  }

  // ---------- einfache Methode (Fallback ohne KI) ----------
  function einfacheMaske(bildCanvas) {
    const N = 512;
    const c = leinwand(N, N);
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(bildCanvas, 0, 0, N, N);
    const p = ctx.getImageData(0, 0, N, N).data;
    const n = N * N;
    let r = 0, g = 0, b = 0, k = 0;
    const rand = [];
    for (let x = 0; x < N; x++) rand.push(x, x + (N - 1) * N);
    for (let y = 0; y < N; y++) rand.push(y * N, y * N + N - 1);
    rand.forEach((i) => { r += p[i * 4]; g += p[i * 4 + 1]; b += p[i * 4 + 2]; k++; });
    r /= k; g /= k; b /= k;
    const nah = (i) => { const dr = p[i * 4] - r, dg = p[i * 4 + 1] - g, db = p[i * 4 + 2] - b; return dr * dr + dg * dg + db * db < 52 * 52; };
    const weg = new Uint8Array(n), st = [];
    rand.forEach((i) => { if (!weg[i] && nah(i)) { weg[i] = 1; st.push(i); } });
    while (st.length) {
      const i = st.pop(), x = i % N;
      for (const j of [x > 0 ? i - 1 : -1, x < N - 1 ? i + 1 : -1, i - N, i + N]) if (j >= 0 && j < n && !weg[j] && nah(j)) { weg[j] = 1; st.push(j); }
    }
    const roh = new Float32Array(n);
    for (let i = 0; i < n; i++) roh[i] = weg[i] ? 0 : 1;
    return { maske: maskeNachbearbeiten(roh, N, N), groesse: N };
  }

  // ---------- Maske anwenden, zuschneiden ----------
  function anwenden(bildCanvas, maske, N) {
    const W = bildCanvas.width, H = bildCanvas.height;
    // Maske als Graustufenbild auf Fotogrösse skalieren (weich interpoliert)
    const mc = leinwand(N, N);
    const mctx = mc.getContext("2d");
    const mid = mctx.createImageData(N, N);
    for (let i = 0; i < N * N; i++) { const v = Math.round(maske[i] * 255); mid.data[i * 4] = v; mid.data[i * 4 + 1] = v; mid.data[i * 4 + 2] = v; mid.data[i * 4 + 3] = 255; }
    mctx.putImageData(mid, 0, 0);
    const gross = leinwand(W, H);
    const gctx = gross.getContext("2d", { willReadFrequently: true });
    gctx.imageSmoothingEnabled = true;
    gctx.imageSmoothingQuality = "high";
    gctx.drawImage(mc, 0, 0, W, H);
    const alpha = gctx.getImageData(0, 0, W, H).data;

    const ctx = bildCanvas.getContext("2d", { willReadFrequently: true });
    const bild = ctx.getImageData(0, 0, W, H);
    const d = bild.data;
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        // leicht steilere Kante: halbtransparente Säume vom Hintergrund verschwinden
        let a = alpha[i] / 255;
        a = a < 0.08 ? 0 : a > 0.92 ? 1 : (a - 0.08) / 0.84;
        d[i + 3] = Math.round(a * 255);
        if (a > 0.1) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      }
    }
    ctx.putImageData(bild, 0, 0);
    if (x1 < 0) return null;
    const pad = Math.round(Math.max(W, H) * 0.01) + 2;
    x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(W - 1, x1 + pad); y1 = Math.min(H - 1, y1 + pad);
    const z = leinwand(x1 - x0 + 1, y1 - y0 + 1);
    z.getContext("2d").drawImage(bildCanvas, x0, y0, z.width, z.height, 0, 0, z.width, z.height);
    return z;
  }

  function alsDataUrl(c) {
    let d = c.toDataURL("image/webp", 0.85);
    if (d.indexOf("data:image/webp") !== 0) d = c.toDataURL("image/png");
    return d;
  }

  // ---------- öffentliche Funktion ----------
  async function freistellen(quelle, optionen) {
    const fortschritt = (optionen && optionen.fortschritt) || null;
    const img = await bildLaden(quelle);
    const f = Math.min(1, KONFIG.maxSeite / Math.max(img.width, img.height));
    const c = leinwand(Math.max(1, Math.round(img.width * f)), Math.max(1, Math.round(img.height * f)));
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);

    let maske, N, methode = "ki";
    if (!(optionen && optionen.nurEinfach)) {
      try {
        maske = await kiMaske(c, fortschritt);
        N = KONFIG.groesse;
      } catch (fehler) {
        console.warn("KI-Freistellung nicht möglich, nehme einfache Methode:", fehler);
        maske = null;
      }
    }
    if (!maske) {
      methode = "einfach";
      const e = einfacheMaske(c);
      maske = e.maske; N = e.groesse;
    }
    const z = anwenden(c, maske, N);
    if (!z) return null;
    return { canvas: z, dataUrl: alsDataUrl(z), methode };
  }

  // Modell schon im Hintergrund laden (z. B. wenn «Neues Teil» geöffnet wird)
  function vorladen(fortschritt) { return sitzung(fortschritt).then(() => true, () => false); }

  global.Freisteller = { freistellen, vorladen, maskeNachbearbeiten, KONFIG };
})(typeof window !== "undefined" ? window : globalThis);
