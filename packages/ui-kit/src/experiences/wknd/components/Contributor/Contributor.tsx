import { FunctionComponent } from 'react'
import { MediaItem, Html } from '../../../../components'

export type ContributorProps = {
  loading?: boolean
  fullName?: string
  biographyText?: { html: string }
  occupation?: string
  pictureReference?: {
    _path: string
  }
}

export const Contributor: FunctionComponent<ContributorProps> = ({
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
