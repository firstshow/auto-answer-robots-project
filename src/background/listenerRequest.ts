// @ts-nocheck
import { REQUEST_ACTION } from './../constants/common'
let cookie = ''
let hasSend = false

/**
 * @function 从接口请求的header中获取到的cookie
 * @param details 
 */
export const getCookie = (details) => {
    // 获取当前接口中的header请求头中的cookie信息
    if (details.url.indexOf('https://eos.douyin.com/data/life/live/user/info/v1/') > -1) {    
        // 循环获取headers中的key，找到cookie，找到后存储到sessionStorage中
        for (let i = 0; i < details.requestHeaders.length; i++) {
            if (details.requestHeaders[i].name.toLowerCase() === 'cookie') {
                cookie = details.requestHeaders[i].value
                break
            }
        }
    }
    // 如果已经发送，并且cookie已经存储，则不再发送
    if (!hasSend && cookie) {
        chrome.runtime.sendMessage({ 
            action: REQUEST_ACTION.setCookie,
            cookie 
        })
        chrome.runtime.onMessage.addListener(function(request) {
            hasSend = true
        })
    }
}