declare namespace API {
  /**
    * @type 全局通过表格查询返回结果-本地生活商品代运营
    */
  type resResult <T = any> = {
    result: T
    code: number
    message: string
    processInstanceId?: number
    success: boolean
    timestamp: number
  }
   /**
   * @type 登录接口入参 
   */
   type LoginParams = {
    username: string // 手机号
    password: string // 授权码
    scenario: string // 场景
  }

  /**
   * @type 登录接口出参
   */
  type LoginRes = {
    phone?: string // 手机号
    isLogin: boolean // 是否登录
    loginDevice: string // 登录设备
    loginId: string // 登录id
    loginType: string // 登录类型
    sessionTimeout: string // session超时时间
    tag: string // 标签
    tokenActivityTimeout: number // token活动超时时间
    tokenName: string // token名称
    tokenSessionTimeout: number // token session超时时间
    tokenTimeout: number // token超时时间
    tokenValue: string // token值
  }
}

