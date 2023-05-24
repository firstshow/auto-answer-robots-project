<template>
  <div class="x-container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  // @ts-nocheck
  import { setSessionStorage } from '@/hooks'
  import { REQUEST_ACTION, STORAGE_KEY } from '@/constants'
  import { onMounted } from 'vue'

  const setCookie = () => {
    chrome.runtime.onMessage.addListener(function(request, sender) {
      console.log('页面接收到的信息是：', request, sender)
      if (request.action === REQUEST_ACTION.setCookie) {
        let cookie = request.cookie
        setSessionStorage(STORAGE_KEY.cookie, cookie)
        chrome.runtime.sendMessage({ action: REQUEST_ACTION.receivedCookie, cookie })
      }
    });
  }

  // 时机成熟 回调函数自动执行
  onMounted(() => {
    setCookie()
  })
</script>

<style lang="less" scoped>
.x-container {
  width: 800px;
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
}
</style>
