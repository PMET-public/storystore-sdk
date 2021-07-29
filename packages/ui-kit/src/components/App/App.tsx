import { FunctionComponent, ReactElement, useRef } from 'react'
import style from './App.module.css'

export type AppProps = {
  header: ReactElement
  footer: ReactElement
}

export const App: FunctionComponent<AppProps> = ({ header, footer, children, ...props }) => {
  return (
    <div className={style.root} {...props}>
      {header}
      <div className={style.body}>{children}</div>
      {footer}
    </div>
  )
}
