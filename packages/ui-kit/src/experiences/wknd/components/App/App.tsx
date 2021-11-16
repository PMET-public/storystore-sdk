import { FunctionComponent, HTMLAttributes, ReactElement } from 'react'
import { initAEMModel } from '../../../../lib'
import { AEM } from '../../../components'

// AEM Model Manager
initAEMModel()

// AEM Model Path
export const APP_AEM_MODEL_PAGE_PATH = '/content/storystore/wknd-adventures'

export type AppProps = HTMLAttributes<HTMLDivElement> & {
  linkRoot?: ReactElement
  pagePath?: string
}

export const App: FunctionComponent<AppProps> = ({ ...props }) => {
  return <AEM.Page pagePath={APP_AEM_MODEL_PAGE_PATH} {...props} />
}
