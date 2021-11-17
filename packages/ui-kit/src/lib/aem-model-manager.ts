import { Model, ModelManager, ModelClient, AuthoringUtils } from '@adobe/aem-spa-page-model-manager'
import { ModelManagerConfiguration } from '@adobe/aem-spa-page-model-manager/dist/ModelManager'

export const isInEditor = AuthoringUtils.isInEditor

export const initAEMModel = (options?: ModelManagerConfiguration) => {
  const apitHost = new URL(process.env.NEXT_PUBLIC_URL).origin
  const modelClient = new ModelClient(apitHost)

  ModelManager.initializeAsync({ modelClient, ...options })
}

export type AEMModelProps = {
  [pathId: string]: AEMModelProps | undefined
}

const recursive = (model: AEMModelProps): AEMModelProps => {
  return Object.entries(model?.[':items'] || {}).reduce((obj, item) => {
    const [key, value] = item
    return {
      ...obj,
      [key]: value?.[':items'] ? recursive(value) : { loaded: true, loading: false, ...value },
    }
  }, {})
}

export const getPropsFromAEMModel = (model: any = {}) => {
  return {
    __pagePath: model[':path'] ?? '',

    page: {
      title: model.title ?? null,
      description: model.description ?? null,
      keywords: model.keywords ?? null,
      siteName: model.siteName ?? null,
      logoFile: model.logoFile ?? null,
      colorBody: model.colorBody ?? null,
      colorOnBody: model.colorOnBody ?? null,
      colorSurface: model.colorSurface ?? null,
      colorOnSurface: model.colorOnSurface ?? null,
      colorAccent: model.colorAccent ?? null,
      colorOnAccent: model.colorOnAccent ?? null,
      colorPrimary: model.colorPrimary ?? null,
      colorOnPrimary: model.colorOnPrimary ?? null,
      colorSecondary: model.colorSecondary ?? null,
      colorOnSecondary: model.colorOnSecondary ?? null,
    },

    ...recursive(model),
  }
}

export const fetchAEMModel = async (pagePath: string) => {
  if (!pagePath) throw Error('Missing pagePath')

  const model = await fetch(new URL(pagePath + '.model.json', process.env.NEXT_PUBLIC_URL).href)
    .then(async res => await res.json())
    .catch(() => undefined)

  return getPropsFromAEMModel(model)
}
