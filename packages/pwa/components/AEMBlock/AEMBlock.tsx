// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import {
  withMappable,
  MapTo,
  AllowedComponentsContainer,
  AllowedComponentsProperties,
} from '@adobe/aem-react-editable-components'
import { ContainerV1IsEmptyFn } from '@adobe/aem-core-components-react-spa'
import { classes } from '@storystore/ui-kit/lib'
import { FunctionComponent } from 'react'

// Styles
import style from './AEMBlock.module.css'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/block`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Block Container', // The component placeholder in AEM SPA Editor
  isEmpty: ContainerV1IsEmptyFn, // The function to determine if this component has been authored
  resourceType: RESOURCE_TYPE, // The sling:resourceType this SPA component is mapped to
}

const Block: FunctionComponent<AllowedComponentsProperties> = ({ ...props }) => {
  const { appliedCssClassNames = '', isInEditor } = props

  // Gap Spacing
  const gap = appliedCssClassNames.match(/block--gap-(sm|md|lg|xl)/)?.[1]

  // Alignment
  const align = appliedCssClassNames.match(/block--align-(start|center|end)/)?.[1] || 'start'

  // Vertical Alingment
  const vAlign = appliedCssClassNames.match(/block--valign-(start|center|end)/)?.[1] || 'start'

  // Padding
  const padded = !!appliedCssClassNames.match(/block--padded/)

  // Contained
  const contained = !!appliedCssClassNames.match(/block--contained/)

  return (
    <div
      className={classes([
        style.root,
        [style.padded, padded],
        [style.contained, contained],
        [style.isInEditor, isInEditor],
      ])}
      style={{
        ['--gap' as string]: gap ? `var(--spacing-${gap})` : 0,
        ['--align' as string]: align,
        ['vAlign' as string]: vAlign,
      }}
    >
      <AllowedComponentsContainer {...props} />
    </div>
  )
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(Block, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMBlock .../>
export const AEMBlock = withMappable(Block, EditConfig)
