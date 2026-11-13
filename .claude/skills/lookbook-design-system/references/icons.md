# Icons

Quelle: Rahmen **`Icons` `23:1088`** auf der Page Design-System (Originale des Users, je 96×96, feine Line-Art).
Originale nie verändern – Komponenten werden als skalierte Kopie erstellt.

## Inventar (Stand 2026-11-13)

| Gruppe | Icons (Frame-Name → Komponente) |
|---|---|
| Navigation | `lookbook 1` → Icon / Lookbook · `schneiderpuppe 1` → Icon / DressMe · `kleiderschrank 1` → Icon / Kleiderschrank · `profil 1` → Icon / Profil |
| Steuerung | `pfeil-links 1` → Icon / Chevron Left · `pfeil-rechts 1` → Icon / Chevron Right · `plus 1` → Icon / Plus · `x 1` → Icon / Close |
| Kleidung | `jacke 1`, `pullover 1`, `shirt 1`, `kleid 1`, `rock 1`, `hosen 1`, `shorts 1`, `schuhe 1` → Icon / Jacke … |
| Accessoires | `accessoires-kette 1` → Icon / Kette · `guertel 1` → Icon / Guertel |
| Wetter | `sonne 1`, `regen 1`, `kalt 1` (Schneeflocke), `warm 1` (Thermometer) → Icon / Sonne … |
| Temporär (nicht im User-Set) | Icon / Filter (Slider) – bis der User ein eigenes Filter-Icon liefert |

Alle Icons sind Komponenten im Rahmen **`Icons (Komponenten)`** auf der Page Design-System
(IDs in status.md). Neue Icons des Users nach der Regel unten ergänzen.

## Konvertierungsregel (Original → Komponente)
1. Frame klonen, Inhalt (Group) auf 22px längste Seite skalieren, in 24×24 zentrieren, Frame-Fill entfernen.
2. `createComponentFromNode`, Name `Icon / <Name>` (deutsch, Grossschreibung, Umlaute ausgeschrieben).
3. Alle Strokes → `icon/primary`, Stroke-Weight → `border/width`, Cap/Join rund. Fills (falls vorhanden) → `icon/primary`
   bzw. `bg/app` für Aussparungen (z. B. Filter-Punkte).
4. Alle Icon-Komponenten in einem Rahmen `Icons (Komponenten)` sammeln; Instanzen per `swapComponent` austauschen.

## Verwendung
- Grösse 24 (Tab Bar, Top Bar), 16 in kleinen Buttons (Chevron in Swipe-Reihe), Kleidungs-Icons dürfen 32/48 sein.
- Icon-Buttons: 40×40, Kontur `border/strong` / `border/width`, Radius `radius/button`, kein Fill.
- Inaktive Tabs: Instanz-Opacity 40 % (statt anderer Farbe).
