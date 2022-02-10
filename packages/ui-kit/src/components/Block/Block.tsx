import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, merge, BreakpointValues, Spacing, Color, getBreakpointValues } from '../../lib'

// Styles
import style from './Block.module.css'

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

export const Block: FunctionComponent<BlockProps> = ({
  root = <div />,
  className,
  background,
  contained,
  padded,
  gap: _gap,
  columns: _columns = '1fr',
  columnsGap: _columnsGap,
  rows: _rows = 'max-content',
  rowsGap: _rowsGap,
  align = 'unset',
  vAlign = 'unset',
  ...props
}) => {
  const gap = getBreakpointValues(_gap)
  const columns = getBreakpointValues(_columns)
  const rows = getBreakpointValues(_rows)
  const columnsGap = getBreakpointValues(_columnsGap)
  const rowsGap = getBreakpointValues(_rowsGap)

  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, [style.contained, contained], [style.padded, padded], className])}
      style={{
        ['--view-bg']: background ? `var(--color-${background})` : 'transparent',
        ['--view-color']: background ? `var(--color-on-${background})` : 'inherit',
        ['--grid-columns-sm']: columns.sm || 'initial',
        ['--grid-columns-md']: columns.md || 'initial',
        ['--grid-columns-lg']: columns.lg || 'initial',
        ['--grid-columns-xl']: columns.xl || 'initial',
        ['--grid-rows-sm']: rows.sm || 'initial',
        ['--grid-rows-md']: rows.md || 'initial',
        ['--grid-rows-lg']: rows.lg || 'initial',
        ['--grid-rows-xl']: rows.xl || 'initial',

        ['--grid-columns-gap-sm']: columnsGap.sm
          ? `var(--spacing-${columnsGap.sm})`
          : gap.sm
          ? `var(--spacing-${gap.sm})`
          : 'initial',
        ['--grid-columns-gap-md']: columnsGap.md
          ? `var(--spacing-${columnsGap.md})`
          : gap.md
          ? `var(--spacing-${gap.md})`
          : 'initial',
        ['--grid-columns-gap-lg']: columnsGap.lg
          ? `var(--spacing-${columnsGap.lg})`
          : gap.lg
          ? `var(--spacing-${gap.lg})`
          : 'initial',
        ['--grid-columns-gap-xl']: columnsGap.xl
          ? `var(--spacing-${columnsGap.xl})`
          : gap.xl
          ? `var(--spacing-${gap.xl})`
          : 'initial',

        ['--grid-rows-gap-sm']: rowsGap.sm
          ? `var(--spacing-${rowsGap.sm})`
          : gap.sm
          ? `var(--spacing-${gap.sm})`
          : 'initial',
        ['--grid-rows-gap-md']: rowsGap.md
          ? `var(--spacing-${rowsGap.md})`
          : gap.md
          ? `var(--spacing-${gap.md})`
          : 'initial',
        ['--grid-rows-gap-lg']: rowsGap.lg
          ? `var(--spacing-${rowsGap.lg})`
          : gap.lg
          ? `var(--spacing-${gap.lg})`
          : 'initial',
        ['--grid-rows-gap-xl']: rowsGap.xl
          ? `var(--spacing-${rowsGap.xl})`
          : gap.xl
          ? `var(--spacing-${gap.xl})`
          : 'initial',

        ['--align']: align,
        ['--vAlign']: vAlign,

        ...props.style,
      }}
    />
  )
}
