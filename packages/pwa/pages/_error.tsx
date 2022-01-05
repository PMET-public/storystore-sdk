import { Error } from '@storystore/ui-kit/components'
import { NextPage } from 'next'

const ErrorPage: NextPage<any> = ({ statusCode }) => {
  return <Error status={statusCode} />
}

export default ErrorPage
