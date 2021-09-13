import { FunctionComponent, createContext, useContext } from 'react'
import { LinkProps } from './Link.d'
import { classes, merge } from '../../lib'

const LinkContext = createContext(<a />)

export const LinkProvider = LinkContext.Provider

export const useLink = () => useContext(LinkContext)

export const Link: FunctionComponent<LinkProps> = ({ className, children, ...props }) => {
  const link = useLink()

  return (
    <link.type {...props} {...merge(link.props, props)} className={classes([link.props.className, className])}>
      {children}
    </link.type>
  )
}
