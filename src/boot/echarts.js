import echarts from 'echarts'
export default async ({ app, router, Vue }) => {
  Vue.prototype.$echarts = echarts
}
