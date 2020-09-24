export const parseWeibo = (vueComponent, originContent) => {
  if (originContent) {
    // 防止xss攻击
    let processedContent = originContent.replace(/[<|>]/g, '')
    // 解析用户
    processedContent = processedContent.replace(/@(.*?)：/g, '<a onclick="forwardUserPage(event, \'$1\')">$&</a>')
    // 解析话题
    processedContent = processedContent.replace(/#(.*?)#/g, '<a onclick="forwardTopicPage(event, \'$1\')">$&</a>')
    // 解析网址
    processedContent = processedContent.replace(/http.*? /,
      '<img src="//h5.sinaimg.cn/upload/2015/09/25/3/timeline_card_small_web_default.png"><a href="$&" onclick="event.stopPropagation()" target="_blank">网页链接</a>')
    // 解析表情
    const finalContent = processedContent.replace(/\[(.*?)\]/g, (a1, a2, a3, a4, a5) => {
      const emojiURL = vueComponent.$store.getters['emotion/emotionsObject'][a1]
      if (emojiURL) {
        return `<img src="${emojiURL}">`
      }
      return a1
    })
    return finalContent
  }
}
// // 重要参考
// let str = '@abc 你好，请联系@def'
// // eslint-disable-next-line
// const regex = new RegExp('@[^\s]+', 'g')
// const n = str.match(/@[^\s]+/g)
// // console.log(n)
//
// n.forEach(item => {
//   str = str.replace(item, `<a href="#">${item}</a>`)
// })
//
// console.log(str)
