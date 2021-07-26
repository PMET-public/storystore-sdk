import { FunctionComponent, ImgHTMLAttributes } from 'react'
import classes from '../../lib/class-names'
import style from './Banner.module.css'

export type BannerProps = {
  /** App logo. */
  backgroundImage?: FunctionComponent<ImgHTMLAttributes<HTMLImageElement>>
}

export const Banner: FunctionComponent<BannerProps> = ({ children, backgroundImage: BackgroundImage, ...props }) => {
  return (
    <div {...props} className={classes([style.root])}>
      {BackgroundImage && <BackgroundImage className={style.backgroundImage} />}
      <div className={style.wrapper}>{children}</div>
    </div>
  )
}
