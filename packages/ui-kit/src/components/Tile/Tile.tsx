import { FunctionComponent, isValidElement, HTMLAttributes, ReactElement } from 'react'
import { classes, merge } from '../../lib'
import { SkeletonLoader } from '../'

// Styles
import style from './Tile.module.css'

export type TileProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  image: ReactElement
  heading: ReactElement | string
  subheading?: ReactElement | string
  tags?: Array<ReactElement | string>
  surface?: boolean
  vignette?: boolean
}

export const Tile: FunctionComponent<TileProps> = ({
  root = <div />,
  className,
  heading,
  image = <img />,
  subheading,
  tags,
  surface,
  vignette,
  ...props
}) => {
  return (
    <root.type {...merge(props, root.props)} className={classes([style.root, [style.surface, surface], className])}>
      <div className={style.wrapper}>
        <div className={classes([style.image, [style.vignette, vignette]])}>
          <image.type {...image.props} className={classes([image.props.className, style.img])} />
        </div>

        <div className={style.content}>
          {isValidElement(heading) ? (
            <heading.type {...merge(heading.props, { className: style.heading })} />
          ) : (
            <span className={style.heading}>{heading}</span>
          )}

          {subheading &&
            (isValidElement(subheading) ? (
              <subheading.type {...merge(subheading.props, { className: style.subheading })} />
            ) : (
              <span className={style.subheading}>{subheading}</span>
            ))}

          {tags && (
            <div className={style.tags}>
              {tags?.map((tag, key) =>
                isValidElement(tag) ? (
                  <tag.type key={key} {...merge(tag.props, { className: style.tag })} />
                ) : (
                  <span key={key} className={style.tag}>
                    {tag}
                  </span>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </root.type>
  )
}

// Loader Skeleton
export type TileSkeletonProps = HTMLAttributes<HTMLElement> & {
  surface?: boolean
  uniqueKey?: string
  animate?: boolean
  imageHeight?: number | string
  imageWidth?: number | string
}

export const TileSkeleton: FunctionComponent<TileSkeletonProps> = ({
  uniqueKey,
  animate,
  imageHeight = 400,
  imageWidth = '100%',
  ...props
}) => {
  return (
    <Tile
      image={
        <SkeletonLoader
          uniqueKey={uniqueKey && `${uniqueKey}--image`}
          animate={animate}
          width={imageWidth}
          height={imageHeight}
          style={{ width: '100%', height: 'auto' }}
        >
          <rect width="100%" height="100%" />
        </SkeletonLoader>
      }
      heading={
        <SkeletonLoader uniqueKey={uniqueKey && `${uniqueKey}--heading`} width="70%" height="1em" animate={animate}>
          <rect width="100%" height="100%" />
        </SkeletonLoader>
      }
      tags={[
        <SkeletonLoader uniqueKey={uniqueKey && `${uniqueKey}--tags`} width="30%" height="1em" animate={animate}>
          <rect width="100%" height="100%" />
        </SkeletonLoader>,
      ]}
      {...props}
    />
  )
}
