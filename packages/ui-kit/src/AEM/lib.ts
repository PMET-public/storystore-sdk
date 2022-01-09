import { AuthoringUtils, ModelClient } from '@adobe/aem-spa-page-model-manager'
import { useEffect, useState } from 'react'
import { PageModel } from '@adobe/aem-react-editable-components'
import { ModelManager } from '@adobe/aem-spa-page-model-manager'

type PageModelPros =
  | (PageModel & {
      title?: string
      description?: string
      keywords?: string
      branding?: {
        colorBody?: string
        colorOnBody?: string
        colorOnPrimary?: string
        colorOnSecondary?: string
        colorOnSurface?: string
        colorPrimary?: string
        colorSecondary?: string
        colorSurface?: string
        logoFile?: string
        siteName?: string
      }
    })
  | undefined

export const getModelDataFromPath = (path?: string) => ModelManager.getData(path)

export const useAEMPageModel = (pagePath: string, defaultValues?: PageModelPros) => {
  const [model, setModel] = useState<PageModelPros>(defaultValues)

  useEffect(() => {
    getModelDataFromPath(pagePath).then((values: PageModelPros) => setModel(values))
  }, [pagePath])

  return model
}

export const isInEditor = AuthoringUtils.isInEditor

export const initAEMModelManager = (apiHost?: string) => {
  const modelClient = apiHost && new ModelClient(apiHost)

  ModelManager.initializeAsync({ modelClient })
}
