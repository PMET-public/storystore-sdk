// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { ContentFragmentV1IsEmptyFn } from '@adobe/aem-core-components-react-spa'
import { Heading, Banner, Button } from '@storystore/ui-kit'
import { classes } from '@storystore/ui-kit/lib'

// Style
import style from './AEMContentFragmentAdventure.module.css'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/contentfragmentadventurebanner`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Content Fragment – Adventure Banner',
  isEmpty: ContentFragmentV1IsEmptyFn,
  resourceType: RESOURCE_TYPE,
}

const AEMContentFragmentAdventureBanner = ({ ...props }) => {
  const { appliedCssClassNames = '' } = props

  /** Screen Color */
  const screen = appliedCssClassNames.match(/contentfragmentadventure--screen-(light|dark)/)?.[1]

  /** Text Color  */
  const color = appliedCssClassNames.match(/contentfragmentadventure--color-(light|dark)/)?.[1] || 'dark'

  /** Alignment */
  const align = appliedCssClassNames.match(/contentfragmentadventure--align-(left|center|right)/)?.[1] || 'left'

  /** Vertical Alignment */
  const vAlign = appliedCssClassNames.match(/contentfragmentadventure--valign-(top|middle|bottom)/)?.[1] || 'bottom'

  const { id, elements } = props

  const imageSrc = elements?.adventurePrimaryImage?.value
  const title = elements?.adventureTitle?.value
  const length = elements?.adventureTripLength?.value
  const type = elements?.adventureType?.value

  return (
    <Banner
      id={id}
      screen={screen}
      height="600px"
      align={align}
      vAlign={vAlign}
      backgroundColor="var(--color-skeleton)"
      backgroundImage={<img src={imageSrc} alt={title} />}
      heading={
        <Heading root={<h2 />} size={{ sm: '2xl', lg: '4xl' }} style={{ color: color === 'light' ? '#fff' : '#222' }}>
          <Heading root={<span />} size={{ sm: 'md', lg: 'lg' }}>
            {length} {type}
          </Heading>
          {title}
        </Heading>
      }
      button={<Button>View Adventure</Button>}
    />
  )
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(AEMContentFragmentAdventureBanner, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMAEMContentFragmentAdventureBanner .../>
export const AEMAEMContentFragmentAdventureBanner = withMappable(AEMContentFragmentAdventureBanner, EditConfig)
