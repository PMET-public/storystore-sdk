import { withMappable } from '@adobe/aem-react-editable-components'
import { Banner, Heading, Button, Link, Block } from '@storystore/ui-kit'
import { createElement } from 'react'

const site = process.env.NEXT_PUBLIC_AEM_SITE

export const RESOURCE_TYPE = `${site}/components/teaser`

export const AEMTeaserConfig = {
  emptyLabel: 'Teaser',
  isEmpty: (props: any) => !props,
  resourceType: RESOURCE_TYPE,
}

const Teaser = ({ titleType, title, pretitle, linkURL, actionsEnabled, actions, ...props }) => {
  console.log('Teaser', props)
  return (
    <Banner
      root={linkURL && !actionsEnabled ? <Link href={linkURL} /> : undefined}
      //   backgroundImage={<img src={MISSING} />}
      heading={
        <>
          {pretitle && (
            <Heading root={<div />} size={{ sm: 'md', lg: 'lg' }}>
              {pretitle}
            </Heading>
          )}

          <Heading root={titleType && createElement(titleType)} size={{ sm: '2xl', lg: '5xl' }}>
            {title}
          </Heading>
        </>
      }
      button={
        actions && (
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
        )
      }
    />
  )
}

export const AEMTeaser = withMappable(Teaser, AEMTeaserConfig)
