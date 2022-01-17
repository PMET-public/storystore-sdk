// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable } from '@adobe/aem-react-editable-components'

// Import the base ResponsiveGrid component
import { ResponsiveGrid } from '@adobe/aem-react-editable-components'

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = 'wcm/foundation/components/responsivegrid'

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
export const AEMResponsiveGridConfig = {
  emptyLabel: 'Layout Container', // The component placeholder in AEM SPA Editor
  isEmpty: (props: any) => props.cqItemsOrder?.length === 0, // The function to determine if this component has been authored
  resourceType: RESOURCE_TYPE, // The sling:resourceType this SPA component is mapped to
}

// withMappable allows the component to be hardcoded into the SPA; <AEMResponsiveGrid .../>
export const AEMResponsiveGrid = withMappable(ResponsiveGrid, AEMResponsiveGridConfig)
