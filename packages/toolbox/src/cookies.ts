export const set = (name: string, value: string, expirationDays: number) => {
  const date = new Date()
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + date.toUTCString()
  document.cookie = name + '=' + value + ';' + expires + ';path=/'
}

export const getCookieValueFromString = (cookie: string, name: string) => {
  if (!cookie) return null
  const regex = cookie.match(new RegExp(name + '=([^;]+)'))
  return regex ? regex[1] : null
}

export const get = (name: string, cookie = '') => {
  const _cookie = typeof document === 'undefined' ? cookie : document.cookie
  return getCookieValueFromString(_cookie, name)
}

export const remove = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
