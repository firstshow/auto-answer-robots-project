import { createRouter, createWebHashHistory, type RouteLocationNormalized } from 'vue-router'
import { createRouterGuards } from './routerGuards'
import routes from './modules/index'
import type { App } from 'vue'
import { whiteNameList } from '@/constants'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior (_to: RouteLocationNormalized, _from: RouteLocationNormalized, savedPosition) {
    return new Promise((resolve) => {
      // 判断是否返回到上层页面
      if (_to.meta.savedPosition && savedPosition?.top) {
        setTimeout(() => {
          resolve({ left: 0, top: savedPosition?.top || 0 })
        }, 20)
      } else {
        resolve({ left: 0, top: 0 })
      }
    })
  },
  routes
})

export async function setupRouter(app: App) {
  // 创建路由守卫
  createRouterGuards(router, whiteNameList)

  app.use(router)

  // 路由准备就绪后挂载APP实例
  await router.isReady()
}

export default router
