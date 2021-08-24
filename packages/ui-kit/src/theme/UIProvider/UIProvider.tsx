import { FunctionComponent } from 'react'
import { useFocusVisible } from '@react-aria/interactions'
import style from './UIProvider.module.css'
import { classes } from '../../lib'

// TODO: Moved to App wrapper until Next.js allows for global css import from other files.
// import '../css/global.css'

export type UIProvider = {}

export const UIProvider: FunctionComponent<UIProvider> = ({ ...props }) => {
  const { isFocusVisible } = useFocusVisible()

  return <div {...props} className={classes([style.root, [style.focusVisible, isFocusVisible]])} />
}
