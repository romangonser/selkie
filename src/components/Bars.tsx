import { Icon, type IconName } from './Icon'
import './components.css'

export type Tab = 'lookbook' | 'dressme' | 'kleiderschrank'

// Figma: Top Bar – Filter ohne Kontur, Profil mit Kontur
export function TopBar({ onFilter, onProfil }: { onFilter?: () => void; onProfil?: () => void }) {
  return (
    <header className="top-bar">
      <button className="icon-btn" aria-label="Filter" onClick={onFilter}><Icon name="Filter" /></button>
      <button className="icon-btn icon-btn--outlined" aria-label="Profil" onClick={onProfil}><Icon name="Profil" /></button>
    </header>
  )
}

const TABS: { id: Tab; label: string; icon: IconName }[] = [
  { id: 'lookbook', label: 'Lookbook', icon: 'Lookbook' },
  { id: 'dressme', label: 'Dress Me', icon: 'DressMe' },
  { id: 'kleiderschrank', label: 'Kleiderschrank', icon: 'Kleiderschrank' },
]

// Figma: Tab Bar (Active = Lookbook | Dress Me | Kleiderschrank)
export function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="tab-bar">
      {TABS.map(t => (
        <button key={t.id} className={`tab${t.id === active ? ' tab--active' : ''}`} aria-current={t.id === active ? 'page' : undefined} onClick={() => onChange(t.id)}>
          <Icon name={t.icon} />
          <span className="t-caption">{t.label}</span>
          <span className="tab__indicator" />
        </button>
      ))}
    </nav>
  )
}
