import { HTMLAttributes, ReactElement } from 'react'
import { BreakpointValues, Spacing } from '../../lib'

export type CarouselProps = HTMLAttributes<HTMLDivElement> & {
  gap?: Spacing
  hideScrollBar?: boolean
  peak?: boolean
  root?: ReactElement
  show?: BreakpointValues<number>
  padded?: boolean
}
