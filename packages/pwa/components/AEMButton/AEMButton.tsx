import { withMappable } from '@adobe/aem-react-editable-components'
import { Link, Button } from '@storystore/ui-kit/components'

const site = process.env.NEXT_PUBLIC_AEM_SITE

export const RESOURCE_TYPE = `${site}/components/button`

export const AEMButtonConfig = {
  emptyLabel: 'Button',
  isEmpty: (props: any) => !props,
  resourceType: RESOURCE_TYPE,
}

const Image = ({ id, text }) => {
  return <Button id={id}>{text}</Button>
}

export const AEMButton = withMappable(Image, AEMButtonConfig)
