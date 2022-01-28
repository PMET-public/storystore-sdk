// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'

// Import the base  component
import { Button } from '@storystore/ui-kit/components'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/button`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Button',
  isEmpty: (props: any) => !props,
  resourceType: RESOURCE_TYPE,
}

const ButtonRoot = ({ id, text }) => {
  return <Button id={id}>{text}</Button>
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo<any>(RESOURCE_TYPE)(ButtonRoot, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMButton .../>
export const AEMButton = withMappable(ButtonRoot, EditConfig)
