// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { ButtonV1IsEmptyFn } from '@adobe/aem-core-components-react-base'

// Import the base  component
import { Button, Link } from '@storystore/ui-kit/components'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/button`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Button',
  isEmpty: ButtonV1IsEmptyFn,
  resourceType: RESOURCE_TYPE,
}

const ButtonRoot = ({ ...props }) => {
  if (EditConfig.isEmpty(props)) return null

  const { id, text = 'Button', accessibilityLabel, link, appliedCssClassNames = '' } = props

  // Size
  const size = appliedCssClassNames.match(/button--size-(sm|md|lg)/)?.[1] || undefined

  // Variant
  const variant = appliedCssClassNames.match(/button--variant-(cta|primary|text)/)?.[1] || undefined

  // Transparent
  const transparent = !!appliedCssClassNames.match(/button--(transparent)/)?.[1]

  return (
    <Button
      root={link ? <Link href={link} /> : <button />}
      id={id}
      aria-label={accessibilityLabel}
      size={size}
      variant={variant}
      transparent={transparent}
    >
      {text}
    </Button>
  )
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(ButtonRoot, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMButton .../>
export const AEMButton = withMappable(ButtonRoot, EditConfig)
