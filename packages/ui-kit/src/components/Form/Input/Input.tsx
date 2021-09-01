import { FunctionComponent, InputHTMLAttributes, ReactElement, forwardRef } from 'react'
import { classes, merge } from '../../../lib'
import style from './Input.module.css'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  root?: ReactElement
  error?: boolean
}

export const Input: FunctionComponent<InputProps> = forwardRef(
  ({ root = <input type="text" />, error, ...props }, ref) => {
    return <root.type className={classes([style.root, [style.error, error], props.className])} {...props} ref={ref} />
  }
)
