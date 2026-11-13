# Tokens (Variablen)

Schnappschuss vom 2026-11-13. **Live-Werte aus Figma haben Vorrang** – bei Abweichung diese Datei nachführen.

## Collection `Palette` (Primitives, Mode "Value", scopes = [] / versteckt)

| Variable | Hex | Gruppe | Rolle |
|---|---|---|---|
| `ink` | `#091516` | Main | Text, Primary-Button, Linien |
| `cream` | `#F4F1EF` | Main | App-Hintergrund, Bild-Platzhalter |
| `white` | `#FFFFFF` | Fläche | Cards, Illustrations-Haut |
| `rose` | `#DCB8BB` | Accent | Highlight-Cards, Pressed-Fläche, feine Linien |
| `ochre` | `#A18443` | Accent | Accent-Button, Deko |
| `lavender` | `#8686A2` | Accent | Tags, Disabled |
| `red` | `#C50D10` | Status | Error |
| `green` | `#2A9B4C` | Status | Success (nur Icons/Linien/Flächen – weisser Text darauf ist zu kontrastarm) |
| `orange` | `#E25D21` | Accent | Highlights, Badges (über `bg/highlight`). Text darauf `text/primary` – weiss ist zu kontrastarm |

Code-Syntax: `var(--palette-<name>)`. Palette wird **nur** von Tokens referenziert, nie direkt in Screens.

## Collection `Tokens` (semantisch, Mode "Value")

### Farbe
| Token | → Palette | Scopes | Verwendung |
|---|---|---|---|
| `bg/app` | cream | Frame/Shape Fill | Screen-Hintergrund |
| `bg/surface` | white | Frame/Shape Fill | Cards, Illustrations-Flächen |
| `bg/inverse` | ink | Frame/Shape Fill | Primary-Button, Ink-Card |
| `bg/accent` | ochre | Frame/Shape Fill | Accent-Button, Deko-Kreis |
| `bg/soft` | rose | Frame/Shape Fill | Blush-Card, Outline-Pressed |
| `bg/placeholder` | cream | Frame/Shape Fill | Bildflächen in Cards |
| `bg/tag` | lavender | Frame/Shape Fill | Tags, Illustrations-Fläche |
| `bg/highlight` | orange | Frame/Shape Fill, Stroke | Highlights, Badges, kleine Akzente (sparsam) |
| `text/primary` | ink | Text Fill | Standardtext |
| `text/inverse` | white | Text Fill | Text auf ink |
| `text/accent` | ochre | Text Fill | nur grosse Schrift (Kontrast) |
| `border/strong` | ink | Stroke | Konturen, Divider, Illustrations-Outline |
| `border/subtle` | rose | Stroke | feine Konturen (Default-Card, Swatches, Tiles) |
| `state/disabled` | lavender | Text Fill, Stroke | Disabled-Kontur und -Text |
| `status/error` | red | Fill, Text, Stroke | Fehler |
| `status/success` | green | Fill, Text, Stroke | Erfolg |
| `icon/primary` | ink | Fill, Stroke | Icons |

### Zahlen
| Token | Wert | Scopes | Verwendung |
|---|---|---|---|
| `radius/card` | 4 | Corner Radius | Cards, Tiles |
| `radius/button` | 4 | Corner Radius | Buttons, Icon-Buttons |
| `radius/pill` | 999 | Corner Radius | nur Chips (Filter) – ganz abgerundet |
| `space/xs` | 4 | Gap, Width/Height | eng |
| `space/s` | 8 | Gap, Width/Height | Button-Gap, Chips-Gap, Card-Padding |
| `space/m` | 16 | Gap, Width/Height | Grid-Gap, Small-Button-Padding |
| `space/l` | 24 | Gap, Width/Height | Screen-Rand, Card-Look-Padding, Sektionen |
| `space/xl` | 32 | Gap, Width/Height | grosse Abstände |
| `border/width` | 1 | Stroke Weight | alle UI-Konturen, Icons |
| `border/illustration` | 1.5 | Stroke Weight | Mannequin, Kleider |

Code-Syntax: `var(--<token mit / → ->)`, z. B. `var(--bg-app)`, `var(--radius-card)`.

## Regeln
- Neue Variable: in `Tokens` (semantisch) oder `Palette` (neue Grundfarbe), **explizite Scopes**, WEB-Code-Syntax.
- Farbkontrast: Text auf `bg/accent` = `text/primary` (nicht weiss). `text/accent` nur ≥ 22px.
- Kein neuer Wert ohne Rücksprache, wenn ein bestehender passt.
