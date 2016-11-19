import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './routes'
import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.mixin({
  methods: {
    post (url, data, options) {
      return this.$http.post(url, data, {headers: {'Authorization': store.state.token}, ...options})
    }
  }
})
Vue.http.options.root = 'http://localhost:8080'
Vue.http.options.emulateJSON = true

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    router.replace({ name: 'no-page', params: {message: to.path} })
    next()
  } else if (to.meta.authorization !== false && store.state.isLogin === false) {
    let load = ElementUI.LoadingService({text: 'loading'})
    store.dispatch('login')
    .then((user) => {
      load.close()
      next()
    })
    .catch(() => {
      router.replace({name: 'login', query: {redirect: to.fullPath}})
      load.close()
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})

const statusMap = {
  0: 'Cannot connect to server',
  404: 'request does not exist',
  500: 'server exception'
}

Vue.http.interceptors.push((request, next) => {
  next(response => {
    if (response.ok) {
      let result = response.data
      if (result.success) {
        response.data = result.data
      } else {
        app.$message.error(result.msg)
        response.ok = false
      }
    } else {
      let status = response.status
      switch (status) {
        case 401:
          app.$message.error('login expired, please re-login')
          router.replace({name: 'login', query: {redirect: app.$route.fullPath}})
          break
        default:
          app.$message.error(statusMap[status] || response.body)
          break
      }
    }
  })
})
