import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, merge, Size, BreakpointValues, getBreakpointValues } from '../../lib'
import style from './Heading.module.css'

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  root?: ReactElement
  size?: BreakpointValues<Size>
  accent?: boolean
}

export const Heading: FunctionComponent<HeadingProps> = ({
  root = <h2 />,
  size: _size = 'normal',
  accent,
  className,
  ...props
}) => {
  const size = getBreakpointValues(_size)

  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, [style.accent, accent], className])}
      style={{
        ['--banner-size-sm' as string]: `var(--font-${size.sm})`,
        ['--banner-size-md' as string]: `var(--font-${size.md})`,
        ['--banner-size-lg' as string]: `var(--font-${size.lg})`,
        ['--banner-size-xl' as string]: `var(--font-${size.xl})`,
        ...props.style,
      }}
    />
  )
}
