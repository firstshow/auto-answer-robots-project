import type { Router } from 'vue-router'
import { getLocalStorage } from '@/hooks'

let userInfo = getLocalStorage('userInfo') || ''

export function createRouterGuards(router: Router, whiteNameList: string[]) {
  router.beforeEach(async (_to, _from, next) => { 
    // 如果是登录页面，并且已经登录，跳转到首页
    if (_to.name == 'login' && userInfo) {
      next({
        path: '/robotList'
      })
      return false
    }
    next()
  })

  router.afterEach((_to) => {
    
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
