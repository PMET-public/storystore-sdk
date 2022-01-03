import { ButtonV1IsEmptyFn, ButtonV1Model } from '@adobe/aem-core-components-react-base'
import { MappedComponentProperties } from '@adobe/aem-react-editable-components'
import { FunctionComponent } from 'react'
import {
  Button as ButtonComponent,
  ButtonSkeleton,
  Link,
  ButtonProps as ButtonComponentProps,
} from '../../../../components'

type ButtonProps = ButtonComponentProps &
  MappedComponentProperties &
  ButtonV1Model & {
    accessibilityLabel?: string
    loading?: boolean
  }

export const ButtonIsEmptyFn = ButtonV1IsEmptyFn

export const Button: FunctionComponent<ButtonProps> = ({
  id,
  link,
  icon,
  text = 'Button',
  size,
  variant,
  transparent,
  accessibilityLabel,
  className,
  style,
  cqPath,
  loading = !cqPath,
}) => {
  console.log('Button')
  if (icon) console.warn('Button Icon attribute is not supported')

  const Root = (p: any) =>
    loading ? (
      <ButtonSkeleton key={`skeleton--${cqPath}`} animate={loading} {...p} />
    ) : (
      <ButtonComponent root={link ? <Link href={link} /> : <button />} {...p} />
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
