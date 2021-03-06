// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import {
  Container,
  withMappable,
  MapTo,
  withComponentMappingContext,
  MappedComponentProperties,
} from '@adobe/aem-react-editable-components'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/experiencefragment`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Experience Fragment',
  isEmpty: ({ ...props }) => {
    return !props?.configured
  },
  resourceType: RESOURCE_TYPE,
}

// withMappable allows the component to be hardcoded into the SPA; <AEMExperenceFragment .../>
export const AEMExperienceFragment = withMappable<any>(Container, EditConfig)

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(withComponentMappingContext(Container), EditConfig)
