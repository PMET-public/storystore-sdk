import { HTMLAttributes, ReactElement } from 'react'
import { BreakpointValues, Spacing, Color } from '../../lib'

export type BlockProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  /** Grid Columns Template */
  columns?: BreakpointValues<string>
  /** Grid Columns Gap */
  columnsGap?: BreakpointValues<Spacing>
  /** Grid Rows */
  rowsGap?: BreakpointValues<string>
  /** Grid Rows Gap */
  rows?: BreakpointValues<string>
  /** Overall Gap */
  gap?: BreakpointValues<Spacing>
  /** Contains centered layout */
  contained?: boolean
  /** Add side padding */
  padded?: boolean
  /** Background Color */
  background?: Color
  /** Alignment */
  align?: 'start' | 'center' | 'end'
  /** Vertical Alignment */
  vAlign?: 'start' | 'center' | 'end'
}
