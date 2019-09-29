import Vue from 'vue'
import Router from 'vue-router'
import {ZolRouter} from './module/zol'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'sourceBoard',
      component: () => import('@/views/index.vue'),
      children: [
        ...[
          {
            path: '/sourceboard',
            name: 'sourceBoard',
            component: () => import('@/views/sourceBoard/index.vue')
          },
          {
            path: '/zolwallpaper',
            name: 'zolWallpaper',
            component: () => import('@/views/zolWallpaper/index.vue')
          }
        ],
        ...ZolRouter
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})
