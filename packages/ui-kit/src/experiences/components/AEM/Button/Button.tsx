import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { ButtonV1IsEmptyFn } from '@adobe/aem-core-components-react-base'
import { Button, ButtonSkeleton, Link } from '../../../../components'

const resourceType = 'storystore/components/button'

const config = {
  isEmpty: ButtonV1IsEmptyFn,
  resourceType,
}

const ButtonComponent = ({ componentProperties, className, style, itemPath, cqPath, loading = !cqPath }) => {
  const { id, link, icon, text = 'Button', size, variant, transparent, accessibilityLabel } = componentProperties

  const Root = (p: any) =>
    loading ? (
      <ButtonSkeleton key={`skeleton--${itemPath}`} animate={loading} {...p} />
    ) : (
      <Button root={link ? <Link href={link} /> : <button />} icon={icon} {...p} />
    )

  return (
    <Root
      id={id}
      aria-label={accessibilityLabel}
      size={size}
      variant={variant}
      transparent={transparent}
      className={className}
      style={style}
    >
      {text}
    </Root>
  )
}

MapTo<any>(resourceType)(ButtonComponent, config)

export const AEMButton = withMappable<any>(ButtonComponent, config)
