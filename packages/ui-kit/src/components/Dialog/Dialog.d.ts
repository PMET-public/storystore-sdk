import { HTMLAttributes, ReactElement } from 'react'

export type DialogProps = {
  root?: ReactElement
  open?: boolean
  onClose?: (state: false) => any
} & HTMLAttributes<HTMLDivElement>
