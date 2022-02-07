// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import {
  withMappable,
  MapTo,
  withComponentMappingContext,
  AllowedComponentsContainer,
} from '@adobe/aem-react-editable-components'

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = 'wcm/foundation/components/responsivegrid'

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Layout Container',
  isEmpty: ({ ...props }) => props.cqItemsOrder?.length < 1,
  resourceType: RESOURCE_TYPE,
}

// withMappable allows the component to be hardcoded into the SPA; <AEMResponsiveGrid .../>
export const AEMResponsiveGrid = withMappable<any>(AllowedComponentsContainer, EditConfig)

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(withComponentMappingContext(AllowedComponentsContainer), EditConfig)
