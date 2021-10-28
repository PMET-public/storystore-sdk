import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { ImageV2IsEmptyFn } from '@adobe/aem-core-components-react-base'
import { SkeletonLoader, Link } from '../../../../components'

const resourceType = 'storystore/components/image'

const config = {
  isEmpty: ImageV2IsEmptyFn,
  resourceType,
}

const ImageComponent = ({ componentProperties, className, style, itemPath, cqPath, loading = !cqPath }) => {
  const { id, disableLazyLoading, src, alt, link, title } = componentProperties

  const Wrapper = ({ children }) => (link ? <Link href={link}>{children}</Link> : children)

  const Root = (p: any) =>
    loading ? (
      <SkeletonLoader uniqueKey={`skeleton--${itemPath}`} animate={loading} width="100%" height="1em" {...p}>
        <rect width="100%" height="100%" />
      </SkeletonLoader>
    ) : (
      <img {...p} />
    )

  return (
    <Wrapper>
      <Root
        id={id}
        className={className}
        style={style}
        loading={disableLazyLoading ? 'eager' : 'lazy'}
        src={src}
        alt={alt}
        title={title}
      />
    </Wrapper>
  )
}

MapTo<any>(resourceType)(ImageComponent, config)

export const AEMImage = withMappable<any>(ImageComponent, config)
