import Vue from 'vue'
import VueRouter from 'vue-router'

// import { getPhoneRoutes } from './phone.routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    // scrollBehavior: () => ({ x: 0, y: 0 }),
    // routes: getPhoneRoutes(store),

    // Leave these as they are and change in quasar.conf.utils instead!
    // quasar.conf.utils -> build -> vueRouterMode
    // quasar.conf.utils -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
