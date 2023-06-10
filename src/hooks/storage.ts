/**
 * @description: setSessionStorage 封装
 */
export const setSessionStorage = (key: string, data: any) => {
    let value = typeof data !== 'string' ? JSON.stringify(data) : data
    sessionStorage.setItem(key, value)
}
/**
 * @description: getSessionStorage 封装
 */
export const getSessionStorage = (key: string): string => {
    let value: string = sessionStorage.getItem(key)
    return value
}
/**
 * @description: setLocalStorage 封装
 */
export const setLocalStorage = (key: string, data: any) => {
    let value = typeof data !== 'string' ? JSON.stringify(data) : data
    localStorage.setItem(key, value)
}

/**
 * @description: getLocalStorage 封装
 */
export const getLocalStorage = (key: string): string => {
    let value: string = localStorage.getItem(key)
    return value
}

/**
 * @description: removeLocalStorage 封装
 */
export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key)
}