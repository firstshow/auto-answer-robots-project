// @ts-nocheck
console.log('contentScripts js', document.cookie)
const cookie = document.cookie
import { REQUEST_ACTION } from './../constants/common'

setTimeout(() => {
    console.log(cookie)
    chrome.runtime.sendMessage({ 
        action: REQUEST_ACTION.getCookie,
        cookie
    })
},3000)

export {}