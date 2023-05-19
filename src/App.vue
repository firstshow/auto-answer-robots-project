<template>
  <div class="x-container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import 'ant-design-vue/dist/antd.dark.css';
</script>

<style lang="less" scoped>
.x-container {
  width: 800px;
  background-color: #060716;
  color: #fff;
  box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.6);
}
</style>
