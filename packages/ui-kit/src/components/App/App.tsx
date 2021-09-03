import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import style from './App.module.css'
import { classes, merge } from '../../lib'
import { LinkProvider } from '../Link'
import { useNetworkStatus } from '../../hooks'
import { toast } from '../../components'

import OfflineIcon from 'remixicon/icons/Device/wifi-off-line.svg'

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
  useNetworkStatus(online => {
    if (online) {
      toast.dismiss()
    } else {
      toast(
        <div className={style.toast}>
          <OfflineIcon /> Your network is offline.
        </div>,
        { hideProgressBar: true, closeOnClick: true, autoClose: false, theme: 'dark' }
      )
    }
  })

  return (
    <LinkProvider value={linkRoot}>
      <root.type {...merge(props, root.props)} className={classes([style.root, className])}>
        <header.type {...header.props} className={classes([style.header, header.props.className])} />
        <main className={style.body}>{children}</main>
        <footer.type {...footer.props} className={classes([style.footer, footer.props.className])} />
      </root.type>
    </LinkProvider>
  )
}
