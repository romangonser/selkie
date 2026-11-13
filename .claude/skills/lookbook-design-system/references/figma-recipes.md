# Figma-Rezepte (Plugin API via use_figma)

Zuerst den Figma-Skill `figma-use` laden (und `figma-generate-library` für Systemarbeit). Diese Rezepte
ergänzen ihn für diese Datei.

## Verbindung
- Schreiben geht nur über den Figma-Connector mit `use_figma` (claude.ai Connector). Die Desktop-App-Tools
  (`mcp__Figma__*`) können nur lesen (Metadata, Screenshot, Variablen). Fehlt `use_figma`, dem User sagen,
  dass er den Figma-Connector neu verbinden muss (/mcp) – nicht mit Workarounds Elemente vorbereiten.

## Fonts (CoFo Cinema1909, Helvetica Neue sind serverseitig nicht ladbar)
```js
await figma.loadFontAsync({family:'Inter', style:'Medium'});
// neuer Text
const t = figma.createText();
t.fontName = {family:'Inter', style:'Medium'};
t.characters = 'Kleiderschrank';
await t.setTextStyleIdAsync(captionStyle.id);   // übernimmt Font/Grösse des Stils
// Text in Instanz oder bestehendem Node ändern
const sid = node.textStyleId;
node.fontName = {family:'Inter', style:'Medium'};
node.characters = 'Neuer Text';
await node.setTextStyleIdAsync(sid);
```
- `instance.setProperties({Label: …})` schlägt bei diesen Fonts fehl → obiges Rezept auf den Text-Node anwenden.
- Overrides entfernen = Stil neu zuweisen (Rezept oben ohne `characters`).
- Text-`fills` lassen sich ohne Font-Load setzen.

## Variablen binden
```js
const v = await figma.variables.getVariableByIdAsync(id);         // IDs live per Name suchen
const paint = figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:0,g:0,b:0}}, 'color', v);
node.fills = [paint];
node.setBoundVariable('strokeWeight', borderWidth);
['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'].forEach(k => node.setBoundVariable(k, radius));
node.setBoundVariable('paddingLeft', spaceL); node.setBoundVariable('itemSpacing', spaceS);
```
- Paint mit Deckkraft: `opacity` beim Erzeugen mitgeben (`{type:'SOLID', color, opacity:0.4}`) – nachträglich wird sie verworfen. Besser: Node-Opacity.
- Variablen per Name finden: `(await figma.variables.getLocalVariablesAsync()).find(v => v.name === 'bg/app')`.

## Vektoren
- `vectorPaths` werden auf den Ursprung normalisiert: Position danach selbst setzen (`x/y` = Minimum der echten
  Kurven-Bounds, Bezier abtasten). `windingRule:'NONE'` für offene Linien.
- Gespiegelte Paare: x → 390 − x.
- `figma.union(nodes, parent)` für saubere Silhouetten; Boolean-Nodes haben keine `constraints`.

## Interaktionen (Varianten-Swipe)
```js
const tr = {type:'SMART_ANIMATE', easing:{type:'EASE_OUT'}, duration:0.3};
const go = id => ({type:'NODE', destinationId:id, navigation:'CHANGE_TO', transition:tr, preserveScrollPosition:false});
await nextBtn.setReactionsAsync([{trigger:{type:'ON_CLICK'}, actions:[go(nextVariant.id)]}]);
await track.setReactionsAsync([{trigger:{type:'ON_DRAG'}, actions:[go(nextVariant.id)]}]);
```

## Prüf-Skript (vor Abschluss)
Auf dem Ziel-Frame alle Nodes durchgehen und melden: Fills/Strokes ohne `boundVariables.color`,
Radien/Paddings/Gaps/StrokeWeight ohne Bindung, TEXT ohne `textStyleId`, Instanzen ohne `mainComponent`.
Ausnahmen: Geräte-Masse, Illustrations-Geometrie, Icon-Innenleben.
