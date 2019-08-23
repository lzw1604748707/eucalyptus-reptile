import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'sourceBoard',
      component: () => import('./views/index.vue'),
      children: [
        {
          path: '/',
          name: 'sourceBoard',
          component: () => import('./views/sourceBoard/index.vue')
        },
        {
          path: '/zolwallpaper',
          name: 'zolWallpaper',
          component: () => import('./views/zolWallpaper/index.vue')
        }
      ]
    }
  ]
})
