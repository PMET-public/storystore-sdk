import { FunctionComponent, cloneElement, isValidElement } from 'react'
import { FooterProps } from './Footer.d'
import { Block } from '..'
import { classes, merge } from '../../lib'

// Styles
import style from './Footer.module.css'

// Icons
import FacebookIcon from 'remixicon-react/FacebookFillIcon'
import TwitterIcon from 'remixicon-react/TwitterFillIcon'
import InstagramIcon from 'remixicon-react/InstagramFillIcon'
import PinterestIcon from 'remixicon-react/PinterestFillIcon'

export const Footer: FunctionComponent<FooterProps> = ({
  root = <footer />,
  name = 'Adobe',
  logo,
  description,
  contained,
  menu,
  className,
  ...props
}) => {
  const year = new Date().getFullYear()

  return (
    <root.type {...merge(props, root.props)} className={classes([style.root, className])}>
      <Block className={style.wrapper} contained={contained} padded>
        <div>{isValidElement(logo) ? cloneElement(logo, { className: style.logo }) : null}</div>

        <div className={style.menu}>
          {menu?.map((item, key) => {
            return item ? <item.type key={item.key ?? key} {...item.props} /> : null
          })}
        </div>

        <div className={style.disclaimer}>
          Ⓒ {year}, {name}. {description}
          <div>
            <p>WKND is a fictitious adventure and travel PWA created by Adobe.</p>
            <p>
              Many of the beautiful images in the WKND site are available for purchase via{' '}
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
