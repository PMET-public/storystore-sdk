import deepmerge from 'deepmerge'

export type Spacing = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type Size = 'md' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'

export type Color = 'surface' | 'primary' | 'secondary' | 'accent'

export type BreakpointValues<T> = T | { small: T; large: T }

export const getBreakpointValues = (value: BreakpointValues<any>) => {
  return typeof value !== 'object'
    ? {
        small: value,
        large: value,
      }
    : {
        small: value.small,
        large: value.large ?? value.small,
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
