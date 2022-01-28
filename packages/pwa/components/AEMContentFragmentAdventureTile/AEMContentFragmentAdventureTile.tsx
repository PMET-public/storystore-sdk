// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { ContentFragmentV1IsEmptyFn } from '@adobe/aem-core-components-react-spa'
import { Heading, Tile } from '@storystore/ui-kit'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/contentfragmentadventuretile`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Content Fragment – Adventure Tile',
  isEmpty: ContentFragmentV1IsEmptyFn,
  resourceType: RESOURCE_TYPE,
}

const AEMContentFragmentAdventureTile = ({ ...props }) => {
  const { id, elements } = props

  const imageSrc = elements?.adventurePrimaryImage?.value
  const title = elements?.adventureTitle?.value
  const activity = elements?.adventureActivity?.value
  const length = elements?.adventureTripLength?.value
  const type = elements?.adventureType?.value

  return (
    <Tile
      id={id}
      image={<img src={imageSrc} alt={title} width={500} height={500} />}
      heading={<Heading size="md">{title}</Heading>}
      subheading={`${length} ${type}`}
      tags={['#' + activity]}
    />
  )
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(AEMContentFragmentAdventureTile, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMAEMContentFragmentAdventureTile .../>
export const AEMAEMContentFragmentAdventureTile = withMappable(AEMContentFragmentAdventureTile, EditConfig)
