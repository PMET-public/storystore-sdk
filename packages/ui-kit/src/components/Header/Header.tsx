import { FunctionComponent, useState, useRef, HTMLAttributes, ReactElement } from 'react'
import { classes, merge, Color } from '../../lib'
import { Block } from '../'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { useMeasure } from '../../hooks/useMeasure'
import LogoIcon from 'remixicon-react/Home2FillIcon'

// Styles
import style from './Header.module.css'

export type HeaderProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  /** React SVG Logo */
  logo: ReactElement<HTMLAttributes<SVGElement>>
  /** Navigation Container */
  nav?: ReactElement
  /** Whether the button should have transparent background. */
  transparent?: boolean
  /** Visual styles. */
  variant?: Color
  /** Stick to the top while scrolling. */
  sticky?: boolean
  /** Centered content */
  contained?: boolean
}

export const Header: FunctionComponent<HeaderProps> = ({
  root = <header />,
  logo = <LogoIcon />,
  nav,
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

          {nav && <nav.type {...nav.props} className={classes([style.nav, nav.props.className])} />}
        </div>
      </Block>
    </root.type>
  )
}
