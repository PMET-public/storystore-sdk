// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { TeaserV1IsEmptyFn, TeaserV1Model } from '@adobe/aem-core-components-react-base'
import { withMappable, MapTo, MappedComponentProperties } from '@adobe/aem-react-editable-components'

// Import the base  component
import { Banner, Heading, Button, Link, Block, Text, Html } from '@storystore/ui-kit'

import { createElement } from 'react'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/teaser`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Teaser',
  isEmpty: TeaserV1IsEmptyFn,
  resourceType: RESOURCE_TYPE,
}

const Teaser = ({ ...props }) => {
  const { id, appliedCssClassNames = '', titleType, title, pretitle, linkURL, actions, description, imagePath } = props

  /** Screen Color */
  const variant = appliedCssClassNames.match(/teaser--variant-(hero)/)?.[1]
  const hero = variant === 'hero'

  /** Screen Color */
  const screen = appliedCssClassNames.match(/teaser--screen-(light|dark)/)?.[1]

  /** Text Color  */
  const _color = appliedCssClassNames.match(/teaser--color-(light|dark)/)?.[1] || 'dark'
  const color = _color === 'light' ? '#fff' : '#222'

  /** Alignment */
  const align = appliedCssClassNames.match(/teaser--align-(left|center|right)/)?.[1] || 'center'

  /** Vertical Alignment */
  const vAlign = appliedCssClassNames.match(/teaser--valign-(top|middle|bottom)/)?.[1] || 'middle'

  // Contained
  const contained = !!appliedCssClassNames.match(/teaser--contained/)

  return (
    <Banner
      root={linkURL && !actions.length ? <Link href={linkURL} /> : undefined}
      id={id}
      screen={screen}
      align={align}
      vAlign={vAlign}
      backgroundColor="var(--color-skeleton)"
      variant={variant}
      height={hero ? 'calc(var(--app-body-height) - 200px)' : undefined}
      style={{ minHeight: hero ? 400 : 260 }}
      backgroundImage={<img src={imagePath} alt="" loading="lazy" />}
      contained={contained}
      heading={
        <Block gap="xs" style={{ color }}>
          {pretitle && (
            <Heading root={<div />} size="sm">
              {pretitle}
            </Heading>
          )}

          <Heading
            root={titleType && createElement(titleType)}
            size={hero ? '5xl' : { sm: '4xl', md: '5xl' }}
            style={
              hero
                ? {
                    ['--heading-size-sm' as string]: 'calc(100vw / 15)',
                    ['--heading-size-md' as string]: 'calc(100vw / 27)',
                    ['--heading-size-lg' as string]: 'calc(100vw / 25)',
                  }
                : undefined
            }
          >
            {title}
          </Heading>

          {description && <Text root={<Html htmlString={description} />} size="sm" />}
        </Block>
      }
      button={
        <Block gap="sm" style={{ color }}>
          {actions.map(({ title, url }, key) => (
            <div key={key}>
              <Button
                root={<Link href={url} />}
                variant="cta"
                transparent
                style={{ ['--button-text' as string]: 'inherit' }}
              >
                {title}
              </Button>
            </div>
          ))}
        </Block>
      }
    />
  )
}

// withMappable allows the component to be hardcoded into the SPA; <AEMTeaser .../>
export const AEMTeaser = withMappable<any>(Teaser, EditConfig)

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo<MappedComponentProperties & TeaserV1Model>(RESOURCE_TYPE)(Teaser, EditConfig)
