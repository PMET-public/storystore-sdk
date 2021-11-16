import { Model, ModelManager, ModelClient, AuthoringUtils } from '@adobe/aem-spa-page-model-manager'
import { ModelManagerConfiguration } from '@adobe/aem-spa-page-model-manager/dist/ModelManager'

type Theme = {
  logoFile: string
  logoText: string
  colorBody: string
  colorOnBody: string
  colorSurface: string
  colorOnSurface: string
  colorAccent: string
  colorOnAccent: string
  colorPrimary: string
  colorOnPrimary: string
  colorSecondary: string
  colorOnSecondary: string
}

export const isInEditor = AuthoringUtils.isInEditor

export const initAEMModel = (options?: ModelManagerConfiguration) => {
  const apitHost = new URL(process.env.NEXT_PUBLIC_URL).origin
  const modelClient = new ModelClient(apitHost)

  ModelManager.initializeAsync({ modelClient, ...options })
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

export const getThemePropsFromAEMModel = (model: any): Theme => {
  return {
    logoFile: model?.logoFile ?? null,
    logoText: model?.logoText ?? null,
    colorBody: model?.colorBody ?? null,
    colorOnBody: model?.colorOnBody ?? null,
    colorSurface: model?.colorSurface ?? null,
    colorOnSurface: model?.colorOnSurface ?? null,
    colorAccent: model?.colorAccent ?? null,
    colorOnAccent: model?.colorOnAccent ?? null,
    colorPrimary: model?.colorPrimary ?? null,
    colorOnPrimary: model?.colorOnPrimary ?? null,
    colorSecondary: model?.colorSecondary ?? null,
    colorOnSecondary: model?.colorOnSecondary ?? null,
  }
}
