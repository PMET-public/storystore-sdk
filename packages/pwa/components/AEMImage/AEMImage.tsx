import { withMappable } from '@adobe/aem-react-editable-components'

// Style
import style from './AEMImage.module.css'

const site = process.env.NEXT_PUBLIC_AEM_SITE

export const RESOURCE_TYPE = `${site}/components/image`

export const AEMImageConfig = {
  emptyLabel: 'Image',
  isEmpty: (props: any) => !props,
  resourceType: RESOURCE_TYPE,
}

const Image = ({ id, lazyEnabled, src, ...props }) => {
  return <img id={id} loading={lazyEnabled ? 'lazy' : 'eager'} src={src} className={style.root} />
}

export const AEMImage = withMappable(Image, AEMImageConfig)
