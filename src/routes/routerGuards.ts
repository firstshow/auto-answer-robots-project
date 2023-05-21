import type { Router } from 'vue-router'
import { getLocalStorage, getSessionStorage, setSessionStorage } from '@/hooks'

let userInfo = getLocalStorage('userInfo') || ''

export function createRouterGuards(router: Router, whiteNameList: string[]) {
  router.beforeEach(async (_to, _from, next) => { 
    const lastRouteName = getSessionStorage('lastRouteName') || ''

    if (lastRouteName) {
      return next({
        name: lastRouteName
      })
    }

    // 如果是登录页面，并且已经登录，跳转到首页
    if (_to.name == 'login' && userInfo) {
      next({
        name: 'robotList'
      })
      return false
    }
    next()
  })

  router.afterEach((_to) => {
    console.log('跳转成功：', _to)
    setSessionStorage('lastRouteName', _to.name)
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
