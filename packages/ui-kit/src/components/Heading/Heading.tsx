import { FunctionComponent } from 'react'
import { HeadingProps } from './Heading.d'
import { classes, merge, getBreakpointValues } from '../../lib'

// Styles
import style from './Heading.module.css'

export const Heading: FunctionComponent<HeadingProps> = ({
  root = <h2 />,
  size: _size = 'normal',
  accent,
  className,
  color,
  ...props
}) => {
  const size = getBreakpointValues(_size)

  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, [style.accent, accent], className])}
      style={{
        ['--heading-size-sm' as string]: `var(--font-${size.sm})`,
        ['--heading-size-md' as string]: `var(--font-${size.md})`,
        ['--heading-size-lg' as string]: `var(--font-${size.lg})`,
        ['--heading-size-xl' as string]: `var(--font-${size.xl})`,
        ['--heading-color' as string]: color ? `var(--color-${color})` : 'inherit',
        ...props.style,
      }}
    />
  )
}
