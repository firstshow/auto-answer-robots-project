import { setLocalStorage, getLocalStorage, removeLocalStorage } from "@/hooks/storage"
import { getNowDate } from "@/utils/time"

/**
 * @function 存储进草稿箱
 */
export function setDraft(key: string, val: any): void {
    let draft = {
        value: val,
        setTime: getNowDate()
    }
    setLocalStorage(key, JSON.stringify(draft))
}
  
/**
 * @function 丛草稿箱获取
 */
export function getDraft(key: string) {
    let draft = JSON.parse(getLocalStorage(key))
    return draft
}

/**
 * @function 清空草稿箱
 */
export function clearDraft(key: string): void {
    removeLocalStorage(key)
}
