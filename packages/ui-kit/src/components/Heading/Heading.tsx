import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, merge, getBreakpointValues, Size, BreakpointValues, OnColor } from '../../lib'

// Styles
import style from './Heading.module.css'

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  root?: ReactElement
  size?: BreakpointValues<Size>
  accent?: boolean
  color?: OnColor
}

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
        ['--heading-size-sm']: `var(--font-${size.sm})`,
        ['--heading-size-md']: `var(--font-${size.md})`,
        ['--heading-size-lg']: `var(--font-${size.lg})`,
        ['--heading-size-xl']: `var(--font-${size.xl})`,
        ['--heading-color']: color ? `var(--color-${color})` : 'inherit',
        ...props.style,
      }}
    />
  )
}
