export default function classNames(classes: Array<string | [string, boolean]>) {
  const result = classes.reduce((result, item) => {
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
