import deepmerge from 'deepmerge'

export type Spacing = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Size = 'md' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'

export type Color =
  | 'surface'
  | 'surface-darker'
  | 'surface-lighter'
  | 'primary'
  | 'primary-darker'
  | 'primary-lighter'
  | 'secondary'
  | 'secondary-darker'
  | 'secondary-lighter'
  | 'accent'
  | 'accent-darker'
  | 'accent-lighter'

export type OnColor =
  | 'on-surface'
  | 'on-surface-darker'
  | 'on-surface-lighter'
  | 'on-primary'
  | 'on-primary-darker'
  | 'on-primary-lighter'
  | 'on-secondary'
  | 'on-secondary-darker'
  | 'on-secondary-lighter'
  | 'on-accent'
  | 'on-accent-darker'
  | 'on-accent-lighter'

export type BreakpointValues<T> = T | { sm: T; md?: T; lg?: T; xl?: T }

export const getBreakpointValues = (value: BreakpointValues<any>) => {
  if (typeof value !== 'object') return { sm: value, md: value, lg: value, xl: value }

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
