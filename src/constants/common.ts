/**
 * @constant 日志地址
 */
export const LOGGER_HOST = 'cn-hangzhou.log.aliyuncs.com'

/**
 * @constant 路由白名单
 */
export const whiteNameList = ['icons', 'error', 'error-404']


/**
 * @constant 需要特殊处理的错误码
 */
export const ERROR_CODE = {
  loginTimeout: '302', // 登陆超时
  hasPendingAdPlan: '5001', // 该广告主有在投广告计划，不允许删除
  hasPendingAdPosition: '5002', // 该流量主有在投广告，不允许删除
  adPartnerShortNameNotOnly: '5003', // 该广告主简称已存在，请重新输入
  flowPartnerShortNameNotOnly: '5004' // 该流量主简称已存在，请重新输入
}

/**
 * @constant 错误处理
 */
export const ERROR_HANDLER = {
  [ERROR_CODE.loginTimeout]: () => {
    // 登录超时
  }
}

/**
 * @constant 获取发布视频的状态
 */
export const VIDEO_STATUS = {
  success: 1, // 返回视频url成功
  wait: 2, // 视频合成中，需要继续轮询
  error: 3 // 当前没有视频
}

/**
 * @constant 获取华为云视频封面的默认参数 t_1/表示从1毫秒处截取 w_540/表示宽度540 h_960/表示高度960 
 */
export const GENERATE_COVER = '?x-oss-process=video/snapshot,t_1,f_jpg,w_540,h_960,m_fast'
/**
 * @constant 页面切换路由
 */
 export const COMMON_JUMP_ROUTE = {
  wxLandingPage: 'wxLandingPage', // 微信落地页
  releaseVideo: 'releaseVideo', // 发布视频页
}
/**
 * @constant 错误处理
 */
export const MOBILE_PLATFORM = {
  ios: 'ios',
  android: 'android',
  windows: 'windows'
}

/**
 * @constant 当前环境
 */
export const CURRENT_EVN = {
  dev: 'dev',
  prod: 'prod'
}

/**
 * @constant 机器人状态
 */
export const ROBOT_STATUS_VAL = {
  waitUse: 'waitUse',  // 未启动
  inUse: 'inUse', // 启动中
  exception: 'exception' // 异常
}


/**
 * @constant 请求拦截的action
 */
export const REQUEST_ACTION = {
  setCookie: 'setCookie',  // 设置cookie
  getCookie: 'getCookie',  // 设置cookie
  receivedCookie: 'receivedCookie' // 接收到了cookie
}


/**
 * @constant 存储缓存的key
 */
export const STORAGE_KEY = {
  cookie: 'cookie',  // 设置cookie
  userInfo: 'userInfo' // 用户信息
}