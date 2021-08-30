import { ButtonHTMLAttributes, FunctionComponent, ReactElement, ReactNode } from 'react'
import { classes, merge } from '../../lib'
import style from './Button.module.css'

export type ButtonProps = {
  root?: ReactElement
  /** Content. */
  children: ReactNode
  /** Visual styles. */
  variant?: 'cta' | 'primary' | 'secondary'
  /** Whether the button should have a transparent background. */
  transparent?: boolean
  /** Loading state. */
  loading?: boolean
  /** Icon */
  icon?: ReactElement
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
      style={{ ['--size' as string]: `var(--font-${size})`, ...root.props.style }}
    >
      {icon && <icon.type {...icon.props} className={classes([style.icon, icon.props.className])} />}
      {children}
    </root.type>
  )
}
