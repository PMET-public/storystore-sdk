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
        ['--grid-columns-small' as string]: columns.small || 'initial',
        ['--grid-columns-medium' as string]: columns.medium || 'initial',
        ['--grid-columns-large' as string]: columns.large || 'initial',
        ['--grid-rows-small' as string]: rows.small || 'initial',
        ['--grid-rows-medium' as string]: rows.medium || 'initial',
        ['--grid-rows-large' as string]: rows.large || 'initial',
        ['--grid-gap-small' as string]: gap.small ? `var(--spacing-${gap.small})` : 0,
        ['--grid-gap-medium' as string]: gap.medium ? `var(--spacing-${gap.medium})` : 0,
        ['--grid-gap-large' as string]: gap.large ? `var(--spacing-${gap.large})` : 0,
        ...props.style,
      }}
    />
  )
}
