import { Fragment } from 'react'
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { ImageV2IsEmptyFn } from '@adobe/aem-core-components-react-base'
import ContentLoader from 'react-content-loader'
import { Link } from '../../../../../components'

const resourceType = 'wknd-adventures/components/image'

const config = {
  isEmpty: ImageV2IsEmptyFn,
  resourceType,
}

const ImageComponent = ({
  id,
  src,
  title,
  alt,
  className,
  lazyEnabled,
  link,
  style,
  dataLayer,
  itemPath,
  loading = !dataLayer,
}) => {
  const Wrapper = (p: any) => (link ? <Link href={link} {...p} /> : <Fragment {...p} />)

  const Root = (p: any) =>
    loading ? (
      <ContentLoader uniqueKey={`skeleton--${itemPath}`} width="100%" height="100%" {...p}>
        <rect width="100%" height="100%" />
      </ContentLoader>
    ) : (
      <img {...p} />
    )

  return (
    <Wrapper>
      <Root
        id={id}
        src={src}
        title={title}
        alt={alt}
        loading={lazyEnabled ? 'lazy' : 'eager'}
        className={className}
        style={style}
      />
    </Wrapper>
  )
}

MapTo<any>('wknd-adventures/components/image')(ImageComponent, config)

export const AEMImage = withMappable<any>(ImageComponent, config)
