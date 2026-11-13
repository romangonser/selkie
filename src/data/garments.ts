// Kleider = Bilder der Figma-Page "Assets", proportional auf Mannequin Frau gesetzt.
// Koordinaten im Dress-Me-Core (390×646), Mittelachse x = 195. Passregeln: siehe Skill illustration.md.
export type Garment = {
  id: string
  name: string
  kategorie: string
  src: string
  nat: [number, number]       // natürliche Bildgrösse (Figma-Frame)
  width?: number              // Zielbreite …
  height?: number             // … oder Zielhöhe
  top?: number                // Oberkante (Core-y) …
  bottom?: number             // … oder Unterkante (Schuhe)
}

const g = (p: Garment) => p
export const OBERTEILE: Garment[] = [
  g({ id: 'tshirt-schwarz', name: 'Schwarzes T-Shirt', kategorie: 'Shirt', src: 'garments/tshirt-schwarz.png', nat: [327, 365], width: 176, top: 116 }),
  g({ id: 'top-pink', name: 'Pinkes Top', kategorie: 'Top', src: 'garments/top-pink.png', nat: [218, 329], width: 118, top: 126 }),
  g({ id: 'korsett-creme', name: 'Cremefarbenes Korsett', kategorie: 'Korsett', src: 'garments/korsett-creme.png', nat: [251, 350], width: 124, top: 158 }),
  g({ id: 'cardigan-rosa', name: 'Rosa Cardigan', kategorie: 'Jacke', src: 'garments/cardigan-rosa.png', nat: [276, 402], width: 186, top: 114 }),
]
export const HOSEN: Garment[] = [
  g({ id: 'hose-weit-schwarz', name: 'Schwarze weite Hose', kategorie: 'Hose', src: 'garments/hose-weit-schwarz.png', nat: [191, 362], height: 366, top: 232 }),
  g({ id: 'jeans-blau', name: 'Blaue Jeans', kategorie: 'Hose', src: 'garments/jeans-blau.png', nat: [159, 404], height: 368, top: 230 }),
  g({ id: 'rock-gestreift', name: 'Gestreifter Rock', kategorie: 'Rock', src: 'garments/rock-gestreift.png', nat: [232, 345], width: 160, top: 232 }),
  g({ id: 'shorts-beige', name: 'Beige Shorts', kategorie: 'Shorts', src: 'garments/shorts-beige.png', nat: [377, 347], width: 150, top: 232 }),
]
export const SCHUHE: Garment[] = [
  g({ id: 'sneaker-creme', name: 'Cremefarbener Sneaker', kategorie: 'Schuhe', src: 'garments/sneaker-creme.png', nat: [345, 232], width: 84, bottom: 632 }),
  g({ id: 'ballettschuh-rosa', name: 'Rosa Ballettschuh', kategorie: 'Schuhe', src: 'garments/ballettschuh-rosa.png', nat: [185, 381], width: 50, bottom: 634 }),
  g({ id: 'ballerina-beige', name: 'Beiger Ballerina', kategorie: 'Schuhe', src: 'garments/ballerina-beige.png', nat: [320, 146], width: 84, bottom: 632 }),
]

/** Grösse + Position eines Teils im Core berechnen (ohne Verzerrung). */
export function fit(gm: Garment) {
  const [nw, nh] = gm.nat
  const w = gm.width ?? (gm.height! * nw) / nh
  const h = (w * nh) / nw
  const y = gm.bottom !== undefined ? gm.bottom - h : gm.top!
  return { w, h, x: 195 - w / 2, y }
}

// Reihen-Zonen (Core-y): Oberteil 96–296 · Hose 304–584 · Schuhe 592–646
export const ZONES = [
  { key: 'oberteil', label: 'Oberteil', y: 96, h: 200, items: OBERTEILE },
  { key: 'hose', label: 'Hose', y: 304, h: 280, items: HOSEN },
  { key: 'schuhe', label: 'Schuhe', y: 592, h: 54, items: SCHUHE },
] as const
