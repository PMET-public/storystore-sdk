import Image, { ImageProps } from 'next/image'
import { FunctionComponent } from 'react'

const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const shimmer = (width: number | string, height: number | string) => {
  return `<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect width="${width}" height="${height}" fill="rgba(0, 0, 0, 0.2)" /> 
  </svg>`
}

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

export const NextImage: FunctionComponent<ImageProps> = props => {
  return (
    <Image
      key={props.src.toString()}
      loader={loader}
      alt=""
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(props.width, props.height))}`}
      {...props}
    />
  )
}
