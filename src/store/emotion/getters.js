export function emotionsObject (state) {
  const emotionsObject = {}
  state.emotionsArray.forEach(item => { emotionsObject[item.value] = item.icon })
  return emotionsObject
}
