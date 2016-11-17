import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import routes from './routes'
import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

Vue.mixin({
  methods: {
    post (url, data, options) {
      return this.$http.post(url, data, {headers: {'Authorization': 'token test'}, ...options})
    }
  }
})
Vue.http.options.root = 'http://localhost:8080'
Vue.http.options.emulateJSON = true

const router = new VueRouter({ routes })

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store: new Vuex.Store(store),
  template: '<App/>',
  components: { App }
})

const statusMap = {
  0: 'checkout the internet connect',
  404: 'this request is not exists',
  500: 'server error'
}

Vue.http.interceptors.push((request, next) => {
  next(response => {
    if (response.ok) {
      let result = response.data
      if (result.success) {
        response.data = result.data
      } else {
        app.$message.error(result.code + ':' + result.msg)
        response.ok = false
      }
    } else {
      let status = response.status
      app.$message.error(statusMap[status] || 'unknow error')
      console.log(response)
    }
  })
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    app.$router.replace({ name: 'no-page', params: {message: to.path} })
  }
  next()
})
