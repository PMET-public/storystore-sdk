import { FunctionComponent, HTMLAttributes } from 'react'
import style from './UIProvider.module.css'
import { classes } from '../../lib'
import ToastContainer from '../../components/Toast'

// TODO: Moved to App wrapper until Next.js allows for global css import from other files.
// import '../css/global.css'

export type UIProviderProps = HTMLAttributes<HTMLDivElement>

export const UIProvider: FunctionComponent<UIProviderProps> = ({ children, ...props }) => {
  return (
    <>
      <div {...props} className={classes([style.root])}>
        {children}
      </div>
      <ToastContainer autoClose={5000} closeOnClick pauseOnFocusLoss theme="dark" />
    </>
  )
}
