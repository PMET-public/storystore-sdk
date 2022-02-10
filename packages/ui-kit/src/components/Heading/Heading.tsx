import { FunctionComponent, HTMLAttributes, ReactElement, isValidElement } from 'react'
import { classes, merge, getBreakpointValues, Size, BreakpointValues, OnColor } from '../../lib'
import { SkeletonLoader, Block } from '..'

// Styles
import style from './Heading.module.css'

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  root?: ReactElement
  size?: BreakpointValues<Size>
  accent?: boolean
  color?: OnColor
  icon?: ReactElement<HTMLAttributes<SVGAElement>>
  padded?: boolean
}

export const Heading: FunctionComponent<HeadingProps> = ({
  root = <div />,
  size: _size = 'xl',
  accent,
  className,
  color,
  icon,
  padded,
  children,
  ...props
}) => {
  const size = getBreakpointValues(_size)

  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, [style.padded, padded], [(style.accent, accent)], className])}
      style={{
        ['--heading-size-sm']: `var(--font-${size.sm})`,
        ['--heading-size-md']: `var(--font-${size.md})`,
        ['--heading-size-lg']: `var(--font-${size.lg})`,
        ['--heading-size-xl']: `var(--font-${size.xl})`,
        ['--heading-color']: color ? `var(--color-${color})` : 'inherit',
        ...props.style,
      }}
    >
      {isValidElement(icon) ? (
        <div className={style.iconWrapper}>
          <icon.type {...icon.props} className={classes([style.icon, icon.props.className])} />
          {children}
        </div>
      ) : (
        children
      )}
    </root.type>
  )
}

// Loader Skeleton
export type HeadingSkeletonProps = HTMLAttributes<SVGAElement> & {
  uniqueKey?: string
}

export const HeadingSkeleton: FunctionComponent<HeadingSkeletonProps> = ({ uniqueKey, ...props }) => {
  return (
    <SkeletonLoader uniqueKey={uniqueKey} width="100%" height="1em" {...props}>
      <rect width="100%" height="100%" />
    </SkeletonLoader>
  )
}
