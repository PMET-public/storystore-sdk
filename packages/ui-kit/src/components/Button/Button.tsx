import { FunctionComponent, isValidElement } from 'react'
import { ButtonProps } from './Button.d'
import { classes, merge } from '../../lib'

// Styles
import style from './Button.module.css'

export const Button: FunctionComponent<ButtonProps> = ({
  root = <button />,
  variant = 'primary',
  transparent = false,
  children,
  className,
  icon,
  size = 'md',
  ...props
}) => {
  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, style[variant], [style.transparent, transparent], className])}
      style={{ ['--size' as string]: `var(--font-${size})`, ...root.props.style, ...props.style }}
    >
      {isValidElement(icon) && <icon.type {...icon.props} className={classes([style.icon, icon.props.className])} />}
      {children}
    </root.type>
  )
}
