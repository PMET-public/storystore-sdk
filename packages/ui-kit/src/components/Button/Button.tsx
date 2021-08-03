import { ButtonHTMLAttributes, FunctionComponent, HTMLAttributes, ReactElement, ReactNode } from 'react'
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
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FunctionComponent<ButtonProps> = ({
  root = <button />,
  variant = 'primary',
  transparent = false,
  children,
  className,
  ...props
}) => {
  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, style[variant], [style.transparent, transparent], className])}
    >
      {children}
    </root.type>
  )
}
