import { FunctionComponent, HTMLAttributes, ReactElement, useCallback, useEffect, useState } from 'react'
import { classes, merge } from '../../lib'
import { Button } from '..'

// Styles
import styles from './Share.module.css'

// Icons
import ShareIcon from 'remixicon-react/ShareForwardFillIcon'

export type ShareProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  title?: string
  text?: string
  url?: string
}

export const Share: FunctionComponent<ShareProps> = ({
  root = <div />,
  title,
  text,
  url,
  children,
  className,
  ...props
}) => {
  const [disabled, setDisabled] = useState(false)

  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      setDisabled((navigator as any).canShare({ title, text, url }) === false)
    } catch (error) {
      setDisabled(true)
    }
  }, [title, text, url])

  const handleShare = useCallback(async () => {
    try {
      setError(false)

      await navigator.share({
        title,
        text,
        url,
      })
    } catch (err) {
      setError(true)
    }
  }, [title, text, url])

  return (
    <root.type {...merge(props, root.props)} className={classes([styles.root, root.props.className, className])}>
      <Button
        transparent
        icon={<ShareIcon />}
        aria-label="Share"
        disabled={disabled}
        onClick={handleShare}
        className={classes([styles.button, [styles.error, error]])}
      >
        {children}
      </Button>
    </root.type>
  )
}
