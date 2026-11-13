# Stand & offene Punkte

Aktualisieren bei jeder Arbeitssitzung (Datum, was erledigt, was offen).

## Verbindung
- Schreiben nur über den claude.ai-Figma-Connector (Konto, dem die Datei gehört). Der Design-Plugin-Server
  (`plugin:design:figma`) ist mit einem anderen Konto angemeldet und hat in dieser Datei nur Leserechte.

## 2026-11-13 (2. Runde)
Erledigt:
- 22 User-Icons + temporäres Filter-Icon als Komponenten: Page Design-System, Rahmen `Icons (Komponenten)`
  (unter dem Original-Rahmen `Icons` 23:1088). IDs: Lookbook 40:92, Profil 40:98, DressMe 40:104,
  Kleiderschrank 40:111, Chevron Left 40:116, Chevron Right 40:121, Close 40:126, Plus 40:151, Hose 40:131,
  Jacke 40:136, Kalt 40:141, Kleid 40:146, Pullover 40:156, Regen 40:161, Rock 40:166, Schuhe 40:171,
  Shirt 40:176, Shorts 40:181, Sonne 40:186, Warm 40:191, Kette 40:196, Guertel 40:201, Filter 40:202.
  Alte Icon-Masters auf Prototyp gelöscht, alle Instanzen umgestellt.
- Section `Komponenten (App)` 41:147 auf Prototyp: `Illustration / Mannequin` 34:131 +
  `Garment Row / Oberteil` 41:202 (H 180), `/ Hose` 41:260 (H 268), `/ Schuhe` 41:336 (H 76), je 3 Varianten,
  interaktiv (Pfeile + Drag, Smart Animate).
- `Dress Me – Main` 28:94: Mannequin + 3 Garment Rows; alter Avatar und `Swipe Row` entfernt.
- `Kleiderschrank` 41:415: Header, Kategorie-Chips (Button Small), 2er-Grid Card / Item, Add-Button.
- Top Bar ohne Titel (User hat den Titel im Dress-Me-Screen entfernt) – so beibehalten.
- User-Farbe `orange` #E25D21 (23:851) als Accent: Token `bg/highlight` (42:85), Swatch in der Übersicht ergänzt;
  veraltete Hex-Labels von cream/rose korrigiert.

- `Lookbook` 45:260 (links neben Dress Me): Header, Anlass-Chips (Alle, Alltag, Office, Abend, Wochenende),
  Card / Look Blush als "Look des Tages", Row header "Gespeichert / Alle", 2er-Grid Card / Item als Look-Vorschauen,
  Add-Button "Neuen Look erstellen". Strukturcheck ohne Befund.

## 2026-11-13 (3. Runde)
- Mannequin-Komponente `Mannequin` 47:95 (Frau/Mann) aus den User-Vorlagen; altes gezeichnetes Mannequin gelöscht.
- Garment Rows neu mit Bildern der Assets-Page (4 Oberteile, 4 Hosen/Röcke, 3 Schuhe), proportional auf Frau;
  alte gezeichnete Kleider gelöscht. Pfeile ohne Kontur/Fill.
- Chip-Komponente 48:726 + Token `radius/pill`; Chips in Kleiderschrank und Lookbook ersetzt.
- Top Bar 48:732 (Filter ohne Kontur, Profil mit Kontur) und Tab Bar 48:817 als Komponenten; in allen 3 Screens Instanzen.

Offen:
1. Tab-Bar-Navigation klickbar machen (wenn gewünscht).
2. Overview-Frame `Design System – My Style` um Icons, Illustration, Zahlen-Tokens ergänzen.
3. Ggf. App-Komponenten (Mannequin, Garment Rows) auf die Page Design-System verschieben.
4. Eigene Look-Vorschau (Mannequin-Miniatur) statt Card / Item, falls gewünscht.

Hinweise:
- Text-Boxen mit CoFo/Helvetica werden serverseitig mit Ersatz-Metriken vermessen; beim Öffnen in Figma auf dem
  Mac des Users stimmen sie wieder. Visuelle Prüfung von Text deshalb über Layer, nicht über Screenshots.
- Im User-Frame `Fonts und Colors (alt)` wurden zwei Texte versehentlich auf Body/Display umgestellt.

## Code-Projekt
- Mobile Web-App unter `/Users/roman/Documents/Local-claude/Clou-App` (React + Vite). Tokens in `src/styles/tokens.css`, Komponenten in `src/components`, Kleider-Passregeln in `src/data/garments.ts`. Projekt-Kopie dieses Skills liegt in `.claude/skills/` des Repos – bei Änderungen beide nachführen.
