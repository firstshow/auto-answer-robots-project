export const validatePhone = (rule: any, value: string) => {
    if (!value) {
        return Promise.reject('请输入手机号')
    } else if (!/^1[3456789]\d{9}$/.test(value)) {
        return Promise.reject('请输入正确的手机号')
    } else {
        return Promise.resolve()
    }
}

export const validateCode = (rule: any, value: string) => {
    if (!value) {
        return Promise.reject('请输入激活码')
    } else if (!/^\w{8}$/.test(value)) {
        return Promise.reject('请输入正确的激活码')
    } else {
        return Promise.resolve()
    }
}