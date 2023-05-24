// @ts-nocheck
import { STORAGE_KEY, REQUEST_ACTION } from './../constants/common'

let hasCookie = false

export const setCookie = (val: string) => {
    // 如果本地没有cookie，则设置cookie；这边重复进行设置，直到有cookie为止
    if (!hasCookie) {
        // alert(`11cookie:${cookie}， val:${val}`)
        chrome.runtime.sendMessage({ 
            action: REQUEST_ACTION.setCookie,
            cookie: val
        })
        setTimeout(() => {
            setCookie(val)
        }, 3000)
    }
}

chrome.runtime.onMessage.addListener(function(request) {
    if (request.action === REQUEST_ACTION.receivedCookie) {
        console.log(`已经接收到cookie: ${request.cookie}`)
        hasCookie = true
        chrome.runtime.onMessage.removeListener()
    }
})