import { withMappable, Container } from '@adobe/aem-react-editable-components'
import { Carousel as CarouselRoot } from '@storystore/ui-kit'
import { CarouselV1 } from '@adobe/aem-core-components-react-spa'

const site = process.env.NEXT_PUBLIC_AEM_SITE

export const RESOURCE_TYPE = `${site}/components/carousel`

export const AEMCarouselConfig = {
  emptyLabel: 'Carousel',
  isEmpty: (props: any) => !props?.cqItemsOrder?.length,
  resourceType: RESOURCE_TYPE,
}

const Carousel = ({ id, cqItemsOrder, cqItems, ...props }) => {
  console.log('Carousel', props)
  return (
    <CarouselRoot id={id} show={{ sm: 1, lg: 3 }} gap="sm" padded>
      {cqItemsOrder?.map((key: string) => (
        <Container key={key} {...cqItems[key]} />
      ))}
    </CarouselRoot>
  )
}

export const AEMCarousel = withMappable(CarouselV1, AEMCarouselConfig)
