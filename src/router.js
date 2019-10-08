import Vue from 'vue'
import Router from 'vue-router'
import Faq from '@/views/Faq.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/faq',
      component: Faq,
    },
    {
      path: '/faq/:subjectId',
      name: 'faq',
      component: Faq,
    },
    {
      path: '*',
      redirect: '/faq'
    },
  ]
})
