// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import {
  withMappable,
  MapTo,
  AllowedComponentsContainer,
  AllowedComponentsProperties,
  withComponentMappingContext,
} from '@adobe/aem-react-editable-components'
import { classes } from '@storystore/ui-kit/lib'
import { FunctionComponent } from 'react'

// Styles
import style from './AEMContainer.module.css'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/container`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Container', // The component placeholder in AEM SPA Editor
  isEmpty: ({ ...props }) => props.cqItems && Object.keys(props.cqItems).length < 1, // The function to determine if this component has been authored
  resourceType: RESOURCE_TYPE, // The sling:resourceType this SPA component is mapped to
}

const Container: FunctionComponent<AllowedComponentsProperties> = ({ ...props }) => {
  console.log('Is Empty?', EditConfig.isEmpty(props))

  const { appliedCssClassNames = '', isInEditor } = props

  // Gap Spacing
  const gap = appliedCssClassNames.match(/container--gap-(sm|md|lg|xl)/)?.[1]

  // Padding
  const padded = !!appliedCssClassNames.match(/container--padded/)

  // Contained
  const contained = !!appliedCssClassNames.match(/container--contained/)

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
      }}
    >
      <AllowedComponentsContainer {...props} />
    </div>
  )
}

// withMappable allows the component to be hardcoded into the SPA; <AEMContainer .../>
export const AEMContainer = withMappable(Container, EditConfig)

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(withComponentMappingContext(Container), EditConfig)
