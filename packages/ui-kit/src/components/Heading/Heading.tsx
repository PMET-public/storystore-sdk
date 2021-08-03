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
        ['--banner-size-small' as string]: `var(--font-${size.small})`,
        ['--banner-size-medium' as string]: `var(--font-${size.medium})`,
        ['--banner-size-large' as string]: `var(--font-${size.large})`,
        ...props.style,
      }}
    />
  )
}
