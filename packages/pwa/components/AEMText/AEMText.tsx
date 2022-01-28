// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { TextV2IsEmptyFn } from '@adobe/aem-core-components-react-base'
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'

// Import the base  component
import { Text, Html } from '@storystore/ui-kit'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/text`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Text',
  isEmpty: TextV2IsEmptyFn,
  resourceType: RESOURCE_TYPE,
}

const TextRoot = ({ ...props }) => {
  const { id, richText, text } = props
  return richText ? <Html id={id} htmlString={text} /> : <Text id={id}>{text}</Text>
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo<any>(RESOURCE_TYPE)(TextRoot, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMText .../>
export const AEMText = withMappable(TextRoot, EditConfig)
