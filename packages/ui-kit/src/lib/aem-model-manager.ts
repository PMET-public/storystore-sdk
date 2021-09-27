import { Model, ModelManager, ModelClient } from '@adobe/aem-spa-page-model-manager'

export const initAEMModel = (apiHost: string) => {
  const modelClient = new ModelClient(apiHost)
  ModelManager.initializeAsync({ modelClient })
  console.log('✨ AEM Model Initialized', ModelManager.rootPath)
}

export type AEMModelProps = {
  [pathId: string]: AEMModelProps | undefined
}

const recursive = (model: Model) => {
  return Object.entries(model?.[':items'] || {}).reduce((obj, item) => {
    const [key, value] = item
    return {
      ...obj,
      [key]: value?.[':items'] ? recursive(value) : { loaded: true, loading: false, ...value },
    }
  }, {})
}

export const getPropsFromAEMModelPath = async (path: string): Promise<AEMModelProps> => {
  const model = await ModelManager.getData(path)
  const props = recursive(model)
  return props
}
