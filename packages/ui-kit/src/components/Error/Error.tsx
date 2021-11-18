import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, merge } from '../../lib'

// Styles
import style from './Error.module.css'

// Icons
import LockIcon from 'remixicon-react/LockLineIcon'
import PlugIcon from 'remixicon-react/PlugLineIcon'
import ErrorIcon from 'remixicon-react/ErrorWarningLineIcon'
import OfflineIcon from 'remixicon-react/WifiOffLineIcon'

const error = (status: string | number) => {
  const _status = status.toString()

  switch (_status) {
    case '401':
      return (
        <span>
          <LockIcon /> You must provide credentials to access this environment.
        </span>
      )
    case '403':
      return (
        <span>
          <LockIcon />
          You don't seem to have access to this environment. <br />
          Please check your configuration.
        </span>
      )
    case '404':
      return (
        <span>
          <PlugIcon />
          Yikes! I couldn't what you were looking for.
        </span>
      )
    case '504':
      return (
        <span>
          <PlugIcon />
          Can't connect to the environment's endpoint.
          <br /> Please make sure AEM is running.
        </span>
      )
    case 'Offline':
      return (
        <span>
          <OfflineIcon />
          You are offline.
          <br /> Please check your internet connection.
        </span>
      )
    default:
      return (
        <span>
          <ErrorIcon />
          Internal Error ({status})
        </span>
      )
  }
}

export type ErrorProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  status?: 401 | 403 | 404 | 504 | 'Offline' | number
}

export const Error: FunctionComponent<ErrorProps> = ({ className, root = <div />, status = '500', ...props }) => {
  return (
    <root.type
      {...props}
      {...merge(root.props, props)}
      className={classes([style.root, root.props.className, className])}
    >
      {error(status)}
    </root.type>
  )
}
