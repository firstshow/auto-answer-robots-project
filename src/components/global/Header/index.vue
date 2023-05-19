<template>
  <header class="x-header-box flex items-center justify-between">
    <div>
      <svg-icon name="IconBack" size="20" />
    </div>
    <div class="flex items-center">
      <svg-icon name="IconLogo" size="32" />
      <span>15968849849</span>
    </div>
  </header>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'XHeader'
  })
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
