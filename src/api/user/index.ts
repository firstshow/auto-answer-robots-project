import { request } from '@/utils/http'

/**
 * @api 登录
 */
export function loginServer(data: API.LoginParams) {
  return request<API.resResult<API.LoginRes>>({
    url: '/api/module/default/member/portal/nl/user-api/login',
    data,
    noToken: true
  })
}
