import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, merge } from '../../lib'
import style from './Error.module.css'
import LockIcon from 'remixicon/icons/System/lock-line.svg'
import PlugIcon from 'remixicon/icons/Others/plug-line.svg'
import ErrorIcon from 'remixicon/icons/System/error-warning-line.svg'

export type ErrorProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  status?: number | string
}

const error = (status: number | string) => {
  const _status = Number(status)

  switch (_status) {
    case 401:
      return (
        <span>
          <LockIcon /> You must provide GraphQL credentials to access this endpoint.
        </span>
      )
    case 403:
      return (
        <span>
          <LockIcon />
          The GraphQL credentials provided are incorrect. Please check your configuration.
        </span>
      )
    case 404:
      return (
        <span>
          <PlugIcon />
          The GraphQL endpoint provided can't be found.
        </span>
      )
    case 504:
      return (
        <span>
          <PlugIcon />
          Can't connect to the GraphQL endpoint.
          <br /> Please make sure AEM is running.
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
