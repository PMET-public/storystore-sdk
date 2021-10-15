import { FunctionComponent, useEffect, useState, useRef, HTMLAttributes, ReactElement } from 'react'
import { classes, merge } from '../../lib'

// Styles
import style from './Dialog.module.css'

export type DialogProps = {
  root?: ReactElement
  open?: boolean
  closeOnClickOutside?: boolean
  setOpen?: (state: boolean) => any
} & HTMLAttributes<HTMLDivElement>

export const Dialog: FunctionComponent<DialogProps> = ({
  root = <div />,
  open = false,
  closeOnClickOutside = false,
  setOpen,
  children,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (open) {
      setLoaded(true)
    } else {
      wrapperRef.current?.addEventListener('animationend', () => {
        setLoaded(false)
      })
    }
  }, [open, wrapperRef.current])

  return loaded ? (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, [style.open, open]])}
      data-screen
      onClick={(e: any) => {
        if (closeOnClickOutside && setOpen && e.target.dataset.screen && setOpen) setOpen(false)
      }}
    >
      <div className={classes([style.wrapper, [style.open, open]])} ref={wrapperRef}>
        {children}
      </div>
    </root.type>
  ) : null
}

export const useDialog = (state = false) => {
  const [open, setOpen] = useState(state)

  return {
    open,
    setOpen,
  }
}
