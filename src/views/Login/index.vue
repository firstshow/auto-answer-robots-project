<template>
  <root-page class="x-login-page-box flex flex-col items-center">
    <svg-icon name="IconLogo" size="100" />
    <a-form class="x-login-form" :rules="rules" :label-col="{ span: 5 }" :model="formState" @finish="login">
      <a-form-item label="手机号" name="phone">
        <a-input placeholder="请输入手机号" v-model:value="formState.phone" maxlength="11" />
      </a-form-item>
      <a-form-item label="授权码" name="code">
        <a-input placeholder="请输入授权码" v-model:value="formState.code" />
      </a-form-item>
      <a-form-item class="x-login-btn">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
    
    <p class="x-tips">新用户注册或老用户续费，请联系<span class="x-tel">15858267346</span></p>
  </root-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { routeReplaceChange } from "@/hooks/routeChange"
import { loginServer } from '@/api'
import { validatePhone, validateCode, setLocalStorage } from '@/hooks'
import { message } from 'ant-design-vue'

  const formState = reactive({
    phone: '15968849894',
    code: 'UYVRYDX8'
  })
  
  /**
   * 表单验证规则
   */
  const rules = {
    phone: [{ required: true, validator: validatePhone, message: '请输入手机号'}],
    code: [{ required: true, validator: validateCode, message: '请输入授权码' }]
  }

  const login = async () => {
    try {
      let resData = await loginServer({
        phone: formState.phone,
        code: formState.code,
        scenario: 'authCodeLogin' // 固定写死
      })
      // 存储用户信息
      setLocalStorage('userInfo', resData.result)
      message.info(`登录成功`)
      routeReplaceChange('robotList')
    } catch (error) {
      message.info(`登录失败，${error.message}`)
      console.log('登录失败', error)
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>