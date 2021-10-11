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
