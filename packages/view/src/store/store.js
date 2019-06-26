import Vue from 'vue'
import Vuex from 'vuex'
import accountInfo from './modules/account-info'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    accountInfo
  }
})

export default store