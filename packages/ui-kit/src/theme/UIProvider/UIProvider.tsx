import { FunctionComponent } from 'react'
import { useFocusVisible } from '@react-aria/interactions'
import style from './UIProvider.module.css'
import { classes } from '../../lib'
import ToastContainer from '../../components/Toast'

// TODO: Moved to App wrapper until Next.js allows for global css import from other files.
// import '../css/global.css'

export const UIProvider: FunctionComponent = ({ children, ...props }) => {
  const { isFocusVisible } = useFocusVisible({ isTextInput: true })

  return (
    <>
      <div {...props} className={classes([style.root, [style.focusVisible, isFocusVisible]])}>
        {children}
      </div>
      <ToastContainer autoClose={5000} closeOnClick pauseOnFocusLoss theme="dark" />
    </>
  )
}
