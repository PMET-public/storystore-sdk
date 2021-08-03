import { FunctionComponent, ReactElement, ImgHTMLAttributes, cloneElement, HTMLAttributes } from 'react'
import { classes, merge, BreakpointValues, getBreakpointValues } from '../../lib'
import style from './Banner.module.css'
import { ButtonProps } from '../Button'
import View from '../View'

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
        ['--banner-small-width' as string]: width.small,
        ['--banner-medium-width' as string]: width.medium,
        ['--banner-large-width' as string]: width.large,
        ['--banner-small-height' as string]: height.small,
        ['--banner-medium-height' as string]: height.medium,
        ['--banner-large-height' as string]: height.large,
        ...props.style,
      }}
    >
      {backgroundImage && cloneElement(backgroundImage, { className: style.backgroundImage })}

      <View className={classes([style.wrapper, style[align], style[vAlign]])} contained={contained}>
        <div className={style.content}>
          {heading && cloneElement(heading, { className: style.heading })}
          {button && cloneElement(button, { className: style.button })}
        </div>
      </View>
    </root.type>
  )
}
