import { FunctionComponent, HTMLAttributes, ReactElement, cloneElement } from 'react'
import style from './Footer.module.css'
import View from '../View'
import FacebookIcon from 'remixicon/icons/Logos/facebook-fill.svg'
import TwitterIcon from 'remixicon/icons/Logos/twitter-fill.svg'
import InstagramIcon from 'remixicon/icons/Logos/instagram-fill.svg'
import PinterestIcon from 'remixicon/icons/Logos/pinterest-fill.svg'

export type FooterProps = {
  /** Name of the website */
  name?: string
  /** Site description */
  description?: string
  /** React SVG Logo */
  logo: ReactElement<HTMLAttributes<SVGElement>>
  /** Menu Navigation */
  menu?: Array<ReactElement>
  /** Centered content */
  contained?: boolean
}

export const Footer: FunctionComponent<FooterProps> = ({
  name = 'Adobe',
  logo,
  description,
  contained,
  menu,
  ...props
}) => {
  const year = new Date().getFullYear()

  return (
    <footer className={style.root} {...props}>
      <View className={style.wrapper} contained={contained} padded>
        <div>{cloneElement(logo, { className: style.logo })}</div>

        <div className={style.menu}>{menu?.map((item, key) => cloneElement(item, { key }))}</div>

        <div className={style.disclaimer}>
          Ⓒ {year}, {name}. {description}
          <em>
            Many of the beautiful images in the WKND site are available for purchase via{' '}
            <a href="https://stock.adobe.com" target="_blank">
              Adobe Stock.
            </a>
          </em>
        </div>

        <div className={style.social}>
          <a href="https://facebook.com" target="_blank">
            <FacebookIcon aria-label="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank">
            <TwitterIcon aria-label="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank">
            <InstagramIcon aria-label="Instagram" />
          </a>
          <a href="https://pinterest.com" target="_blank">
            <PinterestIcon aria-label="Pinterest" />
          </a>
        </div>
      </View>
    </footer>
  )
}
