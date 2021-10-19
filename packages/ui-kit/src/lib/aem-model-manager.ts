import { Model, ModelManager, ModelClient, AuthoringUtils } from '@adobe/aem-spa-page-model-manager'
import { ModelManagerConfiguration } from '@adobe/aem-spa-page-model-manager/dist/ModelManager'

export const initAEMModel = (options?: ModelManagerConfiguration) => {
  const apitHost = new URL(process.env.NEXT_PUBLIC_URL).origin
  const modelClient = new ModelClient(apitHost)

  ModelManager.initializeAsync({ modelClient, ...options })

  const editing = AuthoringUtils.isInEditor()

  console.log(`✨ AEM Model Initialized (${editing ? 'Editing' : 'Viewing'})`)

  return { editing }
}

export type AEMModelProps = {
  [pathId: string]: AEMModelProps | undefined
}

const recursive = (model: Model): AEMModelProps => {
  return Object.entries(model?.[':items'] || {}).reduce((obj, item) => {
    const [key, value] = item
    return {
      ...obj,
      [key]: value?.[':items'] ? recursive(value) : { loaded: true, loading: false, ...value },
    }
  }, {})
}

export const getPropsFromAEMModel = (model: Model): AEMModelProps => recursive(model)
