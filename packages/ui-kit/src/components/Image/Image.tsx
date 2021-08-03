import { FunctionComponent, ImgHTMLAttributes, ReactElement, createContext, useContext } from 'react'
import { merge } from '../../lib'

const ImageContext = createContext(<img />)

export const ImageProvider = ImageContext.Provider

export const useImage = () => useContext(ImageContext)

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Render as HTML Element or React Component  */
  root?: ReactElement
}

export const Image: FunctionComponent<ImageProps> = ({ ...props }) => {
  const root = useImage()

  return <root.type {...merge(props, root.props)} />
}
