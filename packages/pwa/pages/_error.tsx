import { Error } from '@storystore/ui-kit/components'

const ErrorPage = ({ statusCode }) => {
  return <Error status={statusCode} />
}

export default ErrorPage
