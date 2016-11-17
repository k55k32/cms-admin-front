import Vue from 'vue'

export default {
  state: {
    user: {},
    isLogin: false,
    token: ''
  },
  mutations: {
    LOGIN (state, user, token) {
      state.user = user
      state.login = true
      state.token = token
    },
    LOGOUT (state) {
      state.login = false
      state.token = ''
    }
  },
  actions: {
    login ({commit}, token) {
      return Vue.http.get('user/' + token).then(({data}) => {
        let user = data
        commit('LOGIN', user, token)
        return user
      })
    }
  }
}
