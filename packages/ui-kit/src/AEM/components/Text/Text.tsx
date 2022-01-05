import { TextV2IsEmptyFn, TextV2Model } from '@adobe/aem-core-components-react-base'
import { SkeletonLoader, Html, HtmlProps } from '../../../components'
import { MappedComponentProperties } from '@adobe/aem-react-editable-components'
import { FunctionComponent } from 'react'
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = 'storystore/components/text'

const EditConfig = {
  emptyLabel: 'Text', // The component placeholder in AEM SPA Editor
  isEmpty: TextV2IsEmptyFn, // The function to determine if this component has been authored
  resourceType: RESOURCE_TYPE, // The sling:resourceType this SPA component is mapped to
}

type TextProps = HtmlProps &
  TextV2Model &
  MappedComponentProperties & {
    loading?: boolean
  }

export const TextRoot: FunctionComponent<TextProps> = ({
  id,
  text,
  richText,
  className,
  style,
  cqPath,
  loading = !cqPath,
}) => {
  const Root = (p: any) =>
    loading ? (
      <SkeletonLoader uniqueKey={`skeleton--${cqPath}`} animate={loading} width="100%" height="1em" {...p}>
        <rect width="40%" height="100%" />
      </SkeletonLoader>
    ) : richText ? (
      <Html htmlString={text} {...p} />
    ) : (
      <div {...p}>{text}</div>
    )

  return <Root id={id} className={className} style={style} />
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(TextRoot, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMResponsiveGrid .../>
export const Text = withMappable(TextRoot, EditConfig)
