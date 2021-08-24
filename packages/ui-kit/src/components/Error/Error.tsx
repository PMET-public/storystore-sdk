import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, merge } from '../../lib'
import style from './Error.module.css'
import LockIcon from 'remixicon/icons/System/lock-line.svg'
import PlugIcon from 'remixicon/icons/Others/plug-line.svg'
import ErrorIcon from 'remixicon/icons/System/error-warning-line.svg'
import OfflineIcon from 'remixicon/icons/Device/wifi-off-line.svg'

export type ErrorProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  status?: 401 | 403 | 404 | 504 | 'Offline'
}

const error = (status: number | string) => {
  const _status = status.toString()

  switch (_status) {
    case '401':
      return (
        <span>
          <LockIcon /> You must provide GraphQL credentials to access this endpoint.
        </span>
      )
    case '403':
      return (
        <span>
          <LockIcon />
          The GraphQL credentials provided are incorrect. Please check your configuration.
        </span>
      )
    case '404':
      return (
        <span>
          <PlugIcon />
          The GraphQL endpoint provided can't be found.
        </span>
      )
    case '504':
      return (
        <span>
          <PlugIcon />
          Can't connect to the GraphQL endpoint.
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

export const Error: FunctionComponent<ErrorProps> = ({ className, root = <div />, status = 500, ...props }) => {
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
