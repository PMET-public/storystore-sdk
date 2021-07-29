import { FunctionComponent, ReactElement, ImgHTMLAttributes, cloneElement } from 'react'
import classes from '../../lib/class-names'
import style from './Banner.module.css'
import { ButtonProps } from '../Button'
import View from '../View'

export type BannerProps = {
  backgroundImage?: ReactElement<ImgHTMLAttributes<HTMLImageElement>>
  backgroundColor?: string
  textColor?: string
  align?: 'left' | 'right' | 'center'
  title?: ReactElement<ButtonProps>
  button?: ReactElement<ButtonProps>
  contained?: boolean
  width?: string
  height?: string
}

export const Banner: FunctionComponent<BannerProps> = ({
  backgroundColor,
  backgroundImage,
  button,
  children,
  contained = false,
  textColor,
  title,
  align = 'center',
  width = '100%',
  height = '400px',
  ...props
}) => {
  return (
    <div
      {...props}
      className={style.root}
      style={{
        ['--banner-bg-color' as string]: backgroundColor,
        ['--banner-text-color' as string]: textColor,
        ['--banner-width' as string]: width,
        ['--banner-height' as string]: height,
      }}
    >
      {backgroundImage && cloneElement(backgroundImage, { className: style.backgroundImage })}
      <View className={classes([style.wrapper, style[align]])} contained={contained}>
        <div className={style.content}>
          {title && cloneElement(title, { className: style.title })}
          {button && cloneElement(button, { className: style.button })}
        </div>
      </View>
    </div>
  )
}
