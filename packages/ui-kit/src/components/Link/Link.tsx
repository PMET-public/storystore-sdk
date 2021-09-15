import { FunctionComponent, createContext, useContext, AnchorHTMLAttributes } from 'react'
import { classes, merge } from '../../lib'

const LinkContext = createContext(<a />)

export const LinkProvider = LinkContext.Provider

export const useLink = () => useContext(LinkContext)

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {}

export const Link: FunctionComponent<LinkProps> = ({ className, children, ...props }) => {
  const link = useLink()

  return (
    <link.type {...props} {...merge(link.props, props)} className={classes([link.props.className, className])}>
      {children}
    </link.type>
  )
}
