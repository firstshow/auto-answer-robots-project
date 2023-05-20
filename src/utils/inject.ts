import { setSessionStorage } from '@/hooks'
import { getQuery } from '@/utils/common'
let hasCookie = false
document.addEventListener('DOMContentLoaded', function() {
  // @ts-ignore
  chrome.webRequest.onSendHeaders.addListener((details) => {
      // 如果已经存在cookie，则拦截
      if (hasCookie) {
        return {cancel: false}
      }
      // 获取请求链接的参数
      let query: any = getQuery(details.url)

      // 拦截https://eos.douyin.com/data/life/live/comment/im_list的接口的header，因为里面有cookie
      if (details.url.indexOf('https://eos.douyin.com/data/life/live/comment/im_list') > -1) {    
        // 循环获取headers中的key，找到cookie，找到后存储到sessionStorage中
        for (let i = 0; i < details.requestHeaders.length; i++) {
          if (details.requestHeaders[i].name.toLowerCase() === 'cookie') {
            setSessionStorage('cookie', details.requestHeaders[i].value)
            setSessionStorage('roomId', query.room_id)
            console.log('拦截到的cookies：', details.requestHeaders[i])
            hasCookie = true
            break
          }
        }
      }
      return  {cancel: true};
    },
    {urls: ['*://*.douyin.com/*']},
    ['requestHeaders', 'extraHeaders']
  )
})

export {}