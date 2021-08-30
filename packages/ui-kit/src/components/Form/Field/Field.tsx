import { FunctionComponent, HTMLAttributes, LabelHTMLAttributes, ReactElement, isValidElement } from 'react'
import { classes } from '../../../lib'
import style from './Field.module.css'

export type FieldProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
}

export const Field: FunctionComponent<FieldProps> = ({ root = <div />, ...props }) => {
  return <root.type {...props} {...root.props} className={classes([style.root, root.props.className])} />
}

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  root?: ReactElement
  error?: boolean
}

export const Label: FunctionComponent<LabelProps> = ({ root = <label />, error, ...props }) => {
  return (
    <root.type
      {...props}
      {...root.props}
      className={classes([style.label, [style.error, error], root.props.className])}
    />
  )
}

export type ErrorProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
}

export const Error: FunctionComponent<ErrorProps> = ({ root = <div />, ...props }) => {
  return <root.type {...props} {...root.props} className={classes([style.error, root.props.className])} />
}
