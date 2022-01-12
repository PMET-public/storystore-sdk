// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'

// AEM Component
import { Page, PageProperties } from '@adobe/aem-react-editable-components'

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = 'storystore/components/page'

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Layout Container', // The component placeholder in AEM SPA Editor
  isEmpty: function (props: PageProperties) {
    return props.cqItemsOrder?.length === 0
  }, // The function to determine if this component has been authored
  resourceType: RESOURCE_TYPE, // The sling:resourceType this SPA component is mapped to
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(Page, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMResponsiveGrid .../>
export const AEMPage = withMappable(Page, EditConfig)
