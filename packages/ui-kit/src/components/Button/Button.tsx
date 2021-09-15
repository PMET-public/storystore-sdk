import { FunctionComponent, isValidElement, ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'
import { classes, merge } from '../../lib'

// Styles
import style from './Button.module.css'

export type ButtonProps = {
  root?: ReactElement
  /** Content. */
  children: ReactNode
  /** Visual styles. */
  variant?: 'cta' | 'primary' | 'secondary' | 'text'
  /** Whether the button should have a transparent background. */
  transparent?: boolean
  /** Loading state. */
  loading?: boolean
  /** Icon */
  icon?: ReactElement<any, 'svg'>
  /** Size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FunctionComponent<ButtonProps> = ({
  root = <button />,
  variant = 'primary',
  transparent = false,
  children,
  className,
  icon,
  size = 'md',
  ...props
}) => {
  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, style[variant], [style.transparent, transparent], className])}
      style={{ ['--size']: `var(--font-${size})`, ...root.props.style, ...props.style }}
    >
      {isValidElement(icon) && <icon.type {...icon.props} className={classes([style.icon, icon.props.className])} />}
      {children}
    </root.type>
  )
}
