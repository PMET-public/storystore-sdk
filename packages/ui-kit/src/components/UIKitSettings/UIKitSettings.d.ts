import { HTMLAttributes, ReactElement } from 'react'

export type SettingsValues<T = string> = {
  AEM_GRAPHQL_URL: T
  AEM_GRAPHQL_AUTH: T
}

export type UIKitSettingsProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  values?: SettingsValues
  placeholders?: SettingsValues
  errors?: SettingsValues<{ message: string }>
  onSubmit: (data: any) => any
  onReset: () => any
}
