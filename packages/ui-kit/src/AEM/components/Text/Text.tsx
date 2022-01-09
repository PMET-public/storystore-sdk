import { TextV2IsEmptyFn, TextV2Model } from '@adobe/aem-core-components-react-base'
import { SkeletonLoader } from '../../../components'
import { MappedComponentProperties } from '@adobe/aem-react-editable-components'
import { FunctionComponent, HTMLAttributes } from 'react'
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = 'storystore/components/text'

const EditConfig = {
  emptyLabel: 'Text', // The component placeholder in AEM SPA Editor
  isEmpty: TextV2IsEmptyFn, // The function to determine if this component has been authored
  resourceType: RESOURCE_TYPE, // The sling:resourceType this SPA component is mapped to
}

type TextProps = HTMLAttributes<HTMLDivElement> &
  TextV2Model &
  MappedComponentProperties & {
    loading?: boolean
  }

export const Text: FunctionComponent<TextProps> = ({
  text,
  richText,
  className,
  style,
  cqPath,
  isInEditor,
  loading = !isInEditor && !cqPath,
}) => {
  return loading ? (
    <SkeletonLoader uniqueKey={`skeleton--${cqPath}`} animate={loading} width="100%" height="1em" {...p}>
      <rect width="40%" height="100%" />
    </SkeletonLoader>
  ) : richText ? (
    <div
      id={cqPath.replace(/\/|:/g, '_')}
      className={className}
      style={style}
      data-cq-resource-type="storystore/components/text"
      data-rte-editelement
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  ) : (
    <div className={className} style={style}>
      {text}
    </div>
  )
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(Text, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMResponsiveGrid .../>
export const AEMText = withMappable(Text, EditConfig)
