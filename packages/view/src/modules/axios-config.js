import axios from 'axios'

axios.defaults.baseURL = 'http://104.199.245.246'
axios.interceptors.response.use(response => response, Promise.reject)

export default {
  install (Vue, Option) {
    Vue.prototype['$axios'] = axios
  }
}
