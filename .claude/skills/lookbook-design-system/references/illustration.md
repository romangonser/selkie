# Mannequin & Kleider

## Mannequin
- Quelle: Vorlagen des Users auf der Page Design-System (`mannequin-vorlage-frau-front 1` 38:771,
  `mannequin-vorlage-mann-front 1` 38:776). Originale nicht verändern.
- Komponente **`Mannequin`** (Set 47:95, Page Design-System): `Body=Frau` 47:85 · `Body=Mann` 47:90.
  390×646 (= Dress-Me-Core), Figur 610 hoch, oben 18, zentriert (x = 195).
  Outline `border/strong` + `border/illustration`, keine Fläche (transparent).
- Dress Me nutzt standardmässig `Body=Frau`.

## Körperlinien Frau (Core-Koordinaten 390×646)
Kopf 18–96 · Schulterlinie y ≈ 122 (x 138–254, Breite ≈ 116) · Achsel ≈ 176 · Taille ≈ 236 ·
Hüfte ≈ 306 (Breite ≈ 120) · Schritt ≈ 316 · Knie ≈ 456 · Knöchel ≈ 600 · Fussende ≈ 630. Mittelachse x = 195.

## Kleider = Bilder der Page **Assets** (23:684)
Ordner-Frames: Jacke · Pullover / Hemden Second Layer · Shirts / Hemden first Layer · Hosen / Rock · Schuhe ·
Kleid · Accesoires. Jedes Teil ist ein Frame (Fill unsichtbar) mit transparentem Bild.

### Passregeln (proportional, an Mittelachse zentriert)
| Typ | Grösse | Oberkante |
|---|---|---|
| Shirt / T-Shirt mit Ärmeln | Breite 176 | y 116 |
| Träger-Top | Breite 118 | y 126 |
| Korsett / trägerlos | Breite 124 | y 158 |
| Jacke / Cardigan / Blazer | Breite 186 | y 114 |
| Lange Hose / Jeans | Höhe ≈ 366 | y 230–232 (Taille) |
| Rock | Breite 160 | y 232 |
| Shorts | Breite 150 | y 232 |
| Kleid | Höhe bis Knie (≈ 350) | y 116 |
| Schuhe | Breite 84 (schmale 50) | Unterkante y ≈ 632 |
Neue Teile nach diesen Regeln einsetzen; Bild nie verzerren (nur `rescale`).

### Reihen-Zonen (Garment Rows)
Container: Padding oben 96, Gap `space/s`, `itemReverseZIndex = true` (Oberteile liegen über Hosen).
Oberteil y 96–296 (H 200) · Hose y 304–584 (H 280) · Schuhe y 592–646 (H 54).
Im Track: `x = 171 − Breite/2 + k·230`, `y = Oberkante − Zonen-Oberkante`.
