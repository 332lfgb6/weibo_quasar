import Vue from 'vue'
import { textToEmoji } from 'src/utils/text.to.emoji'
export function SET_WEIBO_LIST (state, payload) {
  if (payload.condition === '下拉刷新') {
    state.weiboList.push(...payload.weiboList)
  } else {
    state.weiboList = payload.weiboList
  }
}

export function SET_WEIBO_LIST2 (state, newPayload) {
  const finalWeiboList = textToEmoji(state.emotionsArray, newPayload.weiboList)

  if (newPayload.operation === '下拉刷新') {
    state.weiboList.push(finalWeiboList)
    return
  }

  Vue.set(state.weiboList2, newPayload.category, finalWeiboList)
}
