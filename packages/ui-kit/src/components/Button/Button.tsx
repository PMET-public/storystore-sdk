import { Children, FunctionComponent, ReactNode } from 'react'
import classes from '../../lib/class-names'
import style from './Button.module.css'

export type ButtonProps = {
  /** Content. */
  children: ReactNode
  /** Visual styles. */
  variant?: 'cta' | 'primary' | 'secondary' | 'overBackground'
  type?: 'button' | 'submit' | 'reset'
  /** Whether the button should be less prominent. */
  quiet?: boolean
  /** Loading state. */
  loading?: boolean
  disabled?: boolean
}

export const Button: FunctionComponent<ButtonProps> = ({
  variant = 'primary',
  quiet = false,
  type = 'button',
  children,
  ...props
}) => {
  return (
    <button {...props} className={classes([style.root, style[variant], [style.quiet, quiet]])}>
      {children}
    </button>
  )
}
