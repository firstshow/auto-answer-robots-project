<template>
  <root-page class="x-home-page-box flex flex-col items-center">
    <x-header/>
    <div class="x-table-box">
      <div class="x-table-header flex items-center justify-between">
        <span>小助手列表</span>
        <a-button type="primary" @click="createRobot">创建</a-button>
      </div>
      <a-table :columns="columns" :data-source="data">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span>
             姓名
            </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <span> {{ record.name }}</span>
          </template>
          <template v-else-if="column.key === 'status'">
            <div class="flex items-center">
              <svg-icon :name="ROBOT_STATUS[record.status].icon" size="20" />
              <span :class="['x-start-status', ROBOT_STATUS[record.status].className]">
                {{ ROBOT_STATUS[record.status].status }}
              </span>
            </div>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a class="x-action-btn">{{ ROBOT_STATUS[record.status].btnText }}</a>
              <a-divider type="vertical"/>
              <a class="x-action-btn">修改</a>
              <a-divider type="vertical" />
              <a class="x-action-btn">删除</a>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </root-page>
</template>

<script setup lang="ts">
  import XHeader from '@/components/global/Header/index.vue'
  import { routeReplaceChange } from "@/hooks/routeChange";

  const columns = [
  {
    name: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '门店',
    dataIndex: 'store',
    key: 'store',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const data = [
  {
    key: '1',
    name: '小宝',
    store: 'John Brown',
    createTime: '2023-02-02 12:00:00',
    updateTime: '2023-02-02 12:00:00',
    status: 'exception',
  },
  {
    key: '2',
    name: '小宝',
    store: 'John Brown',
    createTime: '2023-02-02 12:00:00',
    updateTime: '2023-02-02 12:00:00',
    status: 'stop',
  },
  {
    key: '3',
    name: '小宝',
    store: 'John Brown',
    createTime: '2023-02-02 12:00:00',
    updateTime: '2023-02-02 12:00:00',
    status: 'inUse',
  },
  {
    key: '4',
    name: '小宝',
    store: 'John Brown',
    createTime: '2023-02-02 12:00:00',
    updateTime: '2023-02-02 12:00:00',
    status: 'waitUse',
  }
]

// 机器人状态
const ROBOT_STATUS = {
  stop: {
    icon: 'IconStopStatus',
    className: '-no-start',
    status: '未启动',
    btnText: '启动'
  },
  waitUse: {
    icon: 'IconWaitUse',
    className: '-wait-start',
    status: '暂停',
    btnText: '重启'
  },
  inUse: {
    icon: 'IconInUse',
    className: '-starting',
    status: '启动中',
    btnText: '暂停'
  },
  exception: {
    icon: 'IconException',
    className: '-error',
    status: '异常中',
    btnText: '重启'
  }
}

 type ListDataSource = {
    name: string
    storeName: string,
    createTime: string,
    updateTime: string,
    // status: number
  }

  // const step = 1

defineProps({
  dataSource: {
    type: Array as () => {}[],
    default: () => [] as ListDataSource[],
  },
})

/**
 * @function createRobot 创建机器人
 */
const createRobot = () => {
  console.log('createRobot')
  routeReplaceChange('createRobot')

}
</script>
<style lang="less" scoped>
  @import './index.less';
</style>