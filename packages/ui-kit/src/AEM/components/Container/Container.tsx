import {
  MapTo,
  withComponentMappingContext,
  AllowedComponentsContainer,
  withMappable,
} from '@adobe/aem-react-editable-components'

const RESOURCE_TYPE = 'storystore/components/container'

const ContainerConfig = {
  emptyLabel: 'Container',
  isEmpty: function (props) {
    return !props || !props.cqItemsOrder || props.cqItemsOrder.length === 0
  },
  resourceType: RESOURCE_TYPE,
}

MapTo(RESOURCE_TYPE)(withComponentMappingContext(AllowedComponentsContainer), ContainerConfig)

export const Container = withMappable(AllowedComponentsContainer, ContainerConfig)
