import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import style from './App.module.css'
import { classes, merge } from '../../lib'
import { LinkProvider } from '../Link'

export type AppProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  header: ReactElement
  footer: ReactElement
  linkRoot?: ReactElement
}

export const App: FunctionComponent<AppProps> = ({
  root = <div />,
  linkRoot = <a />,
  className,
  children,
  header,
  footer,
  ...props
}) => {
  return (
    <LinkProvider value={linkRoot}>
      <root.type {...merge(props, root.props)} className={classes([style.root, className])}>
        <header.type {...header.props} className={classes([style.header, header.props.className])} />
        <div className={style.body}>{children}</div>
        <footer.type {...footer.props} className={classes([style.footer, footer.props.className])} />
      </root.type>
    </LinkProvider>
  )
}
