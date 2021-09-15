import { FunctionComponent } from 'react'
import { Banner, BannerSkeleton, Heading, Button, Link } from '../../../../components'

export type AdventureBannerProps = {
  _path?: string
  adventureTitle?: string
  adventureTripLength?: string
  adventureType?: string
  loading?: boolean
  adventurePrimaryImage?: {
    _path: string
    width: string | number
    height: string | number
  }
}

export const AdventureBanner: FunctionComponent<AdventureBannerProps> = ({
  _path,
  adventurePrimaryImage,
  adventureTitle,
  adventureTripLength,
  adventureType,
  loading,
  ...props
}) => {
  if (loading) return <BannerSkeleton {...props} />

  return (
    <Banner
      height={{ sm: '70vh', lg: '600px' }}
      align="left"
      vAlign="bottom"
      screen="dark"
      textColor="white"
      backgroundImage={
        <img
          src={adventurePrimaryImage?._path}
          width={adventurePrimaryImage?.width}
          height={adventurePrimaryImage?.height}
          alt={adventureTitle}
        />
      }
      heading={
        <Heading root={<h2 />} size={{ sm: '2xl', lg: '4xl' }}>
          <Heading root={<span />} size={{ sm: 'xl', lg: '2xl' }}>
            {adventureTripLength} {adventureType}
          </Heading>
          {adventureTitle}
        </Heading>
      }
      button={
        <Button root={<Link href={_path} />} variant="cta">
          View Adventure
        </Button>
      }
      {...props}
    />
  )
}
