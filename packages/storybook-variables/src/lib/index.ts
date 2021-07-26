import { useMemo } from 'react'
import { useAddonState, useStorybookApi } from '@storybook/api'

import { useAddonState as useClientAddonState, useStoryContext as useClientStoryContext } from '@storybook/client-api'
import deepmerge from 'deepmerge'

export type StateValues = {
  [key: string]: any
}

export type State = {
  [storyId: string]: StateValues
}

export type Fields = {
  [key: string]: {
    label?: string
    defaultValue: string
  }
}

export type Params = {
  title?: string
  fields: Fields
}

export const ADDON_ID = 'storybook-variables'

export const STORYBOOK_VARIABLES = ADDON_ID

const getStoredValues = () => {
  return JSON.parse(localStorage.getItem(STORYBOOK_VARIABLES) || '{}')
}

const setStoredValues = (values: StateValues) => {
  localStorage.setItem(STORYBOOK_VARIABLES, JSON.stringify(values))
}

export const useDefaultValuesFromParams = (params: Params): Fields => {
  if (!params?.fields) return {}

  const entries = Object.entries(params.fields)

  return useMemo(() => {
    return entries.reduce((result, [name, { defaultValue }]) => ({ ...result, [name]: defaultValue }), {})
  }, [entries])
}

export const useStoryStateVariables = (params: Params) => {
  const { getUrlState } = useStorybookApi()

  const { storyId } = getUrlState()

  if (!storyId) throw Error('Missing "storyId"')

  const store = getStoredValues()

  const initialState = useDefaultValuesFromParams(params)

  const [_state, _setState] = useAddonState<StateValues>(ADDON_ID, deepmerge({ [storyId]: initialState }, store))

  const state = _state[storyId]

  const setState = (values: StateValues) => {
    const newValues = deepmerge(store, { [storyId]: values })
    _setState(newValues)
    setStoredValues(newValues)
  }

  return [state, setState]
}

export const useVariables = () => {
  const { id, parameters } = useClientStoryContext()

  const store = getStoredValues()

  const initialState = useDefaultValuesFromParams(parameters.variables)

  const [state] = useClientAddonState<StateValues>(ADDON_ID, deepmerge({ [id]: initialState }, store))

  return (state && state[id]) || {}
}
