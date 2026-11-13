# Komponenten

Page **Design-System**, Section `Komponenten (Master)` 17:26: Button, Chip, Card / Item, Card / Look.
Page Design-System, eigene Rahmen: `Icons (Komponenten)`, `Mannequin`.
Page **Prototyp**, Section `Komponenten (App)` 41:147: Top Bar, Tab Bar, Garment Rows.

## Button `14:67` (18 Varianten)
Achsen `Style` = Primary | Accent | Outline · `Size` = Large | Small · `State` = Default | Pressed | Disabled.
Property `Label`. Radius `radius/button` (4).
| | Default | Pressed | Disabled |
|---|---|---|---|
| Primary | Fill `bg/inverse`, Text `text/inverse` | nur Kontur `border/strong`, Text `text/primary` | Kontur + Text `state/disabled` |
| Accent | Fill `bg/accent`, Text `text/primary` | nur Kontur ochre, Text `text/primary` | Kontur + Text `state/disabled` |
| Outline | Kontur `border/strong` | Fill `bg/soft` + Kontur | Kontur + Text `state/disabled` |
Padding Large `space/l` / Small `space/m`, Gap `space/s`, Text `Label`.

## Chip `48:726` (Filter, Kategorien, Anlässe)
`State` = Default (nur Kontur) | Active (Fill `bg/inverse`, Text `text/inverse`). Property `Label`.
**Ganz abgerundet** `radius/pill`, Kontur `border/strong` / `border/width`, Padding `space/m` × `space/s`, Text `Label`.
Für Filter immer Chip verwenden, nicht Button.

## Icon-Buttons (in Top Bar / Garment Rows)
- **Filter**: 40×40, **ohne Kontur**, ohne Fill.
- **Profil**: 40×40, **mit Kontur** `border/strong` / `border/width`, Radius `radius/button`.
- **Swipe-Pfeile** (Prev/Next in Garment Rows): 28×28, **ohne Kontur, ohne Fill**, Icon 16.
- Regel: Icon-Buttons haben keine Kontur – Ausnahme Profil.

## Top Bar `48:732` · Tab Bar `48:817`
- Top Bar: 390 breit, Filter links, Profil rechts, Padding `space/l`. In jedem Screen als Instanz.
- Tab Bar: `Active` = Lookbook | Dress Me | Kleiderschrank. Aktiv voll + Indikator, sonst 40 %.

## Card / Item `20:105`
`State` = Default (Kontur `border/subtle`) | Selected (Kontur `border/strong`).
Props `Kategorie` (Caption), `Name` (Title), `Favorit` (Boolean). Fill `bg/surface`, Radius `radius/card`,
Padding/Gap `space/s`, Bildfläche `bg/placeholder`. Auch als Look-Vorschau im Lookbook.

## Card / Look `15:45`
`Tone` = Blush (`bg/soft`) | Ink (`bg/inverse`). Props `Eyebrow`, `Titel`, `Text`. Breite 342, Padding `space/l`,
Gap `space/m`, Radius `radius/card`, Deko-Kreis `bg/accent`.

## Mannequin `47:95` · Garment Rows
Siehe `illustration.md`. Garment Rows: `Garment Row / Oberteil` 48:418 (4 Teile), `/ Hose` 48:515 (4), `/ Schuhe` 48:585 (3).
Je Variante `Item=n`: `Tile` (200 breit, Kontur `border/subtle`, `radius/card`), `Track` (Teile im Abstand 230,
`x = −(n−1)·230`), `Prev`/`Next`. Interaktionen: Pfeile Klick → vorher/nächste, Track On-Drag → nächste,
Smart Animate 300 ms Ease-Out. Kein Clipping (Nachbarteile schauen am Rand hervor).

## Regeln für neue Komponenten
Nur wenn nichts Bestehendes passt; alle Werte gebunden; `description` setzen; Zustände nach Konturen-Prinzip.
