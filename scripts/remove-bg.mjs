// Entfernt den weissen Hintergrund von Kleider-Bildern (Flood-Fill von den Rändern aus).
// Nutzung: node scripts/remove-bg.mjs public/garments/*.png
// Nur zusammenhängendes Weiss, das den Rand berührt, wird transparent – helle Stellen im Kleidungsstück bleiben.
import fs from 'node:fs'
import { PNG } from 'pngjs'

const THRESH = 238   // ab diesem Helligkeitswert gilt ein Pixel als "Hintergrund-Weiss"
const SOFT = 220     // zwischen SOFT und THRESH: weicher Übergang am Rand

for (const file of process.argv.slice(2)) {
  const png = PNG.sync.read(fs.readFileSync(file))
  const { width: w, height: h, data } = png
  const lum = i => Math.min(data[i], data[i + 1], data[i + 2])
  const seen = new Uint8Array(w * h)
  const stack = []
  const push = (x, y) => { const p = y * w + x; if (!seen[p] && lum(p * 4) >= SOFT) { seen[p] = 1; stack.push(p) } }
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1) }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y) }
  let n = 0
  while (stack.length) {
    const p = stack.pop(); const i = p * 4; const l = lum(i)
    data[i + 3] = l >= THRESH ? 0 : Math.round(255 * (THRESH - l) / (THRESH - SOFT)) * (data[i + 3] / 255)
    n++
    if (l < THRESH) continue // weiche Kante: nicht weiter ausbreiten
    const x = p % w, y = (p / w) | 0
    if (x > 0) push(x - 1, y); if (x < w - 1) push(x + 1, y)
    if (y > 0) push(x, y - 1); if (y < h - 1) push(x, y + 1)
  }
  fs.writeFileSync(file, PNG.sync.write(png))
  console.log(`${file}: ${n} Pixel transparent`)
}
