import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { WKND } from '@storystore/ui-kit/experiences'

const Adventure: NextPage = ({ ...props }) => {
  const { asPath } = useRouter()
  return <WKND.Adventure path={asPath} {...props} />
}

export default Adventure
