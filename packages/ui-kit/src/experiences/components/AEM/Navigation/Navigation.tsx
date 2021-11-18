import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { NavigationV1IsEmptyFn } from '@adobe/aem-core-components-react-base'
import { Link, Block, SkeletonLoader } from '../../../../components'

const resourceType = 'storystore/components/navigation'

const config = {
  isEmpty: NavigationV1IsEmptyFn,
  resourceType,
}

const NavigationComponent = ({ componentProperties, className, style, itemPath, cqPath, loading = !cqPath }) => {
  console.log('List Component', { componentProperties })
  const { id, items } = componentProperties

  const Root = (p: any) =>
    loading ? (
      <SkeletonLoader uniqueKey={`skeleton--${itemPath}`} animate={loading} width="100%" height="1em" {...p}>
        <rect width="40%" height="100%" />
      </SkeletonLoader>
    ) : (
      <Block root={<nav />} gap="sm" {...p} />
    )

  return (
    <Root id={id} className={className} style={style}>
      {items?.map(({ id, url, title }) => (
        <Link key={id} href={url}>
          {title}
        </Link>
      ))}
    </Root>
  )
}

MapTo<any>(resourceType)(NavigationComponent, config)

export const AEMNavigation = withMappable<any>(NavigationComponent, config)
