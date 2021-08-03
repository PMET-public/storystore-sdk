import { useLink } from '../App'
import { FunctionComponent, AnchorHTMLAttributes } from 'react'
import { classes, merge } from '../../lib'

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {}

export const Link: FunctionComponent<LinkProps> = ({ className, children, ...props }) => {
  const link = useLink()

  return (
    <link.type {...props} {...merge(link.props, props)} className={classes([link.props.className, className])}>
      {children}
    </link.type>
  )
}
