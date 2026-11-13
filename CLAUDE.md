# Clou – My Style (Mobile Web-App)

Prototyp der App "My Style – Dress me": Lookbook · Dress Me · Kleiderschrank. React + Vite + TypeScript.

## Design-System – verbindlich
- Vor jeder Änderung den Projekt-Skill **`lookbook-design-system`** laden (`.claude/skills/lookbook-design-system`).
  Er ist die Regelbasis; Quelle der Wahrheit ist die Figma-Datei `WFrlK1RXLOMesrSfCOhk0g`.
- Es dürfen **keine abweichenden Elemente** entstehen:
  - Farben, Radien, Abstände, Linien nur über Tokens aus `src/styles/tokens.css` (semantische Tokens, nie `--palette-*` oder Hex in Komponenten).
  - Text nur mit den 5 Klassen `t-display`, `t-title`, `t-body`, `t-label`, `t-caption` – keine eigenen Schriftgrössen.
  - UI nur aus den Komponenten in `src/components` (Button, Chip, CardItem, CardLook, TopBar, TabBar, GarmentRow, Icon, Mannequin).
- Fehlt ein Wert/Element: zuerst in Figma ergänzen (oder mit dem Team absprechen), dann in `tokens.css`/Komponenten übernehmen und den Skill (`references/`) nachführen.
- Änderungswünsche ("runder", "andere Farbe") → Token bzw. Komponente ändern, nie einzelne Screens.

## Struktur
- `src/styles/tokens.css` – Tokens 1:1 aus Figma · `src/styles/app.css` – Layout
- `src/components/` – Systemkomponenten · `src/screens/` – DressMe, Kleiderschrank, Lookbook
- `src/data/garments.ts` – Kleider + Passregeln (Positionen auf dem Mannequin, Core 390×646)
- `public/garments/` – Kleider-Bilder aus der Figma-Page "Assets" (transparent gemacht mit `node scripts/remove-bg.mjs <dateien>`)

## Neues Kleidungsstück hinzufügen
1. Bild aus Figma (Page Assets) als PNG nach `public/garments/` exportieren.
2. `node scripts/remove-bg.mjs public/garments/<name>.png`
3. In `src/data/garments.ts` eintragen (natürliche Grösse + Passregel aus Skill `references/illustration.md`).

## Befehle
- `npm install` · `npm run dev` (auch im WLAN am Handy erreichbar, Adresse steht in der Konsole) · `npm run build`

## Offen
- Webfont-Lizenz für CoFo Cinema1909 (Display/Title) – bis dahin Platzhalter Bodoni Moda. Helvetica Neue nutzt die Systemschrift.
- Schuh-Bilder sind Seitenansichten (einzelner Schuh am Mannequin).
