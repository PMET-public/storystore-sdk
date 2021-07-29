import { FunctionComponent } from 'react'
import style from './Tile.module.css'
import Image, { ImageProps } from '../Image'

type TileProps = {
  image: ImageProps
}

export const Tile: FunctionComponent<TileProps> = ({ image, ...props }) => {
  return (
    <article className={style.root} {...props}>
      <Image {...image} />
    </article>
  )
}
