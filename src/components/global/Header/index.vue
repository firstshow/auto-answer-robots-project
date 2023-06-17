<template>
  <header class="x-header-box flex items-center justify-between">
    <div class="x-back-btn cursor-pointer">
      <svg-icon name="IconBack" size="20" v-if="hasBack" @click="back"/>
    </div>
    <a-dropdown>
        <div class="cursor-pointer flex items-center" @click.prevent>
          <svg-icon name="IconLogo" size="32" />
          <span>{{ filterUsername(username) }}</span>
          <svg-icon class="margin-left-8" name="IconDownArrow" size="12"/>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <div class="flex justify-center items-center" @click="logout">
                <svg-icon name="IconExitLogOut" size="16" />
                <span class="margin-left-8">退出登录</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
  </header>
</template>

<script lang="ts" setup>
  import { getLocalStorage, removeLocalStorage } from '@/hooks/storage'
  import { STORAGE_KEY } from '@/constants/common'
  import { routeReplaceChange } from "@/hooks/routeChange"
  import { ref, onMounted } from 'vue'
  import { ROUTE_MAP } from '@/constants'


  const emit = defineEmits(['back'])

  defineOptions({
    name: 'XHeader'
  })

  defineProps({
    hasBack: {
      type: Boolean,
      default: true
    }
  })

  let username = ref('')

  /**
   * @function back 返回上一页
   */
  const back = () => {
    emit('back')
  }

  /**
   * @function 初始化用户信息
   */
  const initUserInfo = () => {
    const userInfo = JSON.parse(getLocalStorage(STORAGE_KEY.userInfo))
    username.value = userInfo.username
  }

  /**
   * @function logout 过滤手机号
   */
  const filterUsername = (username: string) => {
    return `${username.slice(0, 3)}****${username.slice(-4)}`
  }

  /**
   * @function logout 退出登录
   */
  const logout = () => {
    console.log('退出登录')
    removeLocalStorage(STORAGE_KEY.userInfo)
    setTimeout(() => {
      routeReplaceChange(ROUTE_MAP.Login)
    }, 2000)
  }

  onMounted(()=>{
    initUserInfo()
  })
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
