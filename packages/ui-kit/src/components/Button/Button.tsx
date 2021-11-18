import { FunctionComponent, isValidElement, ButtonHTMLAttributes, ReactElement, ReactNode, HTMLAttributes } from 'react'
import { classes, merge } from '../../lib'
import { SkeletonLoader } from '../'

// Styles
import style from './Button.module.css'

export type ButtonProps = {
  root?: ReactElement
  /** Content. */
  children?: ReactNode
  /** Visual styles. */
  variant?: 'cta' | 'primary' | 'text'
  /** Whether the button should have a transparent background. */
  transparent?: boolean
  /** Icon */
  icon?: ReactElement<any, 'svg'> | string
  /** Size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FunctionComponent<ButtonProps> = ({
  root = <button />,
  variant = 'primary',
  transparent = false,
  children,
  className,
  icon: _icon,
  size = 'md',
  ...props
}) => {
  let Icon = null

  if (typeof _icon === 'string' && _icon !== '') {
    try {
      Icon = require(`remixicon-react/${_icon}.js`)
    } catch (_) {
      console.log(
        `Icon ${_icon} not found. Just search for an icon on remixicon.com and look for its name. The name translates to PascalCase followed by the suffix Icon in remixicon-react.`
      )
    }
  }

  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, style[variant], [style.transparent, transparent], className])}
      style={{ ['--size']: `var(--font-${size})`, ...root.props.style, ...props.style }}
    >
      {isValidElement(_icon) ? (
        <_icon.type {..._icon.props} className={classes([style.icon, _icon.props.className])} />
      ) : (
        Icon && <Icon className={style.icon} />
      )}
      {children}
    </root.type>
  )
}

// Loader Skeleton
export type ButtonSkeletonProps = HTMLAttributes<SVGAElement> & {
  uniqueKey?: string
}

export const ButtonSkeleton: FunctionComponent<ButtonSkeletonProps> = ({ uniqueKey, ...props }) => {
  return (
    <SkeletonLoader uniqueKey={uniqueKey} width={250} height="3em" {...props}>
      <rect width="100%" height="100%" />
    </SkeletonLoader>
  )
}
