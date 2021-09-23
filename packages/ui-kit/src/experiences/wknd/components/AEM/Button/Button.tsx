import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { ButtonV1IsEmptyFn } from '@adobe/aem-core-components-react-base'
import { Button, ButtonSkeleton, Link } from '../../../../../components'

const resourceType = 'wknd-adventures/components/button'

const config = {
  isEmpty: ButtonV1IsEmptyFn,
  resourceType,
}

const ButtonComponent = ({
  componentProperties,
  className,
  style,
  itemPath,
  cqPath,
  loading = !cqPath,
  cqType,
  loaded = !!cqType,
}) => {
  const { id, link, icon, text, accessibilityLabel } = componentProperties

  if (icon) console.warn('Button Icon attribute is not supported')

  const Root = (p: any) =>
    loading || !loaded ? (
      <ButtonSkeleton key={`skeleton--${itemPath}`} animate={loading} {...p} />
    ) : (
      <Button root={link ? <Link href={link} /> : <button />} {...p} />
    )

  return (
    <Root id={id} aria-label={accessibilityLabel} className={className} style={style}>
      {text}
    </Root>
  )
}

MapTo<any>(resourceType)(ButtonComponent, config)

export const AEMButton = withMappable<any>(ButtonComponent, config)
