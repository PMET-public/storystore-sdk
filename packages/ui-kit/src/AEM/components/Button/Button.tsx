// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'

import { ButtonV1Model } from '@adobe/aem-core-components-react-base'
import { MappedComponentProperties } from '@adobe/aem-react-editable-components'
import { FunctionComponent } from 'react'
import {
  Button as ButtonComponent,
  ButtonSkeleton,
  Link,
  ButtonProps as ButtonComponentProps,
} from '../../../components'

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = 'storystore/components/button'

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Button', // The component placeholder in AEM SPA Editor
  isEmpty: (props: any) => !props.text, // The function to determine if this component has been authored
  resourceType: RESOURCE_TYPE, // The sling:resourceType this SPA component is mapped to
}

type ButtonProps = ButtonComponentProps &
  MappedComponentProperties &
  ButtonV1Model & {
    accessibilityLabel?: string
    loading?: boolean
  }

const Button: FunctionComponent<ButtonProps> = ({
  id,
  link,
  icon,
  text,
  size,
  variant,
  transparent,
  accessibilityLabel,
  className,
  style,
  cqPath,
  isInEditor,
  loading = !cqPath,
  ...rest
}) => {
  if (!text) return null

  if (icon) console.warn('Button Icon attribute is not supported')

  const Root = (p: any) =>
    loading ? (
      <ButtonSkeleton key={`skeleton--${cqPath}`} animate={loading} {...p} />
    ) : (
      <ButtonComponent root={link ? <Link href={link} /> : <button />} {...p} />
    )

  return (
    <Root
      id={id}
      aria-label={accessibilityLabel}
      size={size}
      variant={variant}
      transparent={transparent}
      className={className}
      style={style}
    >
      {text}
    </Root>
  )
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(Button, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMResponsiveGrid .../>
export const AEMButton = withMappable(Button, EditConfig)
