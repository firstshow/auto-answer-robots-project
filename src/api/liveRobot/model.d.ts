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
   * @type 新增机器人接口入参 
   */
   type AddRobotParams = {
    id?: string // 机器人id
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

  /**
   * @type 获取机器人列表接口入参
   */
  type GetRobotListParams = {
    pageNo: number // 页码
    pageSize: number // 每页条数
  }

  /**
   * @type 获取机器人列表接口出参
   */
  type GetRobotListRes = {
    countId: number
    current: number
    hitCount: boolean
    maxLimit: number
    optimizeCountSql: boolean
    orders: any[]
    pages: number
    records: RobotList[]
    searchCount: number
    size: number
    total: number
  }

  type RobotList = {
    id: string // id
    anchorName?: string // 抖音昵称
    roomId: string // 直播间id
    createTime: string // 创建时间
    updateTime: string // 更新时间
    name: string // 机器人名称
    storeName: string // 店铺名称
    status: number // 机器人状态
    statusText: string // 机器人状态文案
  }

  /**
   * @type 启动或重启机器人接口入参
   */
  type StartOrRestartRobotParams = {
    id: string // 机器人id
    cookie: string // 抖音登录cookie
  }

  /**
   * @type 暂停机器人接口入参
   */
  type StopRobotParams = {
    id: string // 机器人id
  }

  /**
   * @type 获取机器人详情接口入参
   */
   type GetRobotDetailParams = {
    id: string // 机器人id
   }
  /**
     * @type 删除机器人详情接口入参
     */
  type DeleteRobotParams = {
    id: string // 机器人id
  }

   /**
    * @type 获取机器人详情接口出参
    */
   type GetRobotDetailRes = AddRobotParams & {
    createTime: string // 创建时间
    updateTime: string // 更新时间
   }

   /**
    * @type 获取机器人详情接口出参
    */
   type SetRobotAlwaysExplainParams = {
    open: number // 创建时间
    id: number // 更新时间
   }
}

