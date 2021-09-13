import { HTMLAttributes, ReactElement } from 'react'
import { Color } from '../../lib'

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  /** React SVG Logo */
  logo: ReactElement<HTMLAttributes<SVGElement>>
  /** Menu Navigation */
  menu?: ReactElement[]
  /** Whether the button should have transparent background. */
  transparent?: boolean
  /** Visual styles. */
  variant?: Color
  /** Stick to the top while scrolling. */
  sticky?: boolean
  /** Centered content */
  contained?: boolean
}

export type HeaderMenuItemProps = {
  active?: boolean
  compact?: boolean
  variant?: 'link' | 'button' | 'icon' | 'fill'
}
