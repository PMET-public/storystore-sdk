// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'

// Import the base  component
import { Heading } from '@storystore/ui-kit/components'

import { createElement } from 'react'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/title`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Title',
  isEmpty: (props: any) => !props,
  resourceType: RESOURCE_TYPE,
}

const Title = ({ ...props }) => {
  const { id, text, type = 'h1', appliedCssClassNames = '', icon, size: _size } = props

  // Size
  const size = appliedCssClassNames.match(/title--size-(md|lg|xl|2xl|3xl|4xl)/)?.[1] || _size

  // Padding
  const padded = !!appliedCssClassNames.match(/title--padded/)

  // Accent
  const accent = !!appliedCssClassNames.match(/title--accent/)

  return (
    <Heading icon={icon} id={id} root={createElement(type)} size={size} padded={padded} accent={accent}>
      {text}
    </Heading>
  )
}

// withMappable allows the component to be hardcoded into the SPA; <AEMTitle .../>
export const AEMTitle = withMappable<any>(Title, EditConfig)

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(Title, EditConfig)
