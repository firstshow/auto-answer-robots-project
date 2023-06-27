<template>
  <div class="root-page">
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
    min-height: 600px;
    padding: 0 16px;
  }
</style>
