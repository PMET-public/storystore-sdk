import { FunctionComponent, useEffect, useState, useRef, useCallback } from 'react'
import { DialogProps } from './Dialog.d'
import { classes, merge } from '../../lib'

// Styles
import style from './Dialog.module.css'

export const Dialog: FunctionComponent<DialogProps> = ({
  root = <div />,
  open: _open = false,
  onClose,
  children,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  const [loaded, setLoaded] = useState(false)

  const handleOpen = useCallback(
    (state = true) => {
      if (state) {
        setOpen(true)
        setLoaded(true)
      } else {
        if (typeof onClose === 'function') {
          setOpen(false)

          wrapperRef.current?.addEventListener('animationend', () => {
            setLoaded(false)
            onClose(false)
          })
        }
      }
    },
    [wrapperRef.current]
  )

  const handleOnScreenClick = useCallback(e => {
    if (e.target.dataset.screen) handleOpen(false)
  }, [])

  useEffect(() => {
    handleOpen(_open)
  }, [_open])

  return loaded ? (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, [style.open, open]])}
      onClick={handleOnScreenClick}
      data-screen
    >
      <div className={classes([style.wrapper, [style.open, open]])} ref={wrapperRef}>
        {children}
      </div>
    </root.type>
  ) : null
}
