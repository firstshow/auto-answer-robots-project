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
   * @type 检核激活码是否正确入参
   */
  type checkCodeParams = {
    code: string
  }

   /**
   * @type 检核激活码是否正确入参
   */
   type renewRobotParams = {
    id: string
    code: string
  }

  /**
   * @type 获取直播间信息接口入参
   */
  type GetRoomInfoParams = {
    id: string
  }

  /**
   * @type 获取直播间直播数据接口入参
   */
  type GetRoomDataStatisticsParams = {
    id: string
  }
 
   /**
   * @type 新增机器人接口入参 
   */
   type AddRobotParams = {
    id?: string // 机器人id
    code: string // 机器人激活码
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
    open: number // 0关，1开
    cardId: string // 商品ID
    assistantId: string // 小助手ID
   }

    /**
    * @type 直播间信息
    */
   type RoomInfoData = {
    data: RoomInfo
   }

   /**
    * @type 直播间信息
    */
   type RoomInfo = {
    cover: string // 头像
    nickname: string // 更新时间
    title: string // 直播间标题
    duration: number // 直播时长
    create_time: number // 直播开始时间
   }

   /**
    * @type 直播间数据统计
    */
   type RoomDataStatisticsData = {
    data: RoomDataStatistics[]
  }

  /**
    * @type 直播间数据统计
    */
  type RoomDataStatistics = {
    key: string // key
    name: string // 标题栏
    raw_value: string // 金额分
    unit: number // 单位
    value: number // 金额
   }

  /**
    * @type 获取直播间商品列表
    */
   type GetProductListParams = {
     assistantId: string // 小助手ID
   }

   /**
    * @type 获取直播间商品列表
    */
   type GetProductListData = {
    card_list: {
      seckill_loop: boolean // 是否秒杀
      card_id: string // 商品ID
      card_data: string // 商品信息
      component_id: string // 商品ID
      permanent_open: number // 是否开启讲解 1开启，0关闭
    }[]
   }

   /**
    * @type 直播间讲解商品
    */
   type OpenOrNotExplainParams = {
    assistantId: string // 商品ID
    cardId: string // 商品ID
    operation: number // 3讲解，4取消讲解
   }

    /**
    * @type 获取秒杀信息入参
    */
   type GetFlashKillingInfoParams = {
    assignRecordId: string // 商品ID
    assistantId: string // 助手ID
    couponId: string // 秒杀活动ID
   }

    /**
    * @type 获取秒杀信息
    */
   type GetFlashKillingInfoData = {
    left_stock: string // 剩余库存
   }

   /**
    * @type 设置秒杀
    */
   type SetFlashKillingParams = {
    buyLimit: number // 购买限制
    duration: number // 秒杀时长
    id: string // 商品ID
    loop: number // 循环次数
    stock: number // 库存
   }

   /**
    * @type 上下架入参
    */
   type OffShelfParams = {
    assignRecordId: string // recordId
    assistantId: number // 助手ID
    couponId: string // 秒杀活动ID
   }

   type GetFlashKillingConfigParams = {
    assistantId: string // 助手ID
    grouponIds: string // 拼团ID
   }

   type GetFlashKillingConfigData = {
    groupon_has_flash_sale: string[] // 有秒杀商品ID列表
    groupon_url_map: {
      [string]: string
    }
   }

   /**
    * @type 获取文本控制入参
    */
   type GetTextControlDetailParams = {
    id: string // 助手ID
   }

   /**
    * @type 获取文本控制出参
    */
   type GetTextControlDetailData = {
    id: string
    contentList: [],
    textControlOpen: number
    textFrequency: string
    textOrder: string
  }

  /**
   * @type 设置文本控制入参
   */
  type SetTextControlDetailParams = {
    id: string
    contentList: any[],
    textControlOpen: number
    textFrequency: string
    textOrder: string
  }
}

