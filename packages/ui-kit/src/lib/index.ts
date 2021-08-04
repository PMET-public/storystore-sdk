import deepmerge from 'deepmerge'

export type Spacing = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type Size = 'md' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'

export type Color = 'surface' | 'primary' | 'secondary' | 'accent'

export type BreakpointValues<T> = T | { small: T; medium?: T; large?: T }

export const getBreakpointValues = (value: BreakpointValues<any>) => {
  if (typeof value !== 'object') return { small: value, medium: value, large: value }

  return {
    small: value.small,
    medium: value.medium ?? value.small,
    large: value.large ?? value.medium ?? value.small,
  }
}

export const merge = deepmerge

export const classes = (classes: Array<string | [string, boolean] | undefined>) => {
  const result = classes.reduce((result, item) => {
    if (!item) return result

    if (typeof item === 'string') result += ' ' + item

    if (Array.isArray(item)) {
      const [className, isActive] = item
      if (className && isActive) {
        result += ' ' + className
      }
    }

    return result
  }, '') as string

  return result.trim()
}
