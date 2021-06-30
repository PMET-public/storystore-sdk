export const getBasicAuthenticationHeader = (credentials: [username: string, password: string]) => {
  const [username, password] = credentials || []
  if (!username) return undefined
  return 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
}
