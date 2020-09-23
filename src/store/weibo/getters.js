export function newWeiboList (state) {
  // 由于js的局限性，我必须要写重复代码，其实可以直接绑定在Vue上面，但是我懒，哈哈。
  const emotionsObject = {}
  state.emotionsArray.forEach(item => {
    const key = item.value
    const value = item.icon
    emotionsObject[key] = value
  })

  const weiboList2 = JSON.stringify(state.weiboList)
  const weiboList3 = JSON.parse(weiboList2)
  const regExp = new RegExp(/\[.*?\]/)
  const newWeiboList = weiboList3.map(item => {
    const replace = () => {
      if (regExp.test(item.content)) {
        const match = regExp.exec(item.content)[0]
        const keyToValue = emotionsObject[match]
        // 替代品
        const replaceContent = `<img src="${keyToValue}">`
        item.content = item.content.replace(regExp, replaceContent)
        replace()
      }
    }
    replace()
    return item
  })
  return newWeiboList
}
