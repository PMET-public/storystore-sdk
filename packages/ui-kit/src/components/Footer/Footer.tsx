import { FunctionComponent, cloneElement, isValidElement, HTMLAttributes, ReactElement } from 'react'
import { Block } from '..'
import { classes, merge } from '../../lib'

// Styles
import style from './Footer.module.css'

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 425.1 425.1"
              aria-label="Adobe Experience Cloud"
              className={style.logo}
            >
              <path
                fill="#fa0f00"
                d="M103.8,37.4H396.1a66.36,66.36,0,0,1,66.4,66.4V396.1a66.36,66.36,0,0,1-66.4,66.4H103.8a66.36,66.36,0,0,1-66.4-66.4V103.8A66.36,66.36,0,0,1,103.8,37.4Z"
                transform="translate(-37.4 -37.4)"
              />
              <path
                fill="#fff"
                d="M283.6,133.5l102.2,233H313.3L250,222.3l-38.5,87.9h45.2l24.7,56.3H114.2l102.2-233Z"
                transform="translate(-37.4 -37.4)"
              />
            </svg>
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
