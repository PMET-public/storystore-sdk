import { FunctionComponent } from 'react'
import { FieldProps, LabelProps, ErrorProps } from './Field.d'
import { classes } from '../../../lib'

// Styles
import style from './Field.module.css'

export const Field: FunctionComponent<FieldProps> = ({ root = <div />, ...props }) => {
  return <root.type {...props} {...root.props} className={classes([style.root, root.props.className])} />
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

export const Error: FunctionComponent<ErrorProps> = ({ root = <div />, ...props }) => {
  return <root.type {...props} {...root.props} className={classes([style.error, root.props.className])} />
}
