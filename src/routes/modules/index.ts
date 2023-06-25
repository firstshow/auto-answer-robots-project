import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/robotList',
    name: 'robotList',
    component: () => import('@/views/RobotList/index.vue'),
    meta: {
      title: ''
    }
  },
  {
    path: '/createRobot',
    name: 'createRobot',
    component: () => import('@/views/RobotList/CreateRobot/index.vue'),
    meta: {
      title: ''
    }
  },
  {
    path: '/robotDataStatistics',
    name: 'robotDataStatistics',
    component: () => import('@/views/RobotList/RobotDataStatistics/index.vue'),
    meta: {
      title: ''
    }
  },
  {
    path: '/productManage',
    name: 'productManage',
    component: () => import('@/views/RobotList/ProductManage/index.vue'),
    meta: {
      title: ''
    }
  }
]

export default routes
