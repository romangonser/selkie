import { useState } from 'react'
import { Button, Chip } from '../components/Button'
import { CardItem, CardLook } from '../components/Cards'

// Figma: "Lookbook" – Header, Anlass-Chips, Card / Look (Look des Tages), Gespeichert-Grid, Add-Button.
const ANLAESSE = ['Alle', 'Alltag', 'Office', 'Abend', 'Wochenende']
const LOOKS = [
  { anlass: 'Office', name: 'Montag im Büro', fav: true },
  { anlass: 'Abend', name: 'Dinner in Ink', fav: false },
  { anlass: 'Alltag', name: 'Sonntag in Beige', fav: true },
  { anlass: 'Wochenende', name: 'Markt am Samstag', fav: false },
]

export function Lookbook() {
  const [anlass, setAnlass] = useState('Alle')
  const looks = anlass === 'Alle' ? LOOKS : LOOKS.filter(l => l.anlass === anlass)
  return (
    <div className="screen">
      <div className="screen__scroll">
        <div className="pad stack-s">
          <h1 className="t-display" style={{ margin: 0 }}>Dein Lookbook</h1>
          <p className="t-body" style={{ margin: 0 }}>{LOOKS.length} Looks gespeichert</p>
        </div>
        <div className="chips pad">
          {ANLAESSE.map(a => <Chip key={a} active={a === anlass} onClick={() => setAnlass(a)}>{a}</Chip>)}
        </div>
        <div className="pad">
          <CardLook eyebrow="Look des Tages" titel="Sonntag in Beige" text="3 Teile aus deinem Schrank – leicht, lässig, ein bisschen frech." action="Outfit speichern" />
        </div>
        <div className="pad row-between">
          <h2 className="t-title" style={{ margin: 0 }}>Gespeichert</h2>
          <span className="t-caption">Alle</span>
        </div>
        <div className="grid-2 pad">
          {looks.map(l => <CardItem key={l.name} kategorie={l.anlass} name={l.name} favorit={l.fav} />)}
        </div>
      </div>
      <Button className="fab">Neuen Look erstellen</Button>
    </div>
  )
}
