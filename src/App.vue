<template>
  <div class="x-container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { getCookie } from '@/utils/inject'

  // 时机成熟 回调函数自动执行
  onMounted(() => {
    console.log('App.vue onMounted')
    getCookie()
  })
</script>

<style lang="less" scoped>
.x-container {
  width: 780px;
  background-color: #060716;
  color: #fff;
  box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.6);

  :global(.ant-btn) {
    font-size: 12px !important;
  }
  :global(.ant-form-item-label > label) {
    font-size: 12px !important;
  }
  :global(.ant-input) {
    font-size: 12px !important;
  }
  :global(.ant-list) {
    font-size: 12px !important;
  }
  :global(.ant-dropdown-menu-item) {
    font-size: 12px !important;
  }
  :global(.ant-table) {
      font-size: 12px !important;
      background-color: transparent !important;
  }
  :global(.ant-table-thead > tr > th) {
      background-color: #20222F !important;
  }
  :global(.ant-table-thead > tr > th) {
      background-color: #20222F !important;
  }
  :global(.ant-table-cell-fix-left) {
      background-color: @theme-back-color !important;
  }
  :global(.ant-table-cell-fix-right) {
      background-color: @theme-back-color !important;
  }
  :global(.ant-form-item-explain) {
    font-size: 12px !important;
  }
  :global(.ant-message) {
    font-size: 12px !important;
  }
  :global(.ant-message .anticon) {
    top: -2px;
  }
}
</style>
