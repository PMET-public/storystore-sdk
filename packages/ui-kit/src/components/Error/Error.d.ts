import { HTMLAttributes, ReactElement } from 'react'

export type ErrorProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  status?: 401 | 403 | 404 | 504 | 'Offline' | number
}
