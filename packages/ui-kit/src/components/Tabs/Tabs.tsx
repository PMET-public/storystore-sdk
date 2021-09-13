import { FunctionComponent, useRef } from 'react'
import { TabProps, TabPanelProps, TabsProps } from './Tabs.d'
import { classes, merge } from '../../lib'
import { useTabList, useTab, useTabPanel } from '@react-aria/tabs'
import { useTabListState } from '@react-stately/tabs'
import { Item } from '@react-stately/collections'

// Styles
import style from './Tabs.module.css'

const Tab: FunctionComponent<TabProps> = ({ className, item, state }) => {
  const { key, rendered } = item
  const ref = useRef(null)
  const { tabProps } = useTab({ key }, state, ref)
  const selected = state.selectedKey === key
  const disabled = state.disabledKeys.has(key)
  return (
    <div
      ref={ref}
      className={classes([style.tab, [style.disabled, disabled], [style.selected, selected], className])}
      {...tabProps}
    >
      {rendered}
    </div>
  )
}

const TabPanel: FunctionComponent<TabPanelProps> = ({ className, state, ...props }) => {
  const ref = useRef(null)
  const { tabPanelProps } = useTabPanel(props, state, ref)

  return (
    <div ref={ref} className={classes([style.panel, className])} {...tabPanelProps}>
      {state.selectedItem?.props.children}
    </div>
  )
}

export const Tabs: FunctionComponent<TabsProps> = ({ root = <div />, className, ...props }) => {
  const state = useTabListState(props)

  const ref = useRef(null)

  const { tabListProps } = useTabList(props, state, ref)

  return (
    <root.type {...merge(props, root.props)} className={classes([style.root, className])}>
      <div className={style.tabs} {...tabListProps} ref={ref}>
        <div className={style.tabsWrapper}>
          {[...state.collection].map(item => (
            <Tab key={item.key} item={item} state={state} />
          ))}
        </div>
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </root.type>
  )
}

export const TabsItem = Item
