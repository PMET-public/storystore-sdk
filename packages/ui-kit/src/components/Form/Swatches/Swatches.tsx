import { FunctionComponent } from 'react'
import { SwatchesProps } from './Swatches.d'
import { classes, merge } from '../../../lib'

// Styles
import style from './Swatches.module.css'

export const Swatches: FunctionComponent<SwatchesProps> = ({
  root = <div />,
  variant = 'single',
  name,
  className,
  items,
  color = 'primary',
  ...props
}) => {
  const type = { multi: 'checkbox', single: 'radio' }

  return (
    <root.type
      {...props}
      {...merge(root.props, props)}
      className={classes([style.root, root.props.className, className])}
    >
      {items?.map(({ label, ...item }, key) => {
        return (
          <div
            className={style.item}
            key={key}
            style={{
              ['--bg-active' as string]: `var(--color-${color})`,
              ['--text-active' as string]: `var(--color-on-${color})`,
            }}
          >
            <input id={`__swatches_group-${name}-${key}`} name={name} type={type[variant]} {...item} />
            <label htmlFor={`__swatches_group-${name}-${key}`}>{label}</label>
          </div>
        )
      })}
    </root.type>
  )
}
