import { FunctionComponent, ComponentType, ImgHTMLAttributes, forwardRef } from 'react'
import classes from '../../lib/class-names'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Render as HTML Element or React Component  */
  as?: keyof JSX.IntrinsicElements | ComponentType<any>
  /** CSS Classes */
  className?: string
}

export const Image: FunctionComponent<ImageProps> = forwardRef(
  ({ as: Root = 'img', className = '', ...props }, ref) => {
    const classNames = className.split(' ')
    return <Root {...props} ref={ref} className={classes([...classNames])} />
  }
)
