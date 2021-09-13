import { HTMLAttributes, ReactElement } from 'react'
import { Size, BreakpointValues, OnColor } from '../../lib'

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  root?: ReactElement
  size?: BreakpointValues<Size>
  accent?: boolean
  color?: OnColor
}
