import { withMappable, MapTo, ResponsiveGrid } from '@adobe/aem-react-editable-components'

const resourceType = 'wcm/foundation/components/responsivegrid'

const config = {
  emptyLabel: 'Layout Container', // The component placeholder in AEM SPA Editor
  isEmpty: function (props: any) {
    console.group(props.cqItemsOrder == null || props.cqItemsOrder.length === 0, { props })
    return props.cqItemsOrder == null || props.cqItemsOrder.length === 0
  },
  resourceType,
}

MapTo<any>(resourceType)(ResponsiveGrid, config)

export const AEMResponsiveGrid = withMappable<any>(ResponsiveGrid, config)
