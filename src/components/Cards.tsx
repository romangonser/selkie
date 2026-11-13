import { Button } from './Button'
import './components.css'

// Figma: Card / Item (State = Default | Selected · Kategorie · Name · Favorit)
export function CardItem({ kategorie, name, image, favorit, selected, onClick }: {
  kategorie: string; name: string; image?: string; favorit?: boolean; selected?: boolean; onClick?: () => void
}) {
  return (
    <button className={`card-item${selected ? ' card-item--selected' : ''}`} onClick={onClick}>
      <div className="card-item__image">
        {image && <img src={image} alt="" loading="lazy" />}
        {favorit && <span className="card-item__fav" aria-label="Favorit">♥</span>}
      </div>
      <div className="card-item__meta">
        <span className="t-caption">{kategorie}</span>
        <span className="t-title">{name}</span>
      </div>
    </button>
  )
}

// Figma: Card / Look (Tone = Blush | Ink · Eyebrow · Titel · Text)
export function CardLook({ tone = 'blush', eyebrow, titel, text, action, onAction }: {
  tone?: 'blush' | 'ink'; eyebrow: string; titel: string; text: string; action: string; onAction?: () => void
}) {
  return (
    <article className={`card-look card-look--${tone}`}>
      <span className="card-look__deco" aria-hidden="true" />
      <span className="t-caption">{eyebrow}</span>
      <h2 className="t-display card-look__title" style={{ margin: 0 }}>{titel}</h2>
      <p className="t-body" style={{ margin: 0 }}>{text}</p>
      <Button variant={tone === 'blush' ? 'primary' : 'accent'} size="small" onClick={onAction}>{action}</Button>
    </article>
  )
}
