import { FunctionComponent } from 'react'
import { HtmlProps } from './Html.d'
import { classes } from '../../lib'

// Styles
import style from './Html.module.css'

export const Html: FunctionComponent<HtmlProps> = ({ className, htmlString, ...props }) => {
  return (
    <div {...props} className={classes([style.root, className])} dangerouslySetInnerHTML={{ __html: htmlString }} />
  )
}
