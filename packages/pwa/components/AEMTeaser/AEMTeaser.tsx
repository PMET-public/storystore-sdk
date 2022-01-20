import { withMappable } from '@adobe/aem-react-editable-components'
import { Tile, Heading, Button, Link, Block, Text, Html } from '@storystore/ui-kit'
import { createElement } from 'react'

// Styles
import style from './AEMTeaser.module.css'

const site = process.env.NEXT_PUBLIC_AEM_SITE

export const RESOURCE_TYPE = `${site}/components/teaser`

export const AEMTeaserConfig = {
  emptyLabel: 'Teaser',
  isEmpty: (props: any) => !props,
  resourceType: RESOURCE_TYPE,
}

const Teaser = ({ id, titleType, title, pretitle, linkURL, actionsEnabled, actions, description, imagePath }) => {
  return (
    <Tile
      root={linkURL && !actionsEnabled ? <Link href={linkURL} /> : undefined}
      id={id}
      image={<img src={imagePath} alt="" loading="lazy" className={style.image} />}
      className={style.root}
      heading={
        <Block gap="xs" padded>
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

export const AEMTeaser = withMappable(Teaser, AEMTeaserConfig)
