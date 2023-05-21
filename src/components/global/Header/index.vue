<template>
  <header class="x-header-box flex items-center justify-between">
    <div class="x-back-btn cursor-pointer">
      <svg-icon name="IconBack" size="20" v-if="hasBack" @click="back"/>
    </div>
    <div class="flex items-center">
      <svg-icon name="IconLogo" size="32" />
      <span>15968849849</span>
    </div>
  </header>
</template>

<script lang="ts" setup>
  import { routeGoBack} from '@/hooks'
  defineOptions({
    name: 'XHeader'
  })
  defineProps({
    hasBack: {
      type: Boolean,
      default: true
    }
  })
  /**
   * @function back 返回上一页
   */
  const back = () => {
    routeGoBack(-1)
  }
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
