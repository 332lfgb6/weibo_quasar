// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ Vue }) => {
  // 格式化时间
  Vue.filter('timeFilter', preContent => {
    return preContent
  })
}
