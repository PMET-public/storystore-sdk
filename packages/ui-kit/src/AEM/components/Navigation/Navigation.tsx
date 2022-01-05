import { NavigationV1Model } from '@adobe/aem-core-components-react-base'
import { MappedComponentProperties, withMappable, MapTo } from '@adobe/aem-react-editable-components'
// import { MapTo } from '@adobe/aem-spa-component-mapping'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Link, Block, SkeletonLoader } from '../../../components'

type NavigationProps = HTMLAttributes<HTMLDivElement> &
  MappedComponentProperties &
  NavigationV1Model & {
    loading?: boolean
  }

const RESOURCE_TYPE = 'storystore/components/navigation'

const EditConfig = {
  emptyLabel: 'Navigation', // The component placeholder in AEM SPA Editor
  isEmpty: function (props) {
    return !props || !props.cqItemsOrder || props.cqItemsOrder.length === 0
  },
  resourceType: RESOURCE_TYPE, // The sling:resourceType this SPA component is mapped to
}

export const NavigationRoot: FunctionComponent<NavigationProps> = ({
  id,
  items,
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
    ) : (
      <Block root={<nav />} gap="sm" {...p} />
    )

  return (
    <Root id={id} className={className} style={style}>
      {items?.map(({ url, title }, key) => (
        <Link key={key} href={url}>
          {title}
        </Link>
      ))}
    </Root>
  )
}

MapTo(RESOURCE_TYPE)(NavigationRoot, EditConfig)

export const Navigation = withMappable(NavigationRoot, EditConfig)
