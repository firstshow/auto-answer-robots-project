// @ts-nocheck
import { setSessionStorage } from '@/hooks'
import { REQUEST_ACTION, STORAGE_KEY } from './../constants/common'

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(function(tab) {
    chrome.cookies.getAll(
      {
        url: 'https://eos.douyin.com',
      },
      function(cookies) {
        let cookieStr = ''
        for (let i = 0; i < cookies.length; i++) {
          cookieStr += `${cookies[i].name}=${cookies[i].value}; `
        }
        console.log(cookieStr)
        setSessionStorage(STORAGE_KEY.cookie, cookieStr)
      }
    );
  })
})
export {}