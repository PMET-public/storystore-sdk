import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { TitleV2IsEmptyFn } from '@adobe/aem-core-components-react-base'
import { Fragment, createElement } from 'react'
import ContentLoader from 'react-content-loader'
import { Link } from '../../../../../components'

const resourceType = 'wknd-adventures/components/title'

const config = {
  isEmpty: TitleV2IsEmptyFn,
  resourceType,
}

const TitleComponent = ({
  id,
  linkDisabled,
  link,
  text,
  type = 'h1',
  className,
  style,
  dataLayer,
  loading = !dataLayer,
  itemPath,
}) => {
  const Root = (p: any) =>
    loading ? (
      <ContentLoader uniqueKey={`skeleton--${itemPath}`} width="100%" height="1em" {...p}>
        <rect width="100%" height="100%" />
      </ContentLoader>
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
