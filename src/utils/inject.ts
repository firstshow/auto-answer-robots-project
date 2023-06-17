// @ts-nocheck
import { setSessionStorage } from '@/hooks'
import { REQUEST_ACTION, STORAGE_KEY } from './../constants/common'


export const getCookie = () => {
  document.addEventListener('DOMContentLoaded', function() {
    // V3的写法；获取本地cookies
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = tabs[0].url
      chrome.cookies.getAll({ 
        url
      }, function (cookies) {
        let cookieStr = ''
        for (let i = 0; i < cookies.length; i++) {
          cookieStr += `${cookies[i].name}=${cookies[i].value}; `
        }
        console.log(cookieStr)
        setSessionStorage(STORAGE_KEY.cookie, cookieStr)
      });
    });
  })
}

/**
 * @function 设置cookie
 * @param param0 
 */
export const setCookie = ({
  name,
  value,
}) => {
  // V3的写法；获取本地cookies
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url
    chrome.cookies.set({ 
      url,
      name,
      value
    }, function (cookies) {
      console.log('变更后的cookie', cookies)
    });
  });
}

/**
 * @function 设置cookie
 * @param param0 
 */
export const removeCookie = (name) => {
  // V3的写法；获取本地cookies
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url
    chrome.cookies.set({ 
      url,
      name
    }, function (cookies) {
      console.log('删除成功：cookie', cookies)
    });
  });
}