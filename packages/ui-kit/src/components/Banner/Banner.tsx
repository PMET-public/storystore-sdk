import { FunctionComponent, ReactElement, ImgHTMLAttributes, HTMLAttributes } from 'react'
import { classes, merge, BreakpointValues, getBreakpointValues } from '../../lib'
import { Block, ButtonProps } from '../'
import ContentLoader from 'react-content-loader'

// Styles
import style from './Banner.module.css'

export type BannerProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  backgroundImage?: ReactElement<ImgHTMLAttributes<HTMLImageElement>>
  backgroundColor?: string
  textColor?: string
  align?: 'left' | 'right' | 'center'
  vAlign?: 'top' | 'bottom' | 'middle'
  heading?: ReactElement<ButtonProps>
  button?: ReactElement<ButtonProps>
  contained?: boolean
  width?: BreakpointValues<string>
  height?: BreakpointValues<string>
  screen?: 'dark' | 'darker' | 'light' | 'lighter'
  loading?: boolean
}

export const Banner: FunctionComponent<BannerProps> = ({
  root = <div />,
  align = 'center',
  vAlign = 'middle',
  backgroundColor,
  loading,
  backgroundImage: _backgroundImage,
  button,
  children,
  className,
  contained = false,
  heading,
  height: _height = '400px',
  textColor,
  width: _width = '100%',
  screen,
  ...props
}) => {
  const height = getBreakpointValues(_height)
  const width = getBreakpointValues(_width)

  const backgroundImage = loading ? (
    <ContentLoader width="100%" height="100%">
      <rect width="100%" height="100%" />
    </ContentLoader>
  ) : (
    _backgroundImage
  )

  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, [style.screen, screen], style[screen || 'dark'], style[vAlign], className])}
      style={{
        ['--banner-bg-color' as string]: backgroundColor,
        ['--banner-text-color' as string]: textColor,
        ['--banner-sm-width' as string]: width.sm,
        ['--banner-md-width' as string]: width.md,
        ['--banner-lg-width' as string]: width.lg,
        ['--banner-xl-width' as string]: width.xl,
        ['--banner-sm-height' as string]: height.sm,
        ['--banner-md-height' as string]: height.md,
        ['--banner-lg-height' as string]: height.lg,
        ['--banner-xl-height' as string]: height.xl,
        ...props.style,
      }}
    >
      {backgroundImage && (
        <backgroundImage.type {...merge(backgroundImage.props, { className: style.backgroundImage })} />
      )}

      <Block className={classes([style.wrapper, style[align], style[vAlign]])} contained={contained}>
        <div className={style.content}>
          {heading && <heading.type {...merge(heading.props, {})} />}
          {button && <button.type {...merge(button.props, { className: style.button })} />}
        </div>
      </Block>
    </root.type>
  )
}

// Loader Skeleton
export type BannerSkeletonProps = HTMLAttributes<HTMLElement> & {
  contained?: boolean
  width?: BreakpointValues<string>
  height?: BreakpointValues<string>
  screen?: 'dark' | 'darker' | 'light' | 'lighter'
  uniqueKey?: string
}

export const BannerSkeleton: FunctionComponent<BannerSkeletonProps> = ({ uniqueKey, ...props }) => {
  return (
    <Banner
      backgroundImage={
        <ContentLoader uniqueKey={uniqueKey} width="100%" height="100%">
          <rect width="100%" height="100%" />
        </ContentLoader>
      }
      {...props}
    />
  )
}
