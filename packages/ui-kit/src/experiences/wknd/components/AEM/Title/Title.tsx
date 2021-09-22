import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { TitleV2IsEmptyFn } from '@adobe/aem-core-components-react-base'
import { Link } from '../../../../../components'
import { Fragment, createElement } from 'react'

const resourceType = 'wknd-adventures/components/title'

const config = {
  isEmpty: TitleV2IsEmptyFn,
  resourceType,
}

const TitleComponent = ({ id, linkDisabled, link, text, type = 'h1', className, style }) => {
  const root = createElement(type, { id, className, style })

  const Wrapper = (p: any) =>
    !linkDisabled && link ? <Link href={link.url} {...link.attributes} {...p} /> : <Fragment {...p} />

  return (
    <root.type {...root.props}>
      <Wrapper>{text}</Wrapper>
    </root.type>
  )
}

MapTo<any>(resourceType)(TitleComponent, config)

export const AEMTitle = withMappable<any>(TitleComponent, config)
