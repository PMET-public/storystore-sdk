import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { classes, merge } from '../../lib'

// Styles
import style from './Card.module.css'

export type CardProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  shadow?: boolean
}

export const Card: FunctionComponent<CardProps> = ({ root = <div />, shadow, className, ...props }) => {
  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, [style.shadow, shadow], root.props.className, className])}
    />
  )
}
