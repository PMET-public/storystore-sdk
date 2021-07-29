import { FunctionComponent, forwardRef } from 'react'
import classes from '../../lib/class-names'
import style from './View.module.css'

export type ViewProps = {
  /** Render as HTML Element or React Component  */
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  /** Contains centered layout */
  contained?: boolean
  /** Add side padding */
  padded?: boolean
  /** CSS Classes */
  className?: string
}

export const View: FunctionComponent<ViewProps> = forwardRef(
  ({ as: Root = 'div', className = '', contained = false, padded = false, ...props }, ref) => {
    const classNames = className.split(' ')
    return (
      <Root
        className={classes([[style.contained, contained], [style.padded, padded], ...classNames])}
        {...props}
        ref={ref}
      />
    )
  }
)
