import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, merge } from '../../lib'

// Style
import style from './Price.module.css'

export type PriceProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  currency?: string
  label?: string
  regular: number
  special?: number
}

export const Price: FunctionComponent<PriceProps> = ({
  root = <div />,
  className,
  label,
  currency = 'USD',
  special,
  regular,
  ...props
}) => {
  return (
    <root.type {...merge(props, root.props)} className={classes([style.root, className])}>
      {label && <span className={style.label}>{label}</span>}

      <span className={classes([style.price, [style.special, !!special]])}>
        {regular.toLocaleString('en-US', { style: 'currency', currency })}
      </span>

      {!!special && <span>{special.toLocaleString('en-US', { style: 'currency', currency })}</span>}
    </root.type>
  )
}
