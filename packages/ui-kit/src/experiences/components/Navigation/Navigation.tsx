import { NavigationV1IsEmptyFn, NavigationV1Model } from '@adobe/aem-core-components-react-base'
import { MappedComponentProperties } from '@adobe/aem-react-editable-components'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Link, Block, SkeletonLoader } from '../../../../components'

type NavigationProps = HTMLAttributes<HTMLDivElement> &
  MappedComponentProperties &
  NavigationV1Model & {
    loading?: boolean
  }

export const NavigationIsEmptyFn = NavigationV1IsEmptyFn

export const Navigation: FunctionComponent<NavigationProps> = ({
  id,
  items,
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
      <Block root={<nav />} gap="sm" {...p} />
    )

  return (
    <Root id={id} className={className} style={style}>
      {items?.map(({ url, title }, key) => (
        <Link key={key} href={url}>
          {title}
        </Link>
      ))}
    </Root>
  )
}
