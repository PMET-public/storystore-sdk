import { FunctionComponent } from 'react'
import { MediaItem, Html } from '../../../../components'

export type AdventureContributorProps = {
  loading?: boolean
  fullName?: string
  biographyText?: { html: string }
  occupation?: string
  pictureReference?: {
    _path: string
  }
}

export const AdventureContributor: FunctionComponent<AdventureContributorProps> = ({
  loading,
  fullName,
  biographyText,
  occupation,
  pictureReference,
  ...props
}) => {
  // if (loading) return null

  return (
    <MediaItem
      image={pictureReference && <img src={pictureReference._path} alt={fullName} />}
      imageRounded={100}
      heading={fullName}
      subheading={occupation}
      description={<Html htmlString={biographyText?.html} />}
      {...props}
    />
  )
}
