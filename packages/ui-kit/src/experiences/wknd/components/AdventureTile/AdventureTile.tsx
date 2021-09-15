import { FunctionComponent } from 'react'
import { Tile, TileSkeleton, Heading, Link } from '../../../../components'

export type AdventureTileProps = {
  _path?: string
  loading?: boolean
  adventureActivity?: string
  adventureTitle?: string
  adventureTripLength?: string
  adventurePrimaryImage?: {
    _path: string
  }
}

export const AdventureTile: FunctionComponent<AdventureTileProps> = ({
  _path,
  loading,
  adventureActivity,
  adventureTitle,
  adventureTripLength,
  adventurePrimaryImage,
  ...props
}) => {
  if (loading) return <TileSkeleton {...props} />

  return (
    <Tile
      root={<Link href={_path} />}
      heading={<Heading root={<h3 />}>{adventureTitle}</Heading>}
      image={<img loading="lazy" src={adventurePrimaryImage?._path} width={400} height={400} alt={adventureTitle} />}
      tags={[`${adventureTripLength} ${adventureActivity}`]}
      surface
      {...props}
    />
  )
}
