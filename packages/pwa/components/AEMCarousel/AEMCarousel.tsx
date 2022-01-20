import { withMappable } from '@adobe/aem-react-editable-components'
import { CarouselV1 } from '@adobe/aem-core-components-react-spa'

const site = process.env.NEXT_PUBLIC_AEM_SITE

export const RESOURCE_TYPE = `${site}/components/carousel`

export const AEMCarouselConfig = {
  emptyLabel: 'Carousel',
  isEmpty: (props: any) => !props?.cqItemsOrder?.length,
  resourceType: RESOURCE_TYPE,
}

export const AEMCarousel = withMappable(CarouselV1, AEMCarouselConfig)
