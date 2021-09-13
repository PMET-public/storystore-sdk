import { HTMLAttributes, ReactElement } from 'react'

export type FooterProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  /** Name of the website */
  name?: string
  /** Site description */
  description?: string
  /** React SVG Logo */
  logo: ReactElement<HTMLAttributes<SVGElement>>
  /** Menu Navigation */
  menu?: Array<ReactElement>
  /** Centered content */
  contained?: boolean
}
