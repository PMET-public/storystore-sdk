import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import style from './Carousel.module.css'
import { classes, merge, BreakpointValues, getBreakpointValues, Spacing } from '../../lib'

type CarouselProps = HTMLAttributes<HTMLDivElement> & {
  gap?: Spacing
  hideScrollBar?: boolean
  items: ReactElement[]
  peak?: boolean
  root?: ReactElement
  show?: BreakpointValues<number>
  padded?: boolean
}

export const Carousel: FunctionComponent<CarouselProps> = ({
  className,
  gap: _gap,
  hideScrollBar = false,
  items,
  peak,
  root = <div />,
  show: _show,
  padded,
  ...props
}) => {
  const show = getBreakpointValues(_show)
  const gap = _gap ? `var(--spacing-${_gap})` : '0rem'
  const padding = peak ? 'var(--spacing-lg)' : '0px'

  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, [style.hideScrollBar, hideScrollBar], [style.padded, padded], className])}
      style={{
        ['--carousel-show-small' as string]: show.small ? `calc(100% / ${show.small} - ${padding})` : 'max-content',
        ['--carousel-show-medium' as string]: show.medium ? `calc(100% / ${show.medium} - ${padding})` : 'max-content',
        ['--carousel-show-large' as string]: show.large ? `calc(100% / ${show.large} - ${padding})` : 'max-content',
        ['--carousel-gap' as string]: gap,
        ['--carousel-padding' as string]: padding,
        ...props.style,
      }}
    >
      {items.map((item, key) => (
        <item.type key={key} {...item.props} className={classes([style.item, item.props.className])} />
      ))}
    </root.type>
  )
}
