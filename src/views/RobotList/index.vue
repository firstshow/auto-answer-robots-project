<template>
  <root-page class="x-home-page-box flex flex-col items-center">
    <x-header/>
    <div class="x-table-box">
      <div class="x-table-header flex items-center justify-between">
        <span>小助手列表</span>
        <a-button type="primary" @click="createRobot">创建</a-button>
      </div>
      <a-table class="x-table-body" :columns="columns" :data-source="data.robotList" :scroll="{ x: 1000 }">
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
          <template v-else-if="column.key === 'updateTime'">
            <span> {{ record.updateTime || '- -' }}</span>
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
              <a class="x-action-btn" @click="handleRobot(record.status, record.id)">{{ ROBOT_STATUS[record.status].btnText }}</a>
              <a-divider type="vertical"/>
              <a class="x-action-btn" @click="editRobot(record.id)">修改</a>
              <a-divider type="vertical" />
              <a-popconfirm
                :title="`确定要删除小助手【${record.name}】吗?`"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirm(record.id)"
              >
                <a class="x-action-btn">删除</a>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </root-page>
</template>

<script setup lang="ts">
  import XHeader from '@/components/global/Header/index.vue'
  import { routeChange } from "@/hooks/routeChange"
  import { 
    getRobotListServer, 
    startOrRestartRobotServer, 
    stopRobotServer, 
    deleteRobotServer 
  } from '@/api'
  import { reactive, onMounted } from 'vue'
  import { ROBOT_STATUS_VAL } from '@/constants'
  import { message } from 'ant-design-vue'
import { getSessionStorage } from '@/hooks'

  const columns = [
  {
    name: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 80
  },
  {
    title: '直播间ID',
    dataIndex: 'roomId',
    key: 'roomId',
    width: 120
  },
  {
    title: '门店',
    dataIndex: 'storeName',
    key: 'storeName',
    width: 150
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 150
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 150
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 120
  },
]

// 机器人状态
const ROBOT_STATUS = {
  [ROBOT_STATUS_VAL.waitUse]: {
    icon: 'IconStop',
    className: '-no-start',
    status: '未启动',
    btnText: '启动'
  },
  [ROBOT_STATUS_VAL.inUse]: {
    icon: 'IconInUse',
    className: '-starting',
    status: '启动中',
    btnText: '暂停'
  },
  [ROBOT_STATUS_VAL.exception]: {
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

  const data = reactive({
    reqData: {
      pageNo: 1,
      pageSize: 100
    },
    robotList: [] as API.RobotList[],
    total: 0 // 列表总条数
  })

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
  routeChange('createRobot')
}

/**
 * @function 获取机器人列表
 */
const getRobotList = async () => {
  console.log('getRobotList')
  let resData = await getRobotListServer({
    pageNo: data.reqData.pageNo,
    pageSize: data.reqData.pageSize
  })
  data.robotList = resData.result.records
  console.log('获取的数据：', data.robotList)
}

/**
 * @function editRobot 编辑机器人
 * @param id 机器人id
 */
const editRobot = (id: string) => {
  console.log('editRobot', id)
  routeChange('createRobot', {
    id
  })
}

/******************************** S 机器人操作业务逻辑 ***********************************/

/**
 * @function startRobot 启动机器人
 */
 const startOrRestartRobot = async (id: string) => {
  console.log('startRobot')
  let resData = await startOrRestartRobotServer({
    id,
    cookie: getSessionStorage('cookie')
  })
  getRobotList()
  console.log('获取的数据：', resData)
}

/**
 * @function stopRobot 启动机器人
 */
 const stopRobot = async (id: string) => {
  console.log('stopRobot')
  let resData = await stopRobotServer({
    id
  })
  getRobotList()
  console.log('获取的数据：', resData)
}
/**
 * @function 操作机器人
 */
 const handleRobot = async (status: string, id: string) => {
  console.log('机器人状态', status)
  switch (status) {
    case ROBOT_STATUS_VAL.waitUse:
    case ROBOT_STATUS_VAL.exception:
      startOrRestartRobot(id)
      console.log('启动')
      break
    case ROBOT_STATUS_VAL.inUse:
      stopRobot(id)
      console.log('暂停')
      break
    default:
      console.log('其他')
      break
  }
}
/******************************** E 机器人操作业务逻辑 ***********************************/

/******************************** S 删除机器人的业务逻辑 ***********************************/
  /**
   * @function stopRobot 启动机器人
   */
  const deleteRobot = async (id: string) => {
    try {
      await deleteRobotServer({
        id
      })
      getRobotList()
      message.success('删除成功')
    } catch (error) {
      message.success(`删除失败，原因是:${error.message}`)
    }
  }

  /**
   * @function 确认删除机器人
   * @param id 机器人id
   */
  const confirm = (id: string) => {
    deleteRobot(id)
  }
/******************************** E 删除机器人的业务逻辑 ***********************************/

/******************************** S 生命周期钩子函数业务逻辑 ***********************************/
onMounted(() => {
  console.log('ScenePage ~ onMounted')
  getRobotList()
})
/******************************** E 生命周期钩子函数业务逻辑 ***********************************/
</script>
<style lang="less" scoped>
  @import './index.less';
</style>