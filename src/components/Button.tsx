import type { ButtonHTMLAttributes } from 'react'
import './components.css'

// Figma: Button (Style × Size × State). Pressed = :active, Disabled = disabled.
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'accent' | 'outline'
  size?: 'large' | 'small'
}
export function Button({ variant = 'primary', size = 'large', className = '', ...rest }: Props) {
  return <button className={`btn btn--${variant} btn--${size} t-label ${className}`} {...rest} />
}

// Figma: Chip (State = Default | Active) – ganz abgerundet, mit Kontur.
export function Chip({ active, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return <button className={`chip t-label${active ? ' chip--active' : ''}`} aria-pressed={!!active} {...rest}>{children}</button>
}
