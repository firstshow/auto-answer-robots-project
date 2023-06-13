import { checkCodeServer } from '@/api'

const REG = {
    phone: /^1[3456789]\d{9}$/,
    password: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/
}

export const validatePhone = (rule: any, value: string) => {
    if (!value) {
        return Promise.reject('请输入手机号')
    } else if (!REG.phone.test(value)) {
        return Promise.reject('请输入正确的手机号')
    } else {
        return Promise.resolve()
    }
}

export const validateCode = async (rule: any, value: string) => {
    if (!value) {
        return Promise.reject('请输入激活码')
    } else if (!/^\w{8}$/.test(value)) {
        return Promise.reject('请输入正确的激活码')
    } else {
        try {
            await checkCodeServer({
                code: value
            })
            return Promise.resolve('有效的激活码')
        } catch (error) {
            return Promise.reject('请输入有效的激活码')
        }
    }
}

export const validatePassword = (rule: any, value: string) => {
    if (!value) {
        return Promise.reject('请输入密码')
    } else if (!REG.password.test(value)) {
        return Promise.reject('密码必须包含大小写字母、数字、特殊字符，且长度为6-16位')
    } else {
        return Promise.resolve()
    }
}