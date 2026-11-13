---
name: lookbook-design-system
description: Design-System der App "My Style – Dress me" (Look-book, Figma fileKey WFrlK1RXLOMesrSfCOhk0g). IMMER laden, bevor in dieser Figma-Datei etwas gebaut, geändert, geprüft oder als Screen/Prototyp/Icon/Illustration entworfen wird – und bevor Code geschrieben wird, der dieses Design umsetzt. Auch bei kleinen Änderungen, Farb-/Radius-/Schrift-Fragen oder wenn der User "Design-System", "Lookbook", "Dress Me", "Kleiderschrank" oder die App erwähnt.
---

# Look-book / My Style – Design-System

Figma: `https://www.figma.com/design/WFrlK1RXLOMesrSfCOhk0g/Look-book-Wireframing`
Pages: **Design-System** `10:377` (Quelle der Wahrheit) · **Prototyp** `28:24` (App-Screens) · Inspirationen · Vibe-Coding.

Das System wird gemeinsam mit dem User weiterentwickelt. Ziel: **in keinem Chat und keiner Version
tauchen abweichende Elemente auf.** Darum gilt dieser Ablauf ausnahmslos.

## Arbeitsablauf (jedes Mal)

1. **Live-Stand lesen, nicht erinnern.** Variablen (`Palette`, `Tokens`), Textstile, Komponenten und den
   Rahmen `Icons` aus Figma auslesen. Der User ändert Werte direkt in Figma (z. B. cream, rose wurden
   angepasst). Die Werte in `references/` sind ein Schnappschuss – bei Abweichung gilt Figma, und die
   Referenz wird nachgeführt.
2. **Nur Systembausteine verwenden:**
   - Farben → semantische Variablen aus `Tokens` (nie Hex, nie Palette direkt in Screens).
   - Radius / Abstand / Linienstärke → `radius/*`, `space/*`, `border/*`.
   - Text → einer der 5 Textstile, **ohne Overrides** (keine eigene Grösse/Font/Farbe ausser Tokens).
   - UI → Komponenten (Button, Card / Item, Card / Look, Icons, Illustrationen). Nicht nachbauen, nicht detachen.
3. **Fehlt etwas?** Zuerst ins System (Variable mit Scopes + `var(--…)`-Code-Syntax, Stil oder Komponente
   auf der Page Design-System), dem User in einem Satz sagen *was neu ist und warum*, dann verwenden.
   Neue Elemente immer minimal halten – das System soll klein bleiben.
4. **Änderungswunsch** ("runder", "andere Farbe", "Schrift grösser") → Variable/Stil/Komponente ändern,
   nie einzelne Screens. Danach prüfen, dass alle Instanzen folgen.
5. **Prüfen vor Abschluss:** Screenshot + Strukturcheck: keine ungebundenen Fills/Strokes/Radien, kein Text
   ohne Stil, keine detachten Instanzen. Abweichungen sofort beheben.
6. **Referenzen nachführen**, wenn sich das System geändert hat (`references/*.md`, `assets/tokens.*`,
   Abschnitt "Stand & offene Punkte" in `references/status.md`).

## Kurzreferenz

| Bereich | Regel | Details |
|---|---|---|
| Farben | Main: ink + cream · Accent: rose, ochre, lavender, orange · Status: red (Error), green (Success) · white für Flächen | `references/tokens.md` |
| Schrift | Display, Title = CoFo Cinema1909 · Body, Label, Caption = Helvetica Neue | `references/typography.md` |
| Form | Ecken max. 4px (`radius/card`, `radius/button`) – Ausnahme Chips: ganz rund (`radius/pill`) · Konturen 1px (`border/width`) | `references/tokens.md` |
| Zustände | Default gefüllt · Pressed nur Kontur · Disabled Lavender-Kontur · Selected Ink-Kontur | `references/components.md` |
| Icon-Buttons | ohne Kontur (Filter, Swipe-Pfeile) – nur Profil mit Kontur · Filter-Chips rund mit Kontur | `references/components.md` |
| Mannequin & Kleider | Mannequin-Vorlagen des Users (Frau/Mann) · Kleider = Bilder der Page Assets, proportional nach Passregeln | `references/illustration.md` |
| Icons | Line-Icons des Users (Rahmen `Icons` `23:1088`), Farbe `icon/primary`, 24px | `references/icons.md` |
| Screens | Mobile 390×844, Top Bar / Inhalt / Tab Bar (Lookbook · Dress Me · Kleiderschrank) | `references/screens.md` |
| Figma-API | Font-Rezept, Variablen binden, Interaktionen, Vektoren | `references/figma-recipes.md` |
| Code | CSS-/JSON-Tokens 1:1 aus Figma | `assets/tokens.css`, `assets/tokens.json` |

## Stil in einem Satz

Vogue / editorial, aber leicht und freundlich – nicht zu edel: viel Cream, feine 1px-Linien, kleine 4px-Ecken,
CoFo Cinema für Haltung, Helvetica Neue für Klarheit, Rose/Ochre/Lavender als sanfte Akzente.

## Nie

- Hex-Werte, Pixelwerte für Radius/Abstand/Linie direkt setzen (Ausnahme: Geräte-Masse Status-Bar 47px,
  Home-Indicator, Illustrations-Geometrie).
- Text ohne Textstil oder mit Font-/Grössen-Override.
- Komponenten nachbauen oder detachen; neue Varianten ausserhalb des Komponenten-Bereichs anlegen.
- Werte des Users überschreiben, ohne es ihm zu sagen. Nutzer-eigene Frames (z. B. `Colors`, `Fonts und
  Colors (alt)`, Screenshots, `Icons`-Originale) nicht verändern – nur referenzieren/kopieren.
