let cookie = ''
let hasSend = false

/**
 * @function 从接口请求的header中获取到的cookie
 * @param details 
 */
export const getCookie = (details) => {
    if (details.url.indexOf('https://eos.douyin.com/data/life/live/user/info/v1/') > -1) {    
        // 循环获取headers中的key，找到cookie，找到后存储到sessionStorage中
        for (let i = 0; i < details.requestHeaders.length; i++) {
        if (details.requestHeaders[i].name.toLowerCase() === 'cookie') {
            cookie = details.requestHeaders[i].value
            break
        }
        }
    }

    if (!hasSend && cookie) {
        // @ts-ignore
        chrome.runtime.sendMessage({ cookie }, (res) => {
            console.log(`获取到的cookie：111,${hasSend}, ${cookie}`)
        });
        // @ts-ignore
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            hasSend = true
            console.log(`接收成功的消息：${hasSend},${JSON.stringify(request)},${JSON.stringify(sender)}, ${JSON.stringify(sendResponse)}, ${hasSend}, ${(new Date()).getTime()}`)
        });
    }
}