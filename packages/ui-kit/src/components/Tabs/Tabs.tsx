import { FunctionComponent, useRef } from 'react'
import classes from '../../lib/class-names'
import style from './Tabs.module.css'
import { useTabList, useTab, useTabPanel } from '@react-aria/tabs'
import { useTabListState, TabListState } from '@react-stately/tabs'
import { Item } from '@react-stately/collections'
import { AriaTabPanelProps, TabListProps } from '@react-types/tabs'

type TabProps = {
  item: any
  state: TabListState<{}>
}

const Tab: FunctionComponent<TabProps> = ({ item, state }) => {
  const { key, rendered } = item
  const ref = useRef(null)
  const { tabProps } = useTab({ key }, state, ref)
  const selected = state.selectedKey === key
  const disabled = state.disabledKeys.has(key)
  return (
    <div
      {...tabProps}
      ref={ref}
      className={classes([style.tab, [style.disabled, disabled], [style.selected, selected]])}
    >
      {rendered}
    </div>
  )
}

type TabPanelProps = {
  state: TabListState<{}>
} & AriaTabPanelProps

const TabPanel: FunctionComponent<TabPanelProps> = ({ state, ...props }) => {
  const ref = useRef(null)
  const { tabPanelProps } = useTabPanel(props, state, ref)
  return (
    <div {...tabPanelProps} ref={ref} className={style.panel}>
      {state.selectedItem?.props.children}
    </div>
  )
}

export type TabsProps = TabListProps<{}>

export const Tabs: FunctionComponent<TabsProps> = ({ ...props }) => {
  const state = useTabListState(props)
  state.collection
  const ref = useRef(null)
  const { tabListProps } = useTabList(props, state, ref)

  return (
    <div className={style.root}>
      <div className={style.tabs} {...tabListProps} ref={ref}>
        <div className={style.tabsWrapper}>
          {[...state.collection].map(item => (
            <Tab key={item.key} item={item} state={state} />
          ))}
        </div>
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  )
}

export const TabsItem = Item
