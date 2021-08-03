import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import style from './App.module.css'
import { classes, merge } from '../../lib'
import { LinkProvider } from '../Link'
import { ImageProvider } from '../Image'

export type AppProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  header: ReactElement
  footer: ReactElement
  linkRoot?: ReactElement
  imageRoot?: ReactElement
}

export const App: FunctionComponent<AppProps> = ({
  root = <div />,
  linkRoot = <a />,
  imageRoot = <img />,
  className,
  children,
  header,
  footer,
  ...props
}) => {
  return (
    <LinkProvider value={linkRoot}>
      <ImageProvider value={imageRoot}>
        <root.type {...merge(props, root.props)} className={classes([style.root, className])}>
          <header.type {...header.props} className={classes([style.header, header.props.className])} />
          <div className={style.body}>{children}</div>
          <footer.type {...footer.props} className={classes([style.footer, footer.props.className])} />
        </root.type>
      </ImageProvider>
    </LinkProvider>
  )
}
