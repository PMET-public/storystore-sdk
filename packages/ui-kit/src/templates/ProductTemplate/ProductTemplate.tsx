import { FunctionComponent, HTMLAttributes, ReactElement, isValidElement } from 'react'
import { Block, Carousel } from '../../components'
import { classes } from '../../lib'

import style from './ProductTemplate.module.css'

export type ProductTemplateProps = HTMLAttributes<HTMLDivElement> & {
  media: Array<ReactElement<HTMLAttributes<HTMLImageElement>>>
}

export const ProductTemplate: FunctionComponent<ProductTemplateProps> = ({ media, className, children, ...props }) => {
  console.log(media)
  return (
    <Block
      {...props}
      className={classes([style.root, className])}
      columns={{ sm: '1fr', md: '1fr 1fr', xl: '1.5fr 1fr' }}
      rows={{ sm: 'auto 1fr', md: '1fr' }}
      contained
    >
      {/* Media (Mobile) */}
      <div className={style.mediaWrapperMobile}>
        <Carousel show={1} gap="xs" peak hideScrollBar>
          {media?.map((mediaItem, key) =>
            isValidElement(mediaItem) ? (
              <mediaItem.type
                key={key}
                {...mediaItem.props}
                className={classes([style.image, mediaItem.props.className])}
              />
            ) : null
          )}
        </Carousel>
      </div>

      {/* Media (Tablet & Above) */}
      <div className={style.mediaWrapper}>
        <div className={style.media}>
          {media?.map((mediaItem, key) =>
            isValidElement(mediaItem) ? (
              <mediaItem.type
                key={key}
                {...mediaItem.props}
                className={classes([style.image, mediaItem.props.className])}
              />
            ) : null
          )}
        </div>
      </div>

      {/* Content */}
      <div>
        <div className={style.wrapperContent}>
          <Block gap="lg" className={style.content}>
            {children}
          </Block>
        </div>
      </div>
    </Block>
  )
}
