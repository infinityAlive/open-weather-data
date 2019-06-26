import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/Auth.vue'),
      meta: {
        isSkipCheckSession: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
      meta: {
        isSkipCheckSession: true
      }
    },
    {
      path: '/weather',
      name: 'Weather',
      component: () => import('@/views/Weather.vue')
    }
  ]
})
