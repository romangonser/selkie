# Selkie

Dein Schrank, deine Outfits, dein Lookbook. Eine Web-App (iPhone-17-Pro-Format) mit drei Bereichen:

- **Dress Me**: Outfit als Flatlay zusammenstellen. Unten wählst du 2, 3 oder 4 Teile (2 = Kleid + Schuhe, 3 = Oberteil, Unterteil, Schuhe, 4 = zusätzlich Jacke). Pro Zeile mit den Pfeilen oder per Wischen wechseln; beim Oberteil gibt es Knöpfe für nur Shirts oder nur Pullover. Accessoires kommen über «+ Accessoire» dazu. Filter (Wetter, Temperatur, eigene Tags), Zufall und Speichern sind in der unteren Leiste.
- **Kleiderschrank**: alle Teile mit Kategorie-, Wetter- und Tag-Filter. Neue Teile kommen per Foto dazu (Hintergrund wird automatisch entfernt), mit Kategorie, Sonne/Regen, Warm/Kalt und eigenen Tags («+ Neuer Tag»). Oben rechts ist das Profil.
- **Lookbook**: Outfits, die du getragen hast, mit Datum, Notiz, Tags und optionalem Foto. «Nochmals anziehen» lädt einen Look zurück in Dress Me.

Filter gelten nur auf der Seite, auf der du sie setzt.

Farben, Icons und die ersten Beispiel-Kleider kommen aus dem Figma-File «Look-book Wireframing», weitere 48 Beispiel-Kleider aus «Mode_Einzelfreisteller». Im Profil lassen sich die Beispiel-Kleider entfernen oder wieder laden.

## Online (Vercel)

Das Repository [github.com/romangonser/selkie](https://github.com/romangonser/selkie) ist mit Vercel verbunden. `index.html`, `README.md` und der Ordner `assets` liegen ganz oben im Repository, es braucht keinen Build-Schritt. Jeder Push nach `main` aktualisiert die Live-URL automatisch; sie steht im Vercel-Dashboard bei diesem Projekt (unter «Domains»).

Auf dem iPhone in Safari öffnen → Teilen → «Zum Home-Bildschirm». Dann sieht Selkie aus wie eine App.

Alternative ohne Vercel: GitHub → «Settings» → «Pages» → bei «Branch» `main` und `/ (root)` wählen → «Save». Die App läuft dann zusätzlich unter `https://romangonser.github.io/selkie/`.

## Wo die Daten liegen: Vercel ist nur das Hosting, keine Datenbank

Vercel liefert lediglich die Dateien aus (wie ein Webserver) – dort wird nichts gespeichert. Ohne weitere Einrichtung speichert Selkie den Schrank jeder Person nur lokal im eigenen Browser (localStorage/IndexedDB): nichts wird geteilt oder gesichert, und bei gelöschten Browserdaten oder auf einem anderen Gerät ist der Schrank leer.

Für einen **geteilten, geräteübergreifenden** Schrank pro Person braucht es **Firebase** (ein separater, kostenloser Google-Dienst für Datenbank + Anmeldung) – aktuell ist das noch nicht eingerichtet (`FIREBASE_FEST` ist `null`).

## Eigene Konten für mehrere Personen (Firebase)

Ohne Firebase funktioniert die App sofort, speichert aber nur im jeweiligen Browser. Damit jede Person ihren eigenen Schrank auf allen Geräten hat:

1. Auf [console.firebase.google.com](https://console.firebase.google.com) ein **neues** Projekt anlegen, z. B. «selkie» (nicht das vom Home-Organiser verwenden).
2. «Build» → «Authentication» → «Get started» → «E-Mail/Passwort» einschalten.
3. «Build» → «Realtime Database» → «Datenbank erstellen», Standort Europa, gesperrter Modus.
4. Bei «Regeln» diesen Text einfügen und «Veröffentlichen»:

```json
{
  "rules": {
    "selkie": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
```

   Damit sieht jede Person nur ihren eigenen Schrank.

5. Zahnrad → «Projekteinstellungen» → «Allgemein»: Gibt es noch keine Web-App, mit dem Symbol `</>` eine anlegen. Den **Web-API-Schlüssel** kopieren.
6. In `index.html` die Zeile `const FIREBASE_FEST = null;` ersetzen durch:

```js
const FIREBASE_FEST = { dbUrl: "https://DEINE-DATENBANK.europe-west1.firebasedatabase.app", apiKey: "AIza..." };
```

7. Die geänderte `index.html` auf GitHub hochladen. Jetzt kann sich jede Person mit «Neues Konto» registrieren.

Tipp: Wenn alle ihr Konto haben, kannst du in Firebase unter «Authentication» → «Settings» → «User actions» das Erstellen neuer Konten ausschalten. Dann kann sich niemand Fremdes mehr registrieren.

Fotos werden verkleinert (max. 800 px) direkt in der Realtime Database gespeichert. Der kostenlose Firebase-Plan reicht damit für Tausende Teile.
