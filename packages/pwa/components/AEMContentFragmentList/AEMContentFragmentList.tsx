// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'

// Import the base  component
import { Carousel, Tile, TileSkeleton, Heading } from '@storystore/ui-kit'
import NextImage from '../NextImage'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/contentfragmentlist`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Content Fragment List – Adventures',
  isEmpty: (props: any) => !!props?.items && props.items.length < 1,
  resourceType: RESOURCE_TYPE,
}

const ContentFragmentList = ({ ...props }) => {
  const { id, configTitleKey, configSubtitleKey, configImageKey, items } = props

  return (
    <Carousel id={id} show={{ sm: 1, md: 2, lg: 3 }} gap="md" peak hideScrollBar>
      {EditConfig.isEmpty(props)
        ? [<TileSkeleton key={0} />, <TileSkeleton key={1} />, <TileSkeleton key={2} />, <TileSkeleton key={3} />]
        : items?.map(({ elements }, key) => {
            const imageSrc = elements?.[configImageKey]
            const title = elements?.[configTitleKey]
            const subtitle = elements?.[configSubtitleKey]

            return (
              <Tile
                key={key}
                image={<NextImage src={imageSrc} alt={title} width={500} height={500} />}
                heading={<Heading size="md">{title}</Heading>}
                subheading={subtitle}
              />
            )
          })}
    </Carousel>
  )
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(ContentFragmentList, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMCarousel .../>
export const AEMContentFragmentList = withMappable(ContentFragmentList, EditConfig)
