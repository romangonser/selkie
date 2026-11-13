# Clou – My Style

Mobile Web-App-Prototyp (Lookbook · Dress Me · Kleiderschrank) nach dem Figma-Design-System.

## Lokal starten
```bash
npm install
npm run dev
```
Am Handy im selben WLAN die "Network"-Adresse aus der Konsole öffnen (z. B. `http://192.168.x.x:5173`).

## Für das Team online stellen (empfohlen: Vercel)
1. Repo auf GitHub anlegen und pushen.
2. Auf vercel.com mit GitHub anmelden → **Add New → Project** → dieses Repo importieren.
   Framework "Vite" wird erkannt (Build `npm run build`, Output `dist`).
3. Jeder Push auf `main` aktualisiert die Live-URL; jeder Pull Request bekommt eine eigene Vorschau-URL zum Testen am Handy.
4. Am Handy: URL öffnen → Teilen → **Zum Home-Bildschirm** (läuft dann wie eine App).

## Mitarbeiten
Regeln für Änderungen stehen in `CLAUDE.md` (Design-System ist verbindlich).
