import Image, { ImageProps } from 'next/image'
import { FunctionComponent } from 'react'

const loader = ({ src, width, quality }) => `${src}?w=${width}&q=${quality || 75}`

export const NextImage: FunctionComponent<ImageProps> = props => {
  return (
    <Image
      loader={loader}
      alt=""
      placeholder="blur"
      blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
      {...props}
    />
  )
}
