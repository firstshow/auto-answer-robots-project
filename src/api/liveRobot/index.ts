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
 * @api 启动或重启机器人
 * @param data 
 * @returns 
 */
export function setRobotAlwaysExplainServer(data: API.SetRobotAlwaysExplainParams) {
  return request<API.resResult<string>>({
    url: '/api/ltk/ltkAssistant-api/permanent',
    data,
    method: 'GET',
    noToken: true
  })
}