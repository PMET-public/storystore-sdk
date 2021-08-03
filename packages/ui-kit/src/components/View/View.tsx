import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, Color, merge } from '../../lib'
import style from './View.module.css'

export type ViewProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  /** Contains centered layout */
  contained?: boolean
  /** Add side padding */
  padded?: boolean
  background?: Color
}

export const View: FunctionComponent<ViewProps> = ({
  root = <div />,
  className,
  contained = false,
  padded = false,
  background,
  ...props
}) => {
  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, [style.contained, contained], [style.padded, padded], className])}
      style={{
        ['--view-bg' as string]: background ? `var(--color-${background})` : 'transparent',
        ['--view-color' as string]: background ? `var(--color-on-${background})` : 'inherit',
        ...props.style,
      }}
    />
  )
}
