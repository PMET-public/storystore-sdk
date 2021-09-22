import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { ButtonV1IsEmptyFn } from '@adobe/aem-core-components-react-base'
import { Button, Link } from '../../../../../components'

const resourceType = 'wknd-adventures/components/button'

const config = {
  isEmpty: ButtonV1IsEmptyFn,
  resourceType,
}

const ButtonComponent = ({ id, link, icon, text, accessibilityLabel, className, style }) => {
  if (icon) console.warn('Button Icon attribute is not supported')

  return (
    <Button
      id={id}
      root={link ? <Link href={link} /> : <button />}
      aria-label={accessibilityLabel}
      className={className}
      style={style}
    >
      {text}
    </Button>
  )
}

MapTo<any>(resourceType)(ButtonComponent, config)

export const AEMButton = withMappable<any>(ButtonComponent, config)
