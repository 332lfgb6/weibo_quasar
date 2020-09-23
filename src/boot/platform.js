import { Platform } from 'quasar'
import { getPhoneRoutes } from 'src/router/routes'
import { getComputerRoutes } from 'src/router/computer.routes'
export default async ({ router, store }) => {
  if (Platform.is.mobile) {
    // eslint-disable-next-line
    const phoneReset = import('../css/phone.reset.scss')
    router.addRoutes(getPhoneRoutes(store))
    return
  }

  // 如果平台是电脑
  router.addRoutes(getComputerRoutes(store))
}
