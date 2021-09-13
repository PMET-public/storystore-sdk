import { HTMLAttributes, ReactElement } from 'react'

export type AppProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  header: ReactElement
  footer: ReactElement
  linkRoot?: ReactElement
}
