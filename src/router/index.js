import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import layout from '@/components/layout'
import home from '@/components/home'
import personalInfo from '@/components/personalInfo'
import articleManage from '@/components/articleManage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path: '/personalInfo',
          name: 'personalInfo',
          component: personalInfo
        },
        {
          path: '/articleManage',
          name: 'articleManage',
          component: articleManage
        }
      ]
    }
  ]
})
