<template>
  <div class="root-page" :class="{ 'auto-height': autoHeight }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'RootPage'
  })
  defineProps({
    autoHeight: {
      type: Boolean,
      default: false
    }
  })
</script>
<style lang="less">
  .root-page {
    &.auto-height {
      height: auto;
      min-height: 100vh;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
