import { FunctionComponent, HTMLAttributes, ReactElement, isValidElement } from 'react'
import { classes, merge } from '../../lib'

// Styles
import style from './MediaItem.module.css'

export type MediaItemProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  image: ReactElement
  imageRounded?: number
  heading: ReactElement | string
  subheading: ReactElement | string
  description: ReactElement | string
}

export const MediaItem: FunctionComponent<MediaItemProps> = ({
  root = <div />,
  image = <img />,
  imageRounded = 0,
  heading,
  subheading,
  description,
  className,
  ...props
}) => {
  return (
    <root.type {...merge(props, root.props)} className={classes([style.root, root.props.className, className])}>
      <image.type
        width={340}
        height={340}
        {...image.props}
        className={classes([style.image, image.props.className])}
        style={{ ['--radius']: imageRounded + '%', ...image.props.style }}
      />

      {isValidElement(heading) ? (
        <heading.type {...heading.props} className={classes([style.heading, heading.props.className])} />
      ) : (
        <div className={style.heading}>{heading}</div>
      )}

      {isValidElement(subheading) ? (
        <subheading.type {...subheading.props} className={classes([style.subheading, subheading.props.className])} />
      ) : (
        <div className={style.subheading}>{subheading}</div>
      )}

      {isValidElement(description) ? (
        <description.type
          {...description.props}
          className={classes([style.description, description.props.className])}
        />
      ) : (
        <div className={style.description}>{description}</div>
      )}
    </root.type>
  )
}
