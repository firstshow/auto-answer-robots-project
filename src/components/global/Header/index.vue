<template>
  <header class="x-header-box flex items-center justify-between">
    <div class="x-back-btn cursor-pointer">
      <svg-icon name="IconBack" size="20" v-if="hasBack" @click="back"/>
    </div>
    <div class="flex items-center">
      <svg-icon name="IconLogo" size="32" />
      <span>{{ filterPhone(phone) }}</span>
    </div>
  </header>
</template>

<script lang="ts" setup>
  import { routeGoBack} from '@/hooks'
  import { getLocalStorage } from '@/hooks/storage'
  import { STORAGE_KEY } from '@/constants/common'
  import { ref, onMounted } from 'vue'

  defineOptions({
    name: 'XHeader'
  })
  defineProps({
    hasBack: {
      type: Boolean,
      default: true
    }
  })

  let phone = ref('')

  /**
   * @function back 返回上一页
   */
  const back = () => {
    routeGoBack(-1)
  }

  /**
   * @function 初始化用户信息
   */
  const initUserInfo = () => {
    const userInfo = JSON.parse(getLocalStorage(STORAGE_KEY.userInfo))
    phone.value = userInfo.phone
  }

  const filterPhone = (phone: string) => {
    return `${phone.slice(0, 3)}****${phone.slice(-4)}`
  }

  onMounted(()=>{
    initUserInfo()
  })
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
