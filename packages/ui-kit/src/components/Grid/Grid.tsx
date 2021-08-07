import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, merge, BreakpointValues, Spacing, getBreakpointValues } from '../../lib'
import style from './Grid.module.css'

export type GridProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  columns?: BreakpointValues<string>
  rows?: BreakpointValues<string>
  gap?: BreakpointValues<Spacing>
}

export const Grid: FunctionComponent<GridProps> = ({
  root = <div />,
  className,
  gap: _gap,
  columns: _columns,
  rows: _rows,
  ...props
}) => {
  const columns = getBreakpointValues(_columns)
  const rows = getBreakpointValues(_rows)
  const gap = getBreakpointValues(_gap)

  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, className])}
      style={{
        ['--grid-columns-sm' as string]: columns.sm || 'initial',
        ['--grid-columns-md' as string]: columns.md || 'initial',
        ['--grid-columns-lg' as string]: columns.lg || 'initial',
        ['--grid-columns-xl' as string]: columns.xl || 'initial',
        ['--grid-rows-sm' as string]: rows.sm || 'initial',
        ['--grid-rows-md' as string]: rows.md || 'initial',
        ['--grid-rows-lg' as string]: rows.lg || 'initial',
        ['--grid-rows-xl' as string]: rows.xl || 'initial',
        ['--grid-gap-sm' as string]: gap.sm ? `var(--spacing-${gap.sm})` : 0,
        ['--grid-gap-md' as string]: gap.md ? `var(--spacing-${gap.md})` : 0,
        ['--grid-gap-lg' as string]: gap.lg ? `var(--spacing-${gap.lg})` : 0,
        ['--grid-gap-xl' as string]: gap.xl ? `var(--spacing-${gap.xl})` : 0,
        ...props.style,
      }}
    />
  )
}
