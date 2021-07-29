import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react'
import classes from '../../lib/class-names'
import style from './Button.module.css'

export type ButtonProps = {
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
  variant = 'primary',
  transparent = false,
  children,
  ...props
}) => {
  return (
    <button {...props} className={classes([style.root, style[variant], [style.transparent, transparent]])}>
      {children}
    </button>
  )
}
