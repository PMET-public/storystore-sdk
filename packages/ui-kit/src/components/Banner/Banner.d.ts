import { BreakpointValues } from '../../lib'
import { ReactElement, ImgHTMLAttributes, HTMLAttributes } from 'react'
import { ButtonProps } from '../Button'

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

export type BannerSkeletonProps = HTMLAttributes<HTMLElement> & {
  contained?: boolean
  width?: BreakpointValues<string>
  height?: BreakpointValues<string>
  screen?: 'dark' | 'darker' | 'light' | 'lighter'
  uniqueKey?: string
}
