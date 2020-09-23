import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
import weibo from './weibo'
import user from './user'
import emotion from './emotion'
import app from './app'
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      weibo,
      user,
      emotion,
      app
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
