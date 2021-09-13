import { HTMLAttributes, ReactElement } from 'react'
import { Color } from '../../../lib'

export type SwatchesProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  name: string
  items: Array<HTMLAttributes<HTMLInputElement> & { label: ReactElement | string; value: any }>
  variant?: 'multi' | 'single'
  color?: Color
}
