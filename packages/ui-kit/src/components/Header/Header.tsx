import { FunctionComponent, Children, isValidElement, cloneElement, useState, useRef } from 'react'
import { HeaderMenuItemProps, HeaderProps } from './Header.d'
import { classes, merge } from '../../lib'
import { Block } from '../'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { useMeasure } from '../../hooks/useMeasure'

// Styles
import style from './Header.module.css'

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
  root = <header />,
  logo,
  menu,
  transparent = false,
  variant = 'surface',
  sticky = false,
  contained = false,
  className,
  ...props
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [hide, setHide] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)

  const { height: headerHeight } = useMeasure(rootRef)

  useScrollPosition(({ prevPos, currPos }) => {
    if (!sticky || !rootRef.current) return
    const currPosY = currPos.y * -1
    const prevPosY = prevPos.y * -1
    const scrollingDown = currPosY > prevPosY
    const scrolledPastElement = currPosY > headerHeight
    setHide(scrolledPastElement && scrollingDown)
    setScrolled(currPosY > 0)
  })

  return (
    <root.type
      ref={rootRef}
      {...merge(props, root.props)}
      className={classes([
        style.root,
        style[variant],
        [style.transparent, transparent],
        [style.sticky, sticky],
        [style.scrolled, scrolled],
        [style.hide, hide],
        className,
      ])}
    >
      <Block contained={contained} padded>
        <div className={style.wrapper}>
          <div className={style.logoWrapper}>
            <logo.type {...logo.props} className={classes([style.logo, logo.props.className])} />
          </div>

          {menu && (
            <div className={style.menuWrapper}>
              <nav className={style.menu}>{menu?.map((item, key) => cloneElement(item, { key }))}</nav>
            </div>
          )}
        </div>
      </Block>
    </root.type>
  )
}
