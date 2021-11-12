import { FunctionComponent, cloneElement, isValidElement, HTMLAttributes, ReactElement } from 'react'
import { Block } from '..'
import { classes, merge } from '../../lib'

// Styles
import style from './Footer.module.css'

// Default Logo
import { AdobeLogo } from './AdobeLogo'

// Icons
import FacebookIcon from 'remixicon-react/FacebookFillIcon'
import TwitterIcon from 'remixicon-react/TwitterFillIcon'
import InstagramIcon from 'remixicon-react/InstagramFillIcon'
import PinterestIcon from 'remixicon-react/PinterestFillIcon'

export type FooterProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  /** Name of the website */
  name?: string
  /** Site description */
  description?: string
  /** React SVG Logo */
  logo?: ReactElement<HTMLAttributes<SVGElement>>
  /** Menu Navigation */
  nav?: ReactElement
  /** Centered content */
  contained?: boolean
}

export const Footer: FunctionComponent<FooterProps> = ({
  root = <footer />,
  name = 'Adobe',
  logo,
  description,
  contained,
  nav,
  className,
  ...props
}) => {
  const year = new Date().getFullYear()

  return (
    <root.type {...merge(props, root.props)} className={classes([style.root, className])}>
      <Block className={style.wrapper} contained={contained} padded>
        <div>
          {isValidElement(logo) ? (
            cloneElement(logo, { className: style.logo })
          ) : (
            <AdobeLogo aria-label="Adobe" className={style.logo} />
          )}
        </div>

        <div className={style.menu}>
          {nav && <nav.type {...nav.props} className={classes([style.nav, nav.props.className])} />}
        </div>

        <div className={style.disclaimer}>
          Ⓒ {year}, {name}. {description}
          <div>
            <p>WKND is a fictitious adventure and travel PWA created by Adobe.</p>
            <p>
              Many of the beautiful images in the WKND site are available for purchase via
              <a href="https://stock.adobe.com" target="_blank" rel="noreferrer">
                Adobe Stock.
              </a>
            </p>
          </div>
        </div>

        <div className={style.social}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FacebookIcon aria-label="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <TwitterIcon aria-label="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <InstagramIcon aria-label="Instagram" />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">
            <PinterestIcon aria-label="Pinterest" />
          </a>
        </div>
      </Block>
    </root.type>
  )
}
