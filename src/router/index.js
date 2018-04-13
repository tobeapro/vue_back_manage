import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import layout from '@/components/layout'
import notFound from '@/components/notFound'
import home from '@/components/home'
import personalInfo from '@/components/personalInfo'
import articleManage from '@/components/articleManage'
import newArticle from '@/components/newArticle'
import articleDetail from '@/components/articleDetail'
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
        },
        {
          path: '/newArticle',
          name: 'newArticle',
          component: newArticle,
          meta: {
            group: 'articleManage'
          }
        },
        {
          path: '/articleDetail/:id',
          name: 'articleDetail',
          component: articleDetail,
          meta: {
            group: 'articleManage'
          }
        }
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: notFound
    }
  ]
})
