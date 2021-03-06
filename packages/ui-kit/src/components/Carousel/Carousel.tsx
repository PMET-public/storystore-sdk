import { FunctionComponent, Children, HTMLAttributes, ReactElement } from 'react'
import { classes, merge, getBreakpointValues, BreakpointValues, Spacing } from '../../lib'

// Styles
import style from './Carousel.module.css'

export type CarouselProps = HTMLAttributes<HTMLDivElement> & {
  gap?: Spacing
  hideScrollBar?: boolean
  peak?: boolean
  root?: ReactElement
  show?: BreakpointValues<number>
  padded?: boolean
}

export const Carousel: FunctionComponent<CarouselProps> = ({
  className,
  gap: _gap,
  hideScrollBar = false,
  children,
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
        ['--carousel-show-sm']: show.sm ? `calc(100% / ${show.sm} - ${padding})` : 'max-content',
        ['--carousel-show-md']: show.md ? `calc(100% / ${show.md} - ${padding})` : 'max-content',
        ['--carousel-show-lg']: show.lg ? `calc(100% / ${show.lg} - ${padding})` : 'max-content',
        ['--carousel-show-xl']: show.xl ? `calc(100% / ${show.xl} - ${padding})` : 'max-content',
        ['--carousel-gap']: gap,
        ['--carousel-padding']: padding,
        ...props.style,
      }}
    >
      {Children.toArray(children).map((item: any, key) => (
        <item.type key={key} {...item.props} className={classes([style.item, item.props.className])} />
      ))}
    </root.type>
  )
}
