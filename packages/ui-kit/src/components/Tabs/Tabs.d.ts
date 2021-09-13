import { HTMLAttributes, ReactElement } from 'react'
import { AriaTabPanelProps, TabListProps } from '@react-types/tabs'
import { TabListState } from '@react-stately/tabs'

export type TabProps = HTMLAttributes<HTMLDivElement> & {
  item: any
  state: TabListState<{}>
}

export type TabPanelProps = HTMLAttributes<HTMLDivElement> & {
  state: TabListState<{}>
} & AriaTabPanelProps

export type TabsProps = HTMLAttributes<HTMLDivElement> & TabListProps<{}> & { root?: ReactElement }
