import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, merge, BreakpointValues, Spacing, Color, getBreakpointValues } from '../../lib'
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
  columns: _columns,
  columnsGap: _columnsGap,
  rows: _rows,
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
        ['--view-bg' as string]: background ? `var(--color-${background})` : 'transparent',
        ['--view-color' as string]: background ? `var(--color-on-${background})` : 'inherit',
        ['--grid-columns-sm' as string]: columns.sm || 'initial',
        ['--grid-columns-md' as string]: columns.md || 'initial',
        ['--grid-columns-lg' as string]: columns.lg || 'initial',
        ['--grid-columns-xl' as string]: columns.xl || 'initial',
        ['--grid-rows-sm' as string]: rows.sm || 'initial',
        ['--grid-rows-md' as string]: rows.md || 'initial',
        ['--grid-rows-lg' as string]: rows.lg || 'initial',
        ['--grid-rows-xl' as string]: rows.xl || 'initial',

        ['--grid-columns-gap-sm' as string]: columnsGap.sm
          ? `var(--spacing-${columnsGap.sm})`
          : `var(--spacing-${gap.sm})`,
        ['--grid-columns-gap-md' as string]: columnsGap.md
          ? `var(--spacing-${columnsGap.md})`
          : `var(--spacing-${gap.md})`,
        ['--grid-columns-gap-lg' as string]: columnsGap.lg
          ? `var(--spacing-${columnsGap.lg})`
          : `var(--spacing-${gap.lg})`,
        ['--grid-columns-gap-xl' as string]: columnsGap.xl
          ? `var(--spacing-${columnsGap.xl})`
          : `var(--spacing-${gap.xl})`,

        ['--grid-rows-gap-sm' as string]: rowsGap.sm ? `var(--spacing-${rowsGap.sm})` : `var(--spacing-${gap.sm})`,
        ['--grid-rows-gap-md' as string]: rowsGap.md ? `var(--spacing-${rowsGap.md})` : `var(--spacing-${gap.md})`,
        ['--grid-rows-gap-lg' as string]: rowsGap.lg ? `var(--spacing-${rowsGap.lg})` : `var(--spacing-${gap.lg})`,
        ['--grid-rows-gap-xl' as string]: rowsGap.xl ? `var(--spacing-${rowsGap.xl})` : `var(--spacing-${gap.xl})`,

        ['--align' as string]: align,
        ['--vAlign' as string]: vAlign,

        ...props.style,
      }}
    />
  )
}
