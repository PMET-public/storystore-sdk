import {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  Children,
  isValidElement,
  cloneElement,
  useState,
  useRef,
} from 'react'
import classes from '../../lib/class-names'
import style from './Header.module.css'
import View from '../View'
import { useScrollPosition } from '../../hooks/useScrollPosition'

export type HeaderProps = {
  /** React SVG Logo */
  logo: ReactElement<HTMLAttributes<SVGElement>>
  /** Menu Navigation */
  menu?: ReactElement[]
  /** Whether the button should have transparent background. */
  transparent?: boolean
  /** Visual styles. */
  variant?: 'surface' | 'primary' | 'secondary' | 'accent'
  /** Stick to the top while scrolling. */
  sticky?: boolean
  /** Centered content */
  contained?: boolean
}

export type HeaderMenuItemProps = {
  active?: boolean
  compact?: boolean
  as?: ReactElement<any>
  variant?: 'link' | 'button' | 'icon' | 'fill'
}

export const HeaderMenuItem: FunctionComponent<HeaderMenuItemProps> = ({
  active = false,
  compact = false,
  variant = 'link',
  children,
  ...props
}) => {
  if (variant === 'fill') return <span className={classes([style.menuItem, style.fill])} />

  return (
    <>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            className: classes([style.menuItem, style[variant], [style.active, active], [style.compact, compact]]),
            ...props,
          })
        }
        return child
      })}
    </>
  )
}

export const Header: FunctionComponent<HeaderProps> = ({
  logo,
  menu,
  transparent = false,
  variant = 'surface',
  sticky = false,
  contained = false,
  ...props
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [hide, setHide] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)

  useScrollPosition(({ prevPos, currPos }) => {
    if (!sticky || !rootRef.current) return
    const currPosY = currPos.y * -1
    const prevPosY = prevPos.y * -1
    const scrollingDown = currPosY > prevPosY
    const scrolledPastElement = currPosY > rootRef.current.offsetHeight
    setHide(scrolledPastElement && scrollingDown)
    setScrolled(currPosY > 0)
  })

  return (
    <div
      ref={rootRef}
      {...props}
      className={classes([
        style.root,
        style[variant],
        [style.transparent, transparent],
        [style.sticky, sticky],
        [style.scrolled, scrolled],
        [style.hide, hide],
      ])}
    >
      <View className={style.wrapper} contained={contained} padded>
        <h1 className={style.logoWrapper}>{cloneElement(logo, { className: style.logo })}</h1>

        {menu && (
          <div className={style.menuWrapper}>
            <nav className={style.menu}>{menu?.map((item, key) => cloneElement(item, { key }))}</nav>
          </div>
        )}
      </View>
    </div>
  )
}
