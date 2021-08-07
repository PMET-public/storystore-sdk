import { FunctionComponent, HTMLAttributes, ReactElement, isValidElement } from 'react'
import { classes, merge } from '../../lib'
import style from './Tile.module.css'

type TileProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  image: ReactElement
  heading: ReactElement | string
  subheading?: ReactElement | string
  tags?: Array<ReactElement | string>
  surface?: boolean
}

export const Tile: FunctionComponent<TileProps> = ({
  root = <div />,
  className,
  heading,
  image = <img />,
  subheading,
  tags,
  surface,
  ...props
}) => {
  return (
    <root.type {...merge(props, root.props)} className={classes([style.root, [style.surface, surface], className])}>
      <div className={style.wrapper}>
        <image.type {...merge(image.props, { className: style.image })} />

        <div className={style.content}>
          {isValidElement(heading) ? (
            <heading.type {...merge(heading.props, { className: style.heading })} />
          ) : (
            <span className={style.heading}>{heading}</span>
          )}

          {isValidElement(subheading) ? (
            <subheading.type {...merge(subheading.props, { className: style.subheading })} />
          ) : (
            <span className={style.subheading}>{subheading}</span>
          )}

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
