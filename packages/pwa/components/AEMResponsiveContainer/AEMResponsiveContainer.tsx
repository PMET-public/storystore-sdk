// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'

// Import the base  component
import { ResponsiveGrid } from '@adobe/aem-react-editable-components'

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = 'wcm/foundation/components/container'

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Container',
  isEmpty: function (props) {
    return props.cqItemsOrder == null || props.cqItemsOrder.length === 0
  },
  resourceType: RESOURCE_TYPE,
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(ResponsiveGrid, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMResponsiveContainer .../>
export const AEMResponsiveContainer = withMappable(ResponsiveGrid, EditConfig)
