export default {
  namespaced: true,
  state: {
    account: ''
  },

  actions: {
    assignAccountAction ({ commit }, account) {
      commit('assignAccount', account)
    }
  },

  mutations: {
    assignAccount (state, account) {
      state.account = account
    }
  }
}