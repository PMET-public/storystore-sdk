import { TitleV2IsEmptyFn, TitleV2Model } from '@adobe/aem-core-components-react-base'
import { Fragment, createElement, FunctionComponent } from 'react'
import { Link, SkeletonLoader, Heading, HeadingProps } from '../../../components'
import { MappedComponentProperties, MapTo, withMappable } from '@adobe/aem-react-editable-components'

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = 'storystore/components/title'

const EditConfig = {
  emptyLabel: 'Title', // The component placeholder in AEM SPA Editor
  isEmpty: props => TitleV2IsEmptyFn(props), // The function to determine if this component has been authored
  resourceType: RESOURCE_TYPE, // The sling:resourceType this SPA component is mapped to
}

type TitleProps = HeadingProps &
  MappedComponentProperties &
  TitleV2Model & {
    link?: { url: string; attributes: any }
    loading?: boolean
  }

export const TitleRoot: FunctionComponent<TitleProps> = ({
  id,
  linkDisabled,
  link,
  text,
  type = 'h1',
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
      <Heading size="2xl" root={createElement(type)} {...p} />
    )

  const Wrapper = (p: any) =>
    !linkDisabled && link ? <Link href={link.url} {...link.attributes} {...p} /> : <Fragment {...p} />

  return (
    <Root id={id} className={className} style={style}>
      <Wrapper>{text}</Wrapper>
    </Root>
  )
}

MapTo(RESOURCE_TYPE)(TitleRoot, EditConfig)

export const Title = withMappable(TitleRoot, EditConfig)
