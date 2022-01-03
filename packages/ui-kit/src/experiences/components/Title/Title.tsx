import { TitleV2IsEmptyFn, TitleV2Model } from '@adobe/aem-core-components-react-base'
import { Fragment, createElement, FunctionComponent } from 'react'
import { Link, SkeletonLoader, Heading, HeadingProps } from '../../../../components'
import { MappedComponentProperties } from '@adobe/aem-react-editable-components'

type TitleProps = HeadingProps &
  MappedComponentProperties &
  TitleV2Model & {
    link?: { url: string; attributes: any }
    loading?: boolean
  }

export const TitleIsEmptyFn: any = TitleV2IsEmptyFn

export const Title: FunctionComponent<TitleProps> = ({
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
