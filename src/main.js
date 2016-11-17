import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import routes from './routes'
import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'

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
Vue.http.options.root = 'http://localhost:19999/mock'

const router = new VueRouter({ routes })

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    app.$router.replace({ name: 'no-page', params: {message: to.path} })
  }
  next()
})
