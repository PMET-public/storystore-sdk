import { FunctionComponent, cloneElement, isValidElement, HTMLAttributes, ReactElement } from 'react'
import { Block } from '..'
import { classes, merge } from '../../lib'

// Styles
import style from './Footer.module.css'

// Default Logo
import { AdobeLogo } from './AdobeLogo'

export type FooterProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  /** Name of the website */
  name?: string
  /** Site description */
  description?: string
  /** React SVG Logo */
  logo?: ReactElement<HTMLAttributes<SVGElement>>
  /** Menu Navigation */
  legal?: ReactElement
  /** Centered content */
  contained?: boolean
}

export const Footer: FunctionComponent<FooterProps> = ({
  root = <footer />,
  name = 'Adobe',
  logo,
  description,
  contained,
  children,
  className,
  legal,
  ...props
}) => {
  const year = new Date().getFullYear()

  return (
    <root.type {...merge(props, root.props)} className={classes([style.root, className])}>
      <Block contained={contained} padded>
        {children}
        <div className={style.wrapper}>
          {isValidElement(logo) ? (
            cloneElement(logo, { className: style.logo })
          ) : (
            <AdobeLogo aria-label="Adobe" className={style.logo} />
          )}
          <div className={style.disclaimer}>
            Ⓒ {year}, {name}. {description}
            <div className={style.disclaimerCopy}>
              <p>
                This is a fictitious PWA created by Adobe. <br /> Many of the beautiful images in this site are
                available for purchase via{' '}
                <a href="https://stock.adobe.com" target="_blank" rel="noreferrer">
                  Adobe Stock.
                </a>
              </p>
            </div>
            {legal}
          </div>
        </div>
      </Block>
    </root.type>
  )
}
