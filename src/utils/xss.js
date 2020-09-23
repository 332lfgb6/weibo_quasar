export const preventXSS = content => {
  return content.replace(/[<|>]/g, '')
}
