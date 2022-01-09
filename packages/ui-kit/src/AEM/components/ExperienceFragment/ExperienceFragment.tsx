import { MapTo, withComponentMappingContext, Container, withMappable } from '@adobe/aem-react-editable-components'

const RESOURCE_TYPE = 'storystore/components/experiencefragment'

const ExperienceFragmentVariationConfig = {
  emptyLabel: 'Experience Fragment',
  isEmpty: function (props) {
    return !props || !props.configured
  },
  resourceType: RESOURCE_TYPE,
}

MapTo(RESOURCE_TYPE)(withComponentMappingContext(Container), ExperienceFragmentVariationConfig)

export const AEMExperienceFragment = withMappable(Container, ExperienceFragmentVariationConfig)
