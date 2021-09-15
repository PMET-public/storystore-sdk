import { FunctionComponent, HTMLAttributes } from 'react'
import { classes } from '../../lib'

// Styles
import style from './Html.module.css'

export type HtmlProps = HTMLAttributes<HTMLDivElement> & {
  htmlString: string
}

export const Html: FunctionComponent<HtmlProps> = ({ className, htmlString, ...props }) => {
  return (
    <div {...props} className={classes([style.root, className])} dangerouslySetInnerHTML={{ __html: htmlString }} />
  )
}
