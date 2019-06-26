import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/store'
import MuseUI from 'muse-ui'
import { Modal } from 'iview'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import axios from 'axios'
import axiosConfig from '@/modules/axios-config'
import util from '@/modules/util'
import { ErrorText } from '@/modules/message-text'

import 'muse-ui/dist/muse-ui.css'
import 'iview/dist/styles/iview.css'

util.registerArrayLast()
util.registerArrayFirst()

// 關閉 vue instance 產生時的提示
Vue.config.productionTip = false
Vue.use(MuseUI)
Vue.use(axiosConfig)

dayjs.locale('zh-tw')
Vue.prototype.$dayjs = dayjs
Vue.prototype.$delay = millisecond => {
  return new Promise(
    resolve => {
      setTimeout(resolve, millisecond)
    }
  )
}

Vue.prototype.$modal = {
  show ({
          title = '',
          text = '',
          width = '350px',
          okText = '了解',
          onOk = () => {},
          render = null
        } = {}) {
    const config = {
      title: title,
      content: `<h2 style='color: #652707; margin-left: -30px'>${text}</h2>`,
      width: width,
      okText: okText,
      onOk: onOk
    }

    if (render) {
      config.render = render
    }

    Modal.info(config)
  },

  remove () {
    Modal.remove()
  }
}

Vue.config.errorHandler = (error, vueModel) => {
  console.error(error)
  vueModel.$modal.show({
    text: ErrorText.EXCEPTION
  })
}

const checkToken = async () => {
  let response
  try {
    response = axios.post('http://localhost:8080/api/checkSession')
  } catch (error) {
    console.error(error)
  }
  return (response && response.data)
}

// router.beforeEach(async (to, from, next) => {
//   const isSkipCheckSession = to.matched.some(route => route.meta.isSkipCheckSession)
//   const isSessionExisted = await checkSession()
//   if (isSkipCheckSession || isSessionExisted) {
//     next()
//   } else {
//     next('/auth')
//   }
// })

new Vue({
  router,
  store,
  render: createElement => createElement(App)
}).$mount('#app')
