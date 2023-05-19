import { request } from '@/utils/http'

/**
 * @api 获取类目列表
 */
export function addRobotServer(data: API.AddRobotParams) {
  return request<API.resResult<string[]>>({
    url: '/api/ltk/ltkAssistant-api/add',
    data,
    method: 'POST',
    noToken: true
  })
}
