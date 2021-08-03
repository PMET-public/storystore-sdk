import { useRouter } from 'next/dist/client/router'

import { wknd } from '@storystore/ui-kit/experiences'

const AdventureComponent = wknd.pages.Adventure

export default function Adventure({ ...props }) {
  const { asPath } = useRouter()
  return <AdventureComponent path={asPath} {...props} />
}
