import { HTMLAttributes, LabelHTMLAttributes, ReactElement } from 'react'

export type FieldProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
}

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  root?: ReactElement
  error?: boolean
}

export type ErrorProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
}
