# Screens & App-Struktur

Plattform: Mobile, Frame 390×844, Fill `bg/app`, Clip. Status-Bar-Abstand 47px (Gerät), Home-Indicator
134×5 Fill `bg/inverse` 13px über Unterkante (Gerät).

## Grundgerüst (alle Hauptscreens)
1. **Top Bar** – Auto-Layout horizontal, Space-Between, Padding seitlich `space/l`, vertikal 8:
   links Icon-Button `Filter`, rechts Icon-Button `Profil`. Kein Titel (vom User so entschieden).
2. **Divider** – 1px, `border/strong`.
3. **Inhalt** – füllt die Resthöhe, seitlicher Rand `space/l`.
4. **Divider**.
5. **Tab Bar** – 3 gleich breite Tabs, getrennt durch 1px-Linien links (`border/strong`):
   Lookbook (`Icon / Lookbook`) · Dress Me (`Icon / DressMe`) · Kleiderschrank (`Icon / Kleiderschrank`).
   Tab: Icon 24 + Label `Caption`, Gap 6, Padding oben 12 / unten 30. Aktiv: volle Deckkraft + Indikator
   20×2 `bg/inverse`; inaktiv: Icon + Label 40 % Opacity, Indikator versteckt.

## Dress Me (Startscreen) – `Dress Me – Main` `28:94`
- Titel "Dress Me", Tab Dress Me aktiv.
- Core (390×646): `Illustration / Mannequin` im Hintergrund, darüber Container "Swipe Rows"
  (Padding oben 72, Gap 8, Rand `space/l`) mit 2–4 `Garment Row`-Instanzen (Oberteil, Hose, Schuhe; optional Jacke).
- Interaktiv: Pfeile/Drag wechseln das Teil am Mannequin.

## Kleiderschrank
- Titel "Kleiderschrank", Tab aktiv.
- Inhalt (Gap `space/l`, Padding oben/unten 24): Header (Display "Dein Schrank" + Body "N Teile · M Favoriten"),
  Kategorie-Chips (Button Small: aktiv Primary, sonst Outline; Gap `space/s`; horizontal scrollbar),
  2er-Grid `Card / Item` (Gap `space/m`, Breite je 163, Wrap), ein Item ggf. `State=Selected`.
- Schwebender Button Primary Large "+ Neues Teil" 16px über der Tab Bar, zentriert.

## Lookbook – `Lookbook` `45:260`
- Tab Lookbook aktiv. Inhalt wie Kleiderschrank: Header (Display "Dein Lookbook" + Body "N Looks gespeichert"),
  Anlass-Chips (Button Small), `Card / Look` Blush als "Look des Tages", Row header (Title + Caption-Link),
  2er-Grid `Card / Item` (Kategorie = Anlass, Name = Look-Name), Add-Button "Neuen Look erstellen".

## Prototyp-Regeln
- Navigation über Tab Bar (On Click → Navigate To, Smart Animate) erst, wenn der User Klickbarkeit wünscht.
- Neue Screens aus dem Grundgerüst klonen (Top Bar/Tab Bar übernehmen) statt neu bauen.
