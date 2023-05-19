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
    phone: '18611111111',
    code: 'BFHREL27'
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
        ticket: 's_v_web_id=f171a865443ab37292d6e219ee4574bc0833fbd4a8a9457548; passport_csrf_token=c6f163c19ac2d63617c53779aac942ca; passport_csrf_token_default=c6f163c19ac2d63617c53779aac942ca; sso_uid_tt=00acce03534929af8476ce8bb79948a0; sso_uid_tt_ss=00acce03534929af8476ce8bb79948a0; toutiao_sso_user=7b576352d471c6fe9514ea8b4ed06c08; toutiao_sso_user_ss=7b576352d471c6fe9514ea8b4ed06c08; sid_ucp_sso_v1=1.0.0-KDRmZDMxYmM2MDQ4YzYzNTZiMzllZWVhZTM0ZGUxOTU5YWE3ZGIwNDQKHQjdo9OSkQIQkbySogYY7zEgDDCmzMDPBTgGQPQHGgJscSIgN2I1NzYzNTJkNDcxYzZmZTk1MTRlYThiNGVkMDZjMDg; ssid_ucp_sso_v1=1.0.0-KDRmZDMxYmM2MDQ4YzYzNTZiMzllZWVhZTM0ZGUxOTU5YWE3ZGIwNDQKHQjdo9OSkQIQkbySogYY7zEgDDCmzMDPBTgGQPQHGgJscSIgN2I1NzYzNTJkNDcxYzZmZTk1MTRlYThiNGVkMDZjMDg; LOGIN_STATUS=1; store-region-src=uid; my_rd=1; __live_version__=%221.1.0.9069%22; pwa2=%221%7C0%22; store-region=cn-zj; x-jupiter-uuid=16841159445215732; csrf_session_id=ca5e8b61ccc8adb0b0ef0e845bffe9a9; gf_part_609533=61; gf_part_609558=50; _tea_utm_cache_4075=undefined; _tea_utm_cache_315365=undefined; ttwid=1%7CNGLdVGxRNRLmGpsDzakth4VxPfPpFLnzeNmLf45yQok%7C1684311490%7C24aa680344dde234903964341501293f41cb3f7b838103c6fd61b2b3a76c0566; d_ticket=ad0520e4aa1603241278da6103ff0ff09a5fb; passport_auth_status=ea019c9ffa0535d6c8ec91c8abbdbcbe%2C8be5afd5aa9495bb976c6b988d0ab443; passport_auth_status_ss=ea019c9ffa0535d6c8ec91c8abbdbcbe%2C8be5afd5aa9495bb976c6b988d0ab443; odin_tt=663d676b0ff0717421b2657e62124f0e7c9544eb7cf28a7f57ccbcab00ae9fb3f5672af21a9e926527e295d89590eb418060658955d006a8fe75715e2f282a72; passport_assist_user=CjzoevMcil2RYh0M3tq6ByQgh3lKQbOn-7SiH_c2uvYfAd1H6Gr4HR_Iyd3QwssgCZEqSa1Vm5cScmOfSckaSAo8W6LKoN0wqOab5SuTjze9LAGEk8aOun1jLThGmiWJeSvme9sWpdC4hDM5bVn5XCjkagSe2PNVvx3ea-PZEKS7sQ0Yia_WVCIBA-8vU7I%3D; n_mh=sP-CDV08lK7ZRk23a9JW16q61G5YHWyC2yt2_TftsSc; sid_guard=db339489e23a04e6c45d7ac31235bfa7%7C1684405712%7C5184000%7CMon%2C+17-Jul-2023+10%3A28%3A32+GMT; uid_tt=8ab3e23465515ae59fbd173cc4037504; uid_tt_ss=8ab3e23465515ae59fbd173cc4037504; sid_tt=db339489e23a04e6c45d7ac31235bfa7; sessionid=db339489e23a04e6c45d7ac31235bfa7; sessionid_ss=db339489e23a04e6c45d7ac31235bfa7; sid_ucp_v1=1.0.0-KDdmM2MzM2JjNDRiOWFlMTlmNWFkNGIwYTI4NTE4MWNlZjI3YmI2NWYKHgi3q9fB3AIQ0PuXowYY5Z8TIAwww7a41AU4B0D0BxoCaGwiIGRiMzM5NDg5ZTIzYTA0ZTZjNDVkN2FjMzEyMzViZmE3; ssid_ucp_v1=1.0.0-KDdmM2MzM2JjNDRiOWFlMTlmNWFkNGIwYTI4NTE4MWNlZjI3YmI2NWYKHgi3q9fB3AIQ0PuXowYY5Z8TIAwww7a41AU4B0D0BxoCaGwiIGRiMzM5NDg5ZTIzYTA0ZTZjNDVkN2FjMzEyMzViZmE3; gftoken=ZGIzMzk0ODllMnwxNjg0NDExMzg2NjB8fDAGBgYGBgY; gd_worker_v2_random_244622=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODUwMjI4MjYsImlhdCI6MTY4NDQxODAyNiwibWF0Y2giOnRydWUsIm5iZiI6MTY4NDQxODAyNiwicGF0aCI6Ii8iLCJwZXJjZW50IjowLjMxMDA4MDI4OTc1NzgxNzc2fQ.teFZJrIe5Kc4g79MwVpAinsvGBK9xauUyelBYTmL1r0; eos_s_token=CkKUIwM4WeYmQ17hAh8kacRi6gog398OK/dLY2gfZd075oCu0P+ZKATrEm1AR9WQecNJYlsRx0bsNFcHwISlDOZ/MXQaSQo8Otaw9EI/wbJMU7iu7U0hKRUYBg+MVguYRyomGOcNDyQZIYbhKfVPhyELM3sETYySTCwYvFKr6fvrSulUEOe6sQ0YweCp5w8iAQOhV2jK; msToken=JgqDNlwaGbuRovpiMbhvzo_V3Z2SjuHO2E2rkWQPbLa8goGF_8EZjQA5X26TVepTZofnP1VCFiMhWV53xLxzj1IXaVPinRWRT6yNH5t8HbuYjNaSRkzTa-U=',
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