import { FunctionComponent } from 'react'
import { useFocusVisible } from '@react-aria/interactions'
import style from './UIProvider.module.css'
import { classes } from '../../lib'
import '../css/normalize.css'
import '../css/global.css'

export type UIProvider = {}

export const UIProvider: FunctionComponent<UIProvider> = ({ ...props }) => {
  const { isFocusVisible } = useFocusVisible()

  return <div {...props} className={classes([style.root, [style.focusVisible, isFocusVisible]])} />
}
