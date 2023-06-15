<template>
  <root-page class="x-login-page-box flex flex-col items-center">
    <svg-icon name="IconLogo" size="100" />
    <a-form class="x-login-form" :rules="rules" :label-col="{ span: 6 }" :model="formState" @finish="login">
      <a-form-item label="手机号" name="username">
        <a-input placeholder="请输入手机号" v-model:value="formState.username" :maxlength="11" />
      </a-form-item>
      <a-form-item label="密&nbsp;&nbsp;&nbsp;码" name="password">
        <a-input-password placeholder="请输入密码" type="password" v-model:value="formState.password" />
      </a-form-item>
      <a-form-item class="x-login-btn">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
    
    <p class="x-tips">欢迎使用小海豚，很荣幸为您服务</p>
  </root-page>
</template>

<script setup lang="ts">
import { reactive, createVNode, h } from 'vue'
import { routeReplaceChange } from "@/hooks/routeChange"
import { loginServer, registerServer } from '@/api'
import { validatePhone, validatePassword, setLocalStorage } from '@/hooks'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import { STORAGE_KEY, ROUTE_MAP } from '@/constants'

  const formState = reactive({
    username: '',
    password: ''
  })
  
  /**
   * 表单验证规则
   */
  const rules = {
    username: [{ required: true, validator: validatePhone }],
    password: [{ required: true, validator: validatePassword }]
  }
  

  /**
   * @function handleNewUser 处理新用户注册
   */
  const handleNewUser = () => {
    Modal.confirm({
      title: '提示',
      icon: createVNode(ExclamationCircleOutlined),
      content: h('div', {}, [
          h('p', '该用户不存在, 是否根据当前输入的用户名和密码注册新用户? 注：请妥善保管好你的密码，目前无法提供找回密码的通道。')
        ]),
      okText: '确定',
      cancelText: '取消',
      onOk() {
        register()
      },
      onCancel() {
      }
    })
  }

  /**
   * 注册
   */
   const register = async () => {
    try {
      let resData = await registerServer({
        username: formState.username,
        password: formState.password,
        scenario: 'defaultRegister' // 注册场景
      })
      handleLoginSuccess(resData)
    } catch (error) {
      message.info(`注册且登录失败，${error.message}`)
    }
  }

  /**
   * 登录
   */
  const login = async () => {
    try {
      let resData = await loginServer({
        username: formState.username,
        password: formState.password,
        scenario: 'defaultLogin' // 登录场景
      })
      handleLoginSuccess(resData)
    } catch (error) {
      if (error.message === '用户不存在') {
        handleNewUser()
      } else {
        message.info(`登录失败，${error.message}`)
        console.log('登录失败', error)
      } 
    }
  }

  /**
   * @function handleLoginSuccess 登录成功处理
   * @param resData 返回的登录信息
   */
  const handleLoginSuccess = (resData) => {
    // 存储用户信息
    setLocalStorage(STORAGE_KEY.userInfo, {
      ...resData.result,
      username: formState.username
    })
    message.info(`登录成功`)
    routeReplaceChange(ROUTE_MAP.RobotList)
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>