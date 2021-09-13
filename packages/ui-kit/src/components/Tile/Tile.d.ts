import { HTMLAttributes, ReactElement } from 'react'

export type TileProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  image: ReactElement
  heading: ReactElement | string
  subheading?: ReactElement | string
  tags?: Array<ReactElement | string>
  surface?: boolean
}

export type TileSkeletonProps = HTMLAttributes<HTMLElement> & {
  surface?: boolean
  uniqueKey?: string
  animate?: boolean
}
