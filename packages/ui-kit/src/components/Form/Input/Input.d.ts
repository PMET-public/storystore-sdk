import { InputHTMLAttributes, ReactElement } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  root?: ReactElement
  error?: boolean
}
