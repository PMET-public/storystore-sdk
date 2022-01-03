import { TextV2IsEmptyFn, TextV2Model } from '@adobe/aem-core-components-react-base'
import { SkeletonLoader, Html, HtmlProps } from '../../../components'
import { MappedComponentProperties } from '@adobe/aem-react-editable-components'
import { FunctionComponent } from 'react'

type TextProps = HtmlProps &
  TextV2Model &
  MappedComponentProperties & {
    loading?: boolean
  }

export const TextIsEmptyFn = TextV2IsEmptyFn

export const Text: FunctionComponent<TextProps> = ({
  id,
  text,
  richText,
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
    ) : richText ? (
      <Html htmlString={text} {...p} />
    ) : (
      <div {...p}>{text}</div>
    )

  return <Root id={id} className={className} style={style} />
}
