import { getCookie } from './listenerRequest'

/** @internal
 * @function 监听请求头，获取cookie等信息
 */
// @ts-ignore
chrome.webRequest.onSendHeaders.addListener((details) => {
  getCookie(details)
  
  return  {cancel: true};
},
{
  urls: ['*://*.douyin.com/*']
},
['requestHeaders', 'extraHeaders']
)

export {}