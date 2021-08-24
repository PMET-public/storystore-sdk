import { FunctionComponent, ReactElement, ImgHTMLAttributes, HTMLAttributes } from 'react'
import { classes, merge, BreakpointValues, getBreakpointValues } from '../../lib'
import style from './Banner.module.css'
import { ButtonProps } from '../Button'
import View from '../View'
import ContentLoader from 'react-content-loader'

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
}
export const Banner: FunctionComponent<BannerProps> = ({
  root = <div />,
  align = 'center',
  vAlign = 'middle',
  backgroundColor,
  backgroundImage,
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

  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, className, [style.screen, screen], style[screen || 'dark'], style[vAlign]])}
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

      <View className={classes([style.wrapper, style[align], style[vAlign]])} contained={contained}>
        <div className={style.content}>
          {heading && <heading.type {...merge(heading.props, {})} />}
          {button && <button.type {...merge(button.props, { className: style.button })} />}
        </div>
      </View>
    </root.type>
  )
}

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
