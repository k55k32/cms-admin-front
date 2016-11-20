import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const localStorage = window.localStorage
export default new Vuex.Store({
  state: {
    user: {},
    login: false,
    token: ''
  },
  mutations: {
    LOGIN (state, {user, token}) {
      state.user = user
      state.login = true
      state.token = token
      localStorage.setItem('token', token)
    },
    LOGOUT (state) {
      state.login = false
      state.token = ''
      localStorage.clear()
    }
  },
  actions: {
    login ({commit}, token = localStorage.getItem('token')) {
      return new Promise((resolve, reject) => {
        if (!token) {
          reject('no token')
        } else {
          Vue.http.get('user/' + token).then(({data}) => {
            let user = data
            commit('LOGIN', {user, token})
            resolve(user)
            return user
          }).catch((data) => {
            reject(data)
          })
        }
      })
    }
  }
})
