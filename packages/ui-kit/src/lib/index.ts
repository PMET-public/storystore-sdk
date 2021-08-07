import deepmerge from 'deepmerge'

export type Spacing = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Size = 'md' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'

export type Color = 'surface' | 'primary' | 'secondary' | 'accent'

export type BreakpointValues<T> = T | { sm: T; md?: T; lg?: T; xl?: T }

export const getBreakpointValues = (value: BreakpointValues<any>) => {
  if (typeof value !== 'object') return { sm: value, md: value, lg: value, xl: value, '2xl': value }

  return {
    sm: value.sm,
    md: value.md ?? value.sm,
    lg: value.lg ?? value.md ?? value.sm,
    xl: value.xl ?? value.lg ?? value.md ?? value.sm,
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
