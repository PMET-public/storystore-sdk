import { HTMLAttributes, ReactElement } from 'react'

type Value = string | string[] | number | number[]

export type PillsProps = HTMLAttributes<HTMLFormElement> & {
  root?: ReactElement
  variant?: 'single' | 'multi' | undefined
  onChange?: (values: { [key: string]: Value }) => any
  items: Array<{ id: string; label: string; value: Value }>
}
