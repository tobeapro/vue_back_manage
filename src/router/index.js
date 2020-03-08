import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/components/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/register')
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/components/layout'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/components/home')
        },
        {
          path: '/personalInfo',
          name: 'personalInfo',
          component: () => import('@/components/personalInfo')
        },
        {
          path: '/articleManage',
          name: 'articleManage',
          component: () => import('@/components/articleManage')
        },
        {
          path: '/newArticle',
          name: 'newArticle',
          component: () => import('@/components/newArticle'),
          meta: {
            group: 'articleManage'
          }
        },
        {
          path: '/articleDetail',
          name: 'articleDetail',
          component: () => import('@/components/articleDetail'),
          meta: {
            group: 'articleManage'
          }
        },
        {
          path: '/userManage',
          name: 'userManage',
          component: () => import('@/components/userManage')
        },
        {
          path: '/classifyManage',
          name: 'classifyManage',
          component: () => import('@/components/classifyManage')
        },
        {
          path: '/commentManage',
          name: 'commentManage',
          component: () => import('@/components/commentManage')
        }
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import('@/components/notFound')
    }
  ]
})
