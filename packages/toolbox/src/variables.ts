import { cookies } from './'
type Variable = 'NEXT_PUBLIC_AEM_GRAPHQL_URL' | 'NEXT_PUBLIC_AEM_GRAPHQL_AUTH'

export const get = (variable: Variable) => {
  return cookies.get(variable)
}

export const set = (variable: Variable, value: string) => {
  return cookies.set(variable, value, 365)
}

export const remove = (variable: Variable) => {
  return cookies.remove(variable)
}
