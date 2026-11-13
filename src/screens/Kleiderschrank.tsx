import { useState } from 'react'
import { Button, Chip } from '../components/Button'
import { CardItem } from '../components/Cards'
import { OBERTEILE, HOSEN, SCHUHE } from '../data/garments'

// Figma: "Kleiderschrank" – Header, Kategorie-Chips, 2er-Grid Card / Item, Add-Button.
const ALL = [...OBERTEILE, ...HOSEN, ...SCHUHE]
const KATEGORIEN = ['Alle', 'Oberteile', 'Hosen', 'Schuhe']
const FAVORITEN = new Set(['tshirt-schwarz', 'jeans-blau', 'ballerina-beige'])

export function Kleiderschrank() {
  const [kat, setKat] = useState('Alle')
  const [sel, setSel] = useState<string | null>(null)
  const items = kat === 'Oberteile' ? OBERTEILE : kat === 'Hosen' ? HOSEN : kat === 'Schuhe' ? SCHUHE : ALL
  return (
    <div className="screen">
      <div className="screen__scroll">
        <div className="pad stack-s">
          <h1 className="t-display" style={{ margin: 0 }}>Dein Schrank</h1>
          <p className="t-body" style={{ margin: 0 }}>{ALL.length} Teile · {FAVORITEN.size} Favoriten</p>
        </div>
        <div className="chips pad">
          {KATEGORIEN.map(k => <Chip key={k} active={k === kat} onClick={() => setKat(k)}>{k}</Chip>)}
        </div>
        <div className="grid-2 pad">
          {items.map(gm => (
            <CardItem key={gm.id} kategorie={gm.kategorie} name={gm.name} image={gm.src}
              favorit={FAVORITEN.has(gm.id)} selected={sel === gm.id} onClick={() => setSel(sel === gm.id ? null : gm.id)} />
          ))}
        </div>
      </div>
      <Button className="fab">Neues Teil hinzufügen</Button>
    </div>
  )
}
