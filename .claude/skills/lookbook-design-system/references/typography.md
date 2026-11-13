# Typografie (lokale Textstile)

| Stil | Font | Grösse | Zeilenhöhe | Laufweite | Extra | Verwendung |
|---|---|---|---|---|---|---|
| `Display` | CoFo Cinema1909 Regular | 36 | 110% | -1% | – | Screen-Headlines, Card-Look-Titel |
| `Title` | CoFo Cinema1909 Regular | 22 | 120% | 0 | – | Sektionstitel, Item-Namen |
| `Body` | Helvetica Neue Regular | 16 | 145% | 0 | – | Fliesstext, Sublines, Beschreibungen |
| `Label` | Helvetica Neue Medium | 15 | 100% | 0 | – | Buttons (Large + Small), Swatch-Namen |
| `Caption` | Helvetica Neue Medium | 11 | 120% | 12% | UPPERCASE | Eyebrows, Kategorien, Tab-Labels, Top-Bar-Titel |

- Jeder Text hat genau einen dieser Stile, **ohne Overrides** (auch Small-Button nutzt `Label` 15).
- Textfarbe nur über `text/*` (bzw. `state/disabled`, `status/*`).
- Braucht es eine neue Stufe, zuerst als Stil anlegen und mit dem User abstimmen.
- Der User hat die Fonts lokal installiert; serverseitig sind sie **nicht ladbar** → Rezept in `figma-recipes.md`.
- Screenshots über die API zeigen diese Fonts teils nicht – Inhalt über Layer prüfen, nicht über das Bild.
