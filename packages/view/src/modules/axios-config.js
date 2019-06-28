import axios from 'axios'

axios.defaults.baseURL = 'https://open-weather-data-api.herokuapp.com'
axios.interceptors.response.use(
  response => response,
  error => { return Promise.reject(error) }
)

export default {
  install (Vue, Option) {
    Vue.prototype['$axios'] = axios
  }
}
