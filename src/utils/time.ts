/**
 * @function 获取当前时间，返回 yyyy-mm-dd hh:mm:ss
 * @returns 
 */
export const getNowDate = () => {
    let myDate = new Date
    let year = myDate.getFullYear() //获取当前年
    let mon = ('0' + (myDate.getMonth() + 1)).slice(-2) //获取当前月
    let date = ('0' + myDate.getDate()).slice(-2) //获取当前日
    let hours = ('0' + myDate.getHours()).slice(-2) //获取当前小时
    let minutes = ('0' + myDate.getMinutes()).slice(-2) //获取当前分钟
    let seconds = ('0' + myDate.getSeconds()).slice(-2) //获取当前秒
    let now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    return now
}

/**
 * @function 时间戳转时间 yyyy-mm-dd hh:mm:ss
 * @param timestamp 
 * @returns 
 */
export const timestampToTime = (timestamp: number) => {
    timestamp = timestamp ? timestamp : null;
    if (timestamp < 100000000000) {
        timestamp = timestamp * 1000
    }
    let myDate = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000timestamp = timestamp ? timestamp : null;
    let year = myDate.getFullYear() //获取当前年
    let mon = ('0' + (myDate.getMonth() + 1)).slice(-2) //获取当前月
    let date = ('0' + myDate.getDate()).slice(-2) //获取当前日
    let hours = ('0' + myDate.getHours()).slice(-2) //获取当前小时
    let minutes = ('0' + myDate.getMinutes()).slice(-2) //获取当前分钟
    let seconds = ('0' + myDate.getSeconds()).slice(-2) //获取当前秒
    let now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    return now
}

/**
 * @function 时间秒转hh:mm:ss
 * @param val 
 * @returns 
 */
export const showTime = (val) => {
    if(val<60){
        return `00:00:${('0' + val).slice(-2)}`
    }else{
        let min_total = Math.floor(val / 60); // 分钟
        let sec = Math.floor(val % 60); // 余秒
        if(min_total<60){
        return `00:${('0' + min_total).slice(-2)}:${('0' + sec).slice(-2)}`
        }else{
        let hour_total = Math.floor(min_total / 60); // 小时数
        let min = Math.floor(min_total % 60); // 余分钟
        return `${hour_total > 9 ? hour_total : '0' + hour_total}:${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`
        }
    }
}