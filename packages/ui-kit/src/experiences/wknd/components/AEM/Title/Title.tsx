import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { TitleV2IsEmptyFn } from '@adobe/aem-core-components-react-base'
import { Fragment, createElement } from 'react'
import { Link, SkeletonLoader } from '../../../../../components'

const resourceType = 'wknd-adventures/components/title'

const config = {
  isEmpty: TitleV2IsEmptyFn,
  resourceType,
}

const TitleComponent = ({
  componentProperties,
  className,
  style,
  itemPath,
  cqPath,
  loading = !cqPath,
  cqType,
  loaded = !!cqType,
}) => {
  const { id, linkDisabled, link, text, type = 'h1' } = componentProperties

  const Root = (p: any) =>
    loading || !loaded ? (
      <SkeletonLoader uniqueKey={`skeleton--${itemPath}`} animate={loading} width="100%" height="1em" {...p}>
        <rect width="40%" height="100%" />
      </SkeletonLoader>
    ) : (
      createElement(type, p)
    )

  const Wrapper = (p: any) =>
    !linkDisabled && link ? <Link href={link.url} {...link.attributes} {...p} /> : <Fragment {...p} />

  return (
    <Root id={id} className={className} style={style}>
      <Wrapper>{text}</Wrapper>
    </Root>
  )
}

MapTo<any>(resourceType)(TitleComponent, config)

export const AEMTitle = withMappable<any>(TitleComponent, config)
