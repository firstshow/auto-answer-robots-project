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