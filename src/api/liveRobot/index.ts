import { request } from '@/utils/http'

/**
 * @api 获取类目列表
 */
export function getRobotListServer(data: API.GetRobotListParams) {
  return request<API.resResult<API.GetRobotListRes>>({
    url: '/api/ltk/ltkAssistant-api/list',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 新增机器人小助手
 */
export function addRobotServer(data: API.AddRobotParams) {
  return request<API.resResult<string[]>>({
    url: '/api/ltk/ltkAssistant-api/add',
    data,
    method: 'POST',
    noToken: true
  })
}

/**
 * @api 新增机器人小助手
 */
export function checkCodeServer(data: API.checkCodeParams) {
  return request<API.resResult<string[]>>({
    url: '/api/ltk/ltkAssistant-api/checkCode',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 续费机器人小助手
 */
export function renewRobotServer(data: API.renewRobotParams) {
  return request<API.resResult<string[]>>({
    url: '/api/ltk/ltkAssistant-api/renew',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 修改机器人小助手
 */
export function editRobotServer(data: API.AddRobotParams) {
  return request<API.resResult<string[]>>({
    url: '/api/ltk/ltkAssistant-api/edit',
    data,
    method: 'POST',
    noToken: true
  })
}

/**
 * @api 修改机器人小助手
 */
export function deleteRobotServer(data: API.DeleteRobotParams) {
  return request<API.resResult<string[]>>({
    url: '/api/ltk/ltkAssistant-api/delete',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 启动或重启机器人
 * @param data 
 * @returns 
 */
export function startOrRestartRobotServer(data: API.StartOrRestartRobotParams) {
  return request<API.resResult<string[]>>({
    url: '/api/ltk/ltkAssistant-api/startOrRestart',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 启动或重启机器人
 * @param data 
 * @returns 
 */
export function stopRobotServer(data: API.StopRobotParams) {
  return request<API.resResult<string[]>>({
    url: '/api/ltk/ltkAssistant-api/stop',
    data,
    method: 'GET',
    noToken: true
  })
}


export function getRobotDetailServer(data: API.GetRobotDetailParams) {
  return request<API.resResult<API.GetRobotDetailRes>>({
    url: '/api/ltk/ltkAssistant-api/queryById',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 设置讲解常驻
 * @param data 
 * @returns 
 */
export function setRobotAlwaysExplainServer(data: API.SetRobotAlwaysExplainParams) {
  return request<API.resResult<string>>({
    url: '/api/ltk/ltkAssistantGoods-api/permanent',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 取消或开启直播间商品讲解
 * @param data 
 * @returns 
 */
export function setRobotExplainServer(data: API.OpenOrNotExplainParams) {
  return request<API.resResult<API.GetProductListData>>({
    url: '/api/ltk/ltkAssistantGoods-api/GoodsExplainOrNot',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 获取直播间信息
 * @param data 
 * @returns 
 */
export function getRoomInfoServer(data: API.GetRoomInfoParams) {
  return request<API.resResult<API.RoomInfoData>>({
    url: '/api/ltk/ltkAssistant-api/roomInfo',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 获取直播间直播数据
 * @param data 
 * @returns 
 */
export function getRoomDataStatisticsServer(data: API.GetRoomDataStatisticsParams) {
  return request<API.resResult<API.RoomDataStatisticsData>>({
    url: '/api/ltk/ltkAssistant-api/keyIndex',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 获取直播间商品列表
 * @param data 
 * @returns 
 */
export function getProductListServer(data: API.GetProductListParams) {
  return request<API.resResult<API.GetProductListData>>({
    url: '/api/ltk/ltkAssistantGoods-api/goodsList',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 获取秒杀详情
 * @param data 
 * @returns 
 */
export function getFlashKillingInfoServer(data: API.GetFlashKillingInfoParams) {
  return request<API.resResult<API.GetFlashKillingInfoData>>({
    url: '/api/ltk/ltkAssistantGoods-api/seckillDetail',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 秒杀设置
 * @param data 
 * @returns 
 */
export function setFlashKillingServer(data: any) {
  return request<API.resResult<API.GetProductListData>>({
    url: '/api/ltk/ltkAssistantGoods-api/assign',
    data,
    method: 'POST',
    noToken: true
  })
}

/**
 * @api 秒杀设置
 * @param data 
 * @returns 
 */
export function OffShelfServer(data: API.OffShelfParams) {
  return request<API.resResult<API.GetProductListData>>({
    url: '/api/ltk/ltkAssistantGoods-api/assignDisable',
    data,
    method: 'GET',
    noToken: true
  })
}

/**
 * @api 获取秒杀配置
 * @param data 
 * @returns 
 */
export function getFlashKillingConfigServer(data: API.GetFlashKillingConfigParams) {
  return request<API.resResult<API.GetFlashKillingConfigData>>({
    url: '/api/ltk/ltkAssistantGoods-api/flashSaleConfig',
    data,
    method: 'GET',
    noToken: true
  })
}
