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
   * @type 套餐商品字段
   */
  type PackageList = {
    index: number
    title: string
    price: string
    description: string
  }

  /**
   * @type 关键词商品字段
   */
  type KeywordList = {
    keyword: string
    reply: string
  }
 
   /**
   * @type 登录接口入参 
   */
   type AddRobotParams = {
    name: string // 机器人名称
    storeName: string // 店铺名称
    storeAddress: string // 店铺地址
    industry: string // 行业
    businessTime: string // 营业时间
    packageList: PackageList[] // 套餐列表
    packageLimit: string // 套餐限制
    keywordList: KeywordList[] // 关键词列表
    note: string // 备注
  }
}

