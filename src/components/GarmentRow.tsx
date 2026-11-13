import { useRef, useState } from 'react'
import { Icon } from './Icon'
import { fit, type Garment } from '../data/garments'
import './components.css'

// Figma: Garment Row – Pfeile = vor/zurück, Ziehen = wechseln, Smart Animate 300 ms Ease-Out.
const D = 230          // Abstand der Teile im Track
const ROW_X = 24       // Rand (space/l) im 390er-Core

export function GarmentRow({ items, zoneY, height, label, index, onIndex, z }: {
  items: readonly Garment[]; zoneY: number; height: number; label: string
  index: number; onIndex: (i: number) => void; z: number
}) {
  const n = items.length
  const [drag, setDrag] = useState(0)
  const start = useRef<number | null>(null)
  const go = (d: number) => onIndex((index + d + n) % n)

  return (
    <div className="garment-row" style={{ height, zIndex: z }} aria-roledescription="Karussell" aria-label={label}
      onPointerDown={e => { if ((e.target as Element).closest('button')) return; start.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId) }}
      onPointerMove={e => { if (start.current !== null) setDrag(e.clientX - start.current) }}
      onPointerUp={() => { if (start.current === null) return; if (drag < -40) go(1); else if (drag > 40) go(-1); start.current = null; setDrag(0) }}
      onPointerCancel={() => { start.current = null; setDrag(0) }}>
      <div className="garment-row__tile" />
      <div className="garment-row__track" style={{
        transform: `translateX(${-index * D + drag}px)`,
        transition: start.current === null ? 'transform 300ms ease-out' : 'none',
      }}>
        {items.map((gm, k) => {
          const f = fit(gm)
          return <img key={gm.id} src={gm.src} alt={k === index ? gm.name : ''} draggable={false}
            style={{ left: f.x - ROW_X + k * D, top: f.y - zoneY, width: f.w, height: f.h }} />
        })}
      </div>
      <button className="garment-row__arrow garment-row__arrow--prev" aria-label={`${label} zurück`} onClick={() => go(-1)}><Icon name="ChevronLeft" size={16} /></button>
      <button className="garment-row__arrow garment-row__arrow--next" aria-label={`${label} weiter`} onClick={() => go(1)}><Icon name="ChevronRight" size={16} /></button>
    </div>
  )
}
