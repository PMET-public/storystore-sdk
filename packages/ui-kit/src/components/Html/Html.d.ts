import { HTMLAttributes } from 'react'

export type HtmlProps = HTMLAttributes<HTMLDivElement> & {
  htmlString: string
}
