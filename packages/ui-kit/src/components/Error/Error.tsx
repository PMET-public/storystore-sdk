import { FunctionComponent } from 'react'
import { ErrorProps } from './Error.d'
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
