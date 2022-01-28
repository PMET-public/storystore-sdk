// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'

// Style
import style from './AEMImage.module.css'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/image`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
export const EditConfig = {
  emptyLabel: 'Image',
  isEmpty: (props: any) => !props,
  resourceType: RESOURCE_TYPE,
}

const Image = ({ id, lazyEnabled, src }) => {
  return <img id={id} loading={lazyEnabled ? 'lazy' : 'eager'} src={src} className={style.root} />
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo<any>(RESOURCE_TYPE)(Image, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMImage .../>
export const AEMImage = withMappable(Image, EditConfig)
