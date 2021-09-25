import { Model, ModelManager } from '@adobe/aem-spa-page-model-manager'

const recursive = (model: Model) => {
  return Object.entries(model?.[':items'] || {}).reduce((obj, item) => {
    const [key, value] = item
    return {
      ...obj,
      [key]: value?.[':items'] ? recursive(value) : { loaded: true, loading: false, ...value },
    }
  }, {})
}

export const getPropsFromAEMModelPath = async (path: string) => {
  const model = await ModelManager.getData(path)
  const props = recursive(model)
  return props
}
