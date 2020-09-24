import axios from 'axios'
import { getToken } from 'src/utils/token'

const request = axios.create({
  // 本机
  baseURL: 'http://127.0.0.1:8000',
  // 手机
  // baseURL: 'http://192.168.43.194:8000/',
  // baseURL: 'http://3437281891.pythonanywhere.com',
  timeout: 6000
})
const officialRequest = axios.create({
  baseURL: 'https://api.weibo.com/',
  timeout: 6000
})
request.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    if (!config.params) {
      config.params = {}
    }
    config.params.token = token
  } else {
    if (!config.params) {
      config.params = {}
    }
    config.params.token = null
  }
  return config
})
request.interceptors.response.use(res => {
  // res.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, UPDATE, PUT, DELETE'
  return res
})
export { request, officialRequest }
