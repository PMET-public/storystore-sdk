import { Fragment } from 'react'
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { ImageV2IsEmptyFn } from '@adobe/aem-core-components-react-base'
import { Link } from '../../../../../components'

const resourceType = 'wknd-adventures/components/image'

const config = {
  isEmpty: ImageV2IsEmptyFn,
  resourceType,
}

const ImageComponent = ({ id, src, title, alt, className, lazyEnabled, link, style }) => {
  const Root = (p: any) => (link ? <Link href={link} {...p} /> : <Fragment {...p} />)

  return (
    <Root>
      <img
        id={id}
        src={src}
        title={title}
        alt={alt}
        loading={lazyEnabled ? 'lazy' : 'eager'}
        className={className}
        style={style}
      />
    </Root>
  )
}

MapTo<any>('wknd-adventures/components/image')(ImageComponent, config)

export const AEMImage = withMappable<any>(ImageComponent, config)
