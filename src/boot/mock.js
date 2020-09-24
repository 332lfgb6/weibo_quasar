import Mock from 'mockjs'
import UUID from 'uuidjs'
/*eslint-disable*/
import { request } from 'src/utils/request'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ store }) => {
  // 模拟微博列表
  Mock.mock('/weibo', 'get', () => {
    const weiboList = []
    for (let i = 0; i < 10; i++) {
      const cparagraph = Mock.mock('@cparagraph')
      const nickname = Mock.mock('@name')
      const imageID = Mock.mock({ 'imageID|1-18': 75 }).imageID
      const avatar = `http://192.168.43.194:8000/media/avatar/avatar.${ imageID }.png`
      const id = UUID.generate()
      const share = Mock.mock({ 'share|306-1735': 777 }).share
      const commentNumber =  Mock.mock({ 'commentNumber|26-1283': 777 }).commentNumber
      const zan =  Mock.mock({ 'zan|828-23000': 777 }).zan
      const authentication = Mock.mock({ 'authentication|1': ['蓝v认证', '黄v认证', '金v认证'] })
        .authentication
      const temp = Mock.mock({
        'emotion|1': store.state.weibo.emotionsArray
      })
      const emotion = temp.emotion.value
      const weibo = Mock.mock({
        id,
        content: cparagraph + emotion,
        share,
        commentNumber,
        zan,
        user: {
          avatar,
          nickname,
          authentication
        }
      })
      weiboList.push(weibo)
    }
    return weiboList
  })
  // 批量修改微博归属
  // for (let i = 79; i < 105; i++) {
  //   request({
  //     url: `/api/v1/weibo/${i}/`,
  //     method: 'patch',
  //     data: {
  //       user: 2
  //     }
  //   }).then(res => {
  //     console.log('微博归属修改成功！')
  //   }, () => {
  //     console.log('微博归属修改失败！')
  //   })
  // }
}
