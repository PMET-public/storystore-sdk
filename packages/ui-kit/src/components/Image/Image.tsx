import { FunctionComponent, ImgHTMLAttributes, ReactElement } from 'react'
import { merge } from '../../lib'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Render as HTML Element or React Component  */
  root?: ReactElement
}

export const Image: FunctionComponent<ImageProps> = ({ root = <img />, ...props }) => {
  return <root.type {...merge(props, root.props)} />
}
