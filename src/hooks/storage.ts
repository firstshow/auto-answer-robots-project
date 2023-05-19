export const setSessionStorage = (key: string, data: any) => {
    let value = typeof data !== 'string' ? JSON.stringify(data) : data
    sessionStorage.setItem(key, value)
}

export const getSessionStorage = (key: string): string => {
    let value: string = sessionStorage.getItem(key)
    return value
}

export const setLocalStorage = (key: string, data: any) => {
    let value = typeof data !== 'string' ? JSON.stringify(data) : data
    localStorage.setItem(key, value)
}


export const getLocalStorage = (key: string): string => {
    let value: string = localStorage.getItem(key)
    return value
}