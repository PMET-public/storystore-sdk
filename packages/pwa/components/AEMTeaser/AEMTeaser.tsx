// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'

// Import the base  component
import { Banner, Heading, Button, Link, Block, Text, Html } from '@storystore/ui-kit'

import { createElement } from 'react'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = `${site}/components/teaser`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
  emptyLabel: 'Teaser',
  isEmpty: (props: any) => !props,
  resourceType: RESOURCE_TYPE,
}

const Teaser = ({ id, titleType, title, pretitle, linkURL, actions, description, imagePath }) => {
  return (
    <Banner
      root={linkURL && !actions.length ? <Link href={linkURL} /> : undefined}
      id={id}
      height="600px"
      backgroundImage={<img src={imagePath} alt="" loading="lazy" />}
      heading={
        <Block gap="xs">
          {pretitle && (
            <Heading root={<div />} size="sm">
              {pretitle}
            </Heading>
          )}

          <Heading root={titleType && createElement(titleType)} size="md">
            {title}
          </Heading>

          <Text root={<Html htmlString={description} />} size="sm" />

          {actions && (
            <Block
              columns={{ sm: 'max-content', md: 'repeat(auto-fit, minmax(100px, 1fr))' }}
              align="center"
              gap="sm"
              contained
            >
              {actions.map(({ id, title, url }) => (
                <Button key={id} root={<Link href={url} />} variant="cta">
                  {title}
                </Button>
              ))}
            </Block>
          )}
        </Block>
      }
    />
  )
}

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo<any>(RESOURCE_TYPE)(Teaser, EditConfig)

// withMappable allows the component to be hardcoded into the SPA; <AEMTeaser .../>
export const AEMTeaser = withMappable(Teaser, EditConfig)
