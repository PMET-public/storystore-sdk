import { FunctionComponent, HTMLAttributes, ReactElement, isValidElement } from 'react'
import { Block } from '../../components'
import { classes } from '../../lib'

import style from './TemplateWithMedia2Columns.module.css'

export type TemplateWithMedia2ColumnsProps = HTMLAttributes<HTMLDivElement> & {
  media: ReactElement<HTMLAttributes<HTMLImageElement>>
}

export const TemplateWithMedia2Columns: FunctionComponent<TemplateWithMedia2ColumnsProps> = ({
  media,
  className,
  children,
  ...props
}) => {
  return (
    <Block {...props} className={classes([style.root, className])} columns={{ sm: '1fr', lg: '1fr 1fr' }}>
      {/* Media */}
      <div className={style.media}>
        {isValidElement(media) && (
          <media.type {...media.props} className={classes([style.media, media.props.className])} />
        )}
      </div>

      {/* Content */}
      <Block columns="1fr" padded className={style.wrapper}>
        <Block gap="lg" className={style.content}>
          {children}
        </Block>
      </Block>
    </Block>
  )
}
