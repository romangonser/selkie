import { useLayoutEffect, useRef, useState } from 'react'
import { Mannequin } from '../components/Mannequin'
import { GarmentRow } from '../components/GarmentRow'
import { ZONES } from '../data/garments'

// Figma: "Dress Me – Main" – Mannequin im Hintergrund, darüber die Kleider-Reihen.
// Die 390×646-Bühne wird proportional in den verfügbaren Platz skaliert.
export function DressMe() {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [idx, setIdx] = useState<number[]>(ZONES.map(() => 0))

  useLayoutEffect(() => {
    const el = box.current!
    const ro = new ResizeObserver(() => setScale(Math.min(el.clientWidth / 390, el.clientHeight / 646)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={box} className="screen" style={{ overflow: 'clip', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 390, height: 646, flex: 'none', transform: `scale(${scale})`, transformOrigin: 'center' }}>
        <Mannequin />
        <div style={{ position: 'absolute', inset: 0, padding: '96px var(--space-l) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-s)' }}>
          {ZONES.map((z, r) => (
            <GarmentRow key={z.key} label={z.label} items={z.items} zoneY={z.y} height={z.h}
              index={idx[r]} onIndex={i => setIdx(a => a.map((v, j) => (j === r ? i : v)))} z={ZONES.length - r} />
          ))}
        </div>
      </div>
    </div>
  )
}
