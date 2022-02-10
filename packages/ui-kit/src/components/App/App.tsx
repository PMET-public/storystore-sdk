import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, merge } from '../../lib'
import { LinkProvider } from '../Link'
import { useNetworkStatus, useResize } from '../../hooks'
import { toast } from '../../components'

// Styles
import style from './App.module.css'

// Icons
import OfflineIcon from 'remixicon-react/WifiOffLineIcon'

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
  header = <header />,
  footer = <footer />,
  ...props
}) => {
  // Notify user when Network Online/Offline mode changes
  useNetworkStatus(online => {
    if (online) {
      toast.dismiss()
    } else {
      toast(
        <div className={style.toast}>
          <OfflineIcon /> <span>Your network is offline.</span>
        </div>,
        { hideProgressBar: true, closeOnClick: true, autoClose: false, theme: 'dark' }
      )
    }
  })

  const resize = useResize()

  const viewportHeight = resize.height

  return (
    <LinkProvider value={linkRoot}>
      <root.type
        {...merge(props, root.props)}
        className={classes([style.root, className])}
        style={{
          ['--app-viewport-height']: viewportHeight + 'px',
          ...root.props.style,
          ...props.style,
        }}
      >
        <header.type {...header.props} />

        <main className={style.body}>{children}</main>
        <footer.type {...footer.props} className={classes([style.footer, footer.props.className])} />
      </root.type>
    </LinkProvider>
  )
}
