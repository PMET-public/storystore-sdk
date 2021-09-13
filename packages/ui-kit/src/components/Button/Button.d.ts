import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'

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
