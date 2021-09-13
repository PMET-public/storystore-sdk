import { FunctionComponent, forwardRef } from 'react'
import { InputProps } from './Input.d'
import { classes } from '../../../lib'

// Styles
import style from './Input.module.css'

export const Input: FunctionComponent<InputProps> = forwardRef(
  ({ root = <input type="text" />, error, ...props }, ref) => {
    return <root.type className={classes([style.root, [style.error, error], props.className])} {...props} ref={ref} />
  }
)
