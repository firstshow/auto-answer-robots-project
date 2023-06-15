export const splitMoney = (money: number) => {
    // 千分号分割
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}