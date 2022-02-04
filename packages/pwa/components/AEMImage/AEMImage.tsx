// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo, MappedComponentProperties } from '@adobe/aem-react-editable-components'
import { Link } from '@storystore/ui-kit'

// Style
import style from './AEMImage.module.css'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/image`

type AEMImageProps = MappedComponentProperties & {
  id: string
  src: string
  alt: string
  title?: string
  link?: string
}

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
export const EditConfig = {
  emptyLabel: 'Image',
  isEmpty: ({ ...props }: AEMImageProps) => !props?.src,
  resourceType: RESOURCE_TYPE,
}

const Image = ({ id, src, alt, title, link }: AEMImageProps) => {
  const root = link ? <Link href={link} /> : <></>
  return (
    <root.type {...root.props}>
      <img id={id} src={src} alt={alt} title={title} loading="lazy" className={style.root} />
    </root.type>
  )
}

// withMappable allows the component to be hardcoded into the SPA; <AEMImage .../>
export const AEMImage = withMappable<AEMImageProps>(Image, EditConfig)

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(Image, EditConfig)
