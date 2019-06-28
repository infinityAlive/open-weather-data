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
import { ErrorText, Popup } from '@/modules/message-text'

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
  if (error.response && error.response.data) {
    vueModel.$modal.show({
      text: `${Popup.get(error.response.data)}`
    })
  } else {
    console.error(error)
    vueModel.$modal.show({
      text: ErrorText.EXCEPTION
    })
  }
}

const retrieveAccount = async () => {
  let response
  const token = window.localStorage ? window.localStorage.getItem('token') : ''
  try {
    response = await axios.post('/api/checkToken',
      {
        token: token
      })
    return response.data
  } catch (error) {
    console.error(error)
    return ''
  }
}

router.beforeEach(async (to, from, next) => {
  const isSkipCheckToken = to.matched.some(route => route.meta.isSkipCheckToken)
  if (isSkipCheckToken) {
    next()
  } else {
    const account = await retrieveAccount()
    if (!account) {
      next('/auth')
    } else {
      store.state.accountInfo.account = account
      next()
    }
  }

})

new Vue({
  router,
  store,
  render: createElement => createElement(App)
}).$mount('#app')
