import { FunctionComponent } from 'react'
import { useFocusVisible } from '@react-aria/interactions'
import style from './UIProvider.module.css'
import classNames from '../../lib/class-names'
import '../css/normalize.css'
import '../css/global.css'

export type UIProvider = {}

export const UIProvider: FunctionComponent<UIProvider> = ({ ...props }) => {
  const { isFocusVisible } = useFocusVisible()

  return <div {...props} className={classNames([style.root, [style.focusVisible, isFocusVisible]])} />
}
