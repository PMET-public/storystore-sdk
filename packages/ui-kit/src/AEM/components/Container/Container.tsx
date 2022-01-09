import {
  MapTo,
  withComponentMappingContext,
  AllowedComponentsContainer,
  AllowedComponentsProperties,
  withMappable,
} from '@adobe/aem-react-editable-components'
import { FunctionComponent } from 'react'
import { BreakpointValues, getBreakpointValues } from '../../../lib'

import style from './Container.module.css'

const RESOURCE_TYPE = 'storystore/components/container'

const ContainerConfig = {
  emptyLabel: 'Container',
  isEmpty: function (props) {
    return props?.cqItemsOrder?.length === 0
  },
  resourceType: RESOURCE_TYPE,
}

type ContainerProps = AllowedComponentsProperties & { gap?: BreakpointValues<string> }

const Container: FunctionComponent<ContainerProps> = ({ ...props }) => {
  console.log('Container', props)
  const _gap = {}
  const gap = getBreakpointValues(_gap)

  return (
    <div
      className={style.root}
      style={{
        ['--grid-gap-sm' as string]: gap.sm || 'initial',
        ['--grid-gap-md' as string]: gap.md || 'initial',
        ['--grid-gap-lg' as string]: gap.lg || 'initial',
        ['--grid-gap-xl' as string]: gap.xl || 'initial',
      }}
    >
      <AllowedComponentsContainer {...props} />
    </div>
  )
}

MapTo(RESOURCE_TYPE)(withComponentMappingContext(AllowedComponentsContainer), ContainerConfig)

export const AEMContainer = withMappable(AllowedComponentsContainer, ContainerConfig)
