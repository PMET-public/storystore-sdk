import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react'
import classes from '../../lib/class-names'
import style from './Button.module.css'

export type ButtonProps = {
  /** Content. */
  children: ReactNode
  /** Visual styles. */
  variant?: 'cta' | 'primary' | 'secondary' | 'overBackground'
  /** Whether the button should be less prominent. */
  quiet?: boolean
  /** Loading state. */
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FunctionComponent<ButtonProps> = ({ variant = 'primary', quiet = false, children, ...props }) => {
  return (
    <button {...props} className={classes([style.root, style[variant], [style.quiet, quiet]])}>
      {children}
    </button>
  )
}
