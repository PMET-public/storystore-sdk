import { FunctionComponent, cloneElement, HTMLAttributes, ReactElement } from 'react'
import '../../lib/class-names'
import classes from '../../lib/class-names'
import style from './Header.module.css'

export type HeaderNavFill = {}

export const HeaderNavFill: FunctionComponent<HeaderNavFill> = ({ ...props }) => {
  return <div className={style.navFill} />
}

export type HeaderNavItem = {
  active?: boolean
  compact?: boolean
  variant?: 'link' | 'button'
}

export const HeaderNavItem: FunctionComponent<HeaderNavItem> = ({ active, variant = 'link', compact, ...props }) => {
  return (
    <div
      className={classes([style.navItem, style[variant], [style.compact, compact], [style.active, active]])}
      {...props}
    />
  )
}

export type HeaderProps = {
  /** React SVG Logo */
  logo: FunctionComponent<HTMLAttributes<SVGElement>>
  /** Whether the button should be less prominent. */
  quiet?: boolean
  /** Visual styles. */
  variant?: 'primary' | 'secondary' | 'accent'
}

export const Header: FunctionComponent<HeaderProps> = ({
  logo: Logo,
  quiet = false,
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <div {...props} className={classes([style.root, style[variant], [style.quiet, quiet]])}>
      <h1 className={style.logoWrapper}>
        <Logo className={style.logo} />
      </h1>

      <nav className={style.nav}>{children}</nav>
    </div>
  )
}
