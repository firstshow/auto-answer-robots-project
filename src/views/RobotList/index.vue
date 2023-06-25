<template>
  <root-page class="x-home-page-box flex flex-col items-center">
    <x-header :hasBack="false"/>
    <div class="x-table-box">
      <div class="x-table-header flex items-center justify-between">
        <div class="flex items-center">
          <span style="margin-right: 6px;">小助手列表</span>
          <svg-icon class="cursor-pointer" name="IconRefresh" size="14" @click="refresh"/>
        </div>
        <a-button type="primary" @click="createRobot">创建</a-button>
      </div>
      <a-table 
        class="x-table-body" 
        :columns="columns" 
        :loading="data.isLoading" 
        :data-source="data.robotList" 
        :scroll="{ x: 1200 }"
        :pagination="false"
        emptyText="暂无小助手"
        >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span>
             助手名称
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
              <!-- S 启动/暂停/续费 -->
              <template v-if="record.status !== ROBOT_STATUS_VAL.expired">
                <a-popconfirm
                  :title="getTipContent(record.status, record.id, record.name, record.roomId)"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="handleRobot(record.status, record.id)"
                >
                  <a class="x-action-btn">{{ ROBOT_STATUS[record.status].btnText }}</a>
                </a-popconfirm>
              </template>
              <!-- E 启动/暂停 -->

              <!-- S 续费 -->
              <template v-else>
                <a class="x-action-btn" @click="handleRobot(record.status, record.id)">{{ ROBOT_STATUS[record.status].btnText }}</a>
              </template>
              <!-- E 续费 -->
              
              <a-divider type="vertical"/>

              <!-- S 开启讲解常驻 -->
              <!-- <a-popconfirm
                :title="`确定${record.permanentOpen === ROBOT_ALWAYS_EXPLAIN.open ? '关闭' : '开启'}当前直播间讲解常驻吗`"
                ok-text="确定"
                cancel-text="取消"
                @confirm="setRobotAlwaysExplain(record.permanentOpen, record.id)"
              >
                <a class="x-action-btn" v-if="record.status !== ROBOT_STATUS_VAL.expired">{{record.permanentOpen === ROBOT_ALWAYS_EXPLAIN.open ? '关闭' : '开启'}}讲解常驻</a>
              </a-popconfirm> -->
              <a class="x-action-btn" v-if="record.status === ROBOT_STATUS_VAL.inUse" @click="productManage(record.id)">商品管理</a>
              <a-divider type="vertical"/>
               <!-- E 开启讲解常驻 -->

               <!-- S 直播间数据，只有在直播的直播间才有，是当前直播间的实时数据 -->
              <a class="x-action-btn" v-if="record.status === ROBOT_STATUS_VAL.inUse" @click="robotDataStatistics(record.id)">直播数据</a>
              <a-divider type="vertical" />
              <!-- E 直播间数据，只有在直播的直播间才有，是当前直播间的实时数据 -->

              <!-- S 修改 -->
              <a class="x-action-btn" v-if="record.status !== ROBOT_STATUS_VAL.expired" @click="editRobot(record.id)">修改</a>
              <a-divider type="vertical" />
              <!-- E 修改 -->

              <!-- S 删除, 当在过期时才能删除 -->
              <a-popconfirm
                :title="`确定要删除小助手【${record.name}】吗?`"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirm(record.id)"
              >
                <a class="x-action-btn" v-if="record.status === ROBOT_STATUS_VAL.expired">删除</a>
              </a-popconfirm>
              <!-- E 删除 -->
            </span>
          </template>
        </template>
      </a-table>
    </div>

    <!-- S 激活码的弹框 -->
    <a-modal
      v-model:visible="isShowCodeModal"
      :title="data.currentOptionText"
      :footer="null"
    >
      <a-form ref="codeForm" class="x-login-form" :rules="rules" :model="data" @finish="handleCode">
        <a-form-item label="激活码" name="code">
          <a-input placeholder="请输入激活码" v-model:value="data.code" :maxlength="8" />
        </a-form-item>
        <a-form-item class="text-align-right">
          <a-button  class="margin-right-12" @click="isShowCodeModal = false">取消</a-button>
          <a-button type="primary" html-type="submit">确定</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- E 激活码的弹框 -->
  </root-page>
</template>

<script setup lang="ts">
  import XHeader from '@/components/global/Header/index.vue'
  import { routeChange } from "@/hooks/routeChange"
  import { 
    getRobotListServer, 
    startOrRestartRobotServer, 
    stopRobotServer, 
    deleteRobotServer,
    renewRobotServer
  } from '@/api'
  import { reactive, ref, onMounted } from 'vue'
  import { ROBOT_STATUS_VAL, ROUTE_MAP } from '@/constants'
  import { validateCode, getSessionStorage } from '@/hooks'
  import { message } from 'ant-design-vue'

  const columns = [
  {
    name: '助手名称',
    dataIndex: 'name',
    key: 'name',
    width: 80
  },
  {
    title: '直播抖音昵称',
    dataIndex: 'anchorName',
    key: 'anchorName',
    width: 120
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
    title: '过期时间',
    dataIndex: 'endTime',
    key: 'endTime',
    width: 150
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 140
  },
]

// 机器人状态
const ROBOT_STATUS = {
  [ROBOT_STATUS_VAL.waitUse]: {
    icon: 'IconNoStart',
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
  },
  [ROBOT_STATUS_VAL.expired]: {
    icon: 'IconExpired',
    className: '-expired',
    status: '已过期',
    btnText: '续费'
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
    isLoading: false,
    reqData: {
      pageNo: 1,
      pageSize: 100
    },
    robotList: [] as API.RobotList[],
    total: 0, // 列表总条数
    currentOptionText: '创建', // 当前是续费操作，还是创建操作；弹框的提示标题文案
    currentRenewRobotId: '', // 当前需要续期的机器人ID
    code: '' // 续费的激活码
  })

/**
 * 表单验证规则
 */
const rules = {
  code: [{ required: true, validator: validateCode }]
}

// 激活码表单
const codeForm = ref()

// 展示激活码弹框
let isShowCodeModal = ref(false)

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
  data.currentOptionText = '创建'
  isShowCodeModal.value = true
}

/**
 * @function refresh 刷新小助手列表
 * @param status 机器人状态
 * @param id 机器人id
 */
const refresh = async () => {
  console.log('refresh')
  await getRobotList()
  message.success(`刷新成功`)
}

/**
 * @function 获取机器人列表
 */
const getRobotList = async () => {
  console.log('getRobotList')
  if (data.isLoading) return
  data.isLoading = true
  try {
    let resData = await getRobotListServer({
      pageNo: data.reqData.pageNo,
      pageSize: data.reqData.pageSize
    })
    data.robotList = resData.result.records
    data.isLoading = false
  } catch (error) {
    data.isLoading = false
    message.error(`获取列表数据失败：${error.message}`)
    console.log('获取列表数据失败：', error)
  }
}

/**
 * @function editRobot 编辑机器人
 * @param id 机器人id
 */
const editRobot = (id: string) => {
  routeChange(ROUTE_MAP.CreateRobot, {
    id
  })
}


/**
 * @function editRobot 编辑机器人
 * @param id 机器人id
 */
 const robotDataStatistics = (id: string) => {
  routeChange(ROUTE_MAP.RobotDataStatistics, {
    id
  })
}

/******************************** S 商品管理 ***********************************/
const productManage = (id: string) => {
  routeChange(ROUTE_MAP.ProductManage, {
    id
  })
}
/******************************** S 商品管理 ***********************************/

/******************************** S 机器人操作业务逻辑 ***********************************/
/**
 * @function startRobot 启动机器人
 */
 const startOrRestartRobot = async (id: string) => {
  try {
    await startOrRestartRobotServer({
      id,
      cookie: getSessionStorage('cookie')
    })
    getRobotList()
    message.success('启动成功')
  } catch (error) {
    message.error(`'启动失败：${error.message}`)
  }
}

/**
 * @function stopRobot 停止机器人
 */
 const stopRobot = async (id: string) => {
  console.log('stopRobot')
  try {
    await stopRobotServer({
      id
    })
    getRobotList()
    message.success('暂停成功')
  } catch (error) {
    message.error(`'暂停失败：${error.message}`)
  }
}

/**
 * @function 打开续费弹框
 * @param id 机器人id
 */
const openRenewModal = (id: string) => {
  data.currentOptionText = '续费'
  data.currentRenewRobotId = id
  isShowCodeModal.value = true
}

/**
 * @function 处理激活码弹框逻辑，续费则是续费；不然是创建
 */
const handleCode = () => {

  if (data.currentOptionText === '续费') {
      renew()
    } else {
      routeChange(ROUTE_MAP.CreateRobot, {
      code: data.code
    })
  }
}

/**
 * @function renew 续费
 */
const renew = async () => {
  try {
    await renewRobotServer({
      id: data.currentRenewRobotId,
      code: data.code,
    })
    getRobotList()
    isShowCodeModal.value = false
    message.success('续费成功')
  } catch (error) {
    message.error(`'续费失败：${error.message}`)
  }
}

/**
 * @function 操作时的提示判断
 * @param status 机器人状态 
 * @param id  机器人id
 * @param name  机器人名称
 * @param roomId  机器人直播间id
 */
const getTipContent = (status: string, id: string, name: string, roomId: string) => {
  const currentRoomId = getSessionStorage('roomId')
  let tipContent = `确定${ROBOT_STATUS[status].btnText}小助手【${name}】吗？`
  if (currentRoomId !== roomId && [ROBOT_STATUS_VAL.waitUse, ROBOT_STATUS_VAL.exception].includes(status)) {
    tipContent =  `即将服务的直播间与上一次服务的直播间不一样，确定切换直播间吗？`
  } else if (status === ROBOT_STATUS_VAL.inUse) {
    tipContent =  `小助手【${name}】正在服务中...，确定暂停吗？`
  }
  return tipContent
}

/**
 * @function handleRobot 操作机器人
 * @param status  机器人状态 
 * @param id  机器人id
 */
const handleRobot = (status: string, id: string) => {
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
    case ROBOT_STATUS_VAL.expired:
      openRenewModal(id)
      console.log('续费')
      break
    default:
      console.log('其他')
      break
  }
}
/******************************** E 机器人操作业务逻辑 ***********************************/

/******************************** S 机器人设置讲解常驻业务逻辑 ***********************************/
// const setRobotAlwaysExplain = async (open: number, id: number) => {
//   try {
//     await setRobotAlwaysExplainServer({
//       id,
//       open: open === ROBOT_ALWAYS_EXPLAIN.open ? ROBOT_ALWAYS_EXPLAIN.close : ROBOT_ALWAYS_EXPLAIN.open
//     })
//     getRobotList()
//     message.success('设置讲解常驻成功')
//   } catch (error) {
//     message.error(`设置讲解常驻失败，原因是:${error.message}`)
//   }
// }
/******************************** E 机器人设置讲解常驻业务逻辑 ***********************************/

/******************************** S 删除机器人的业务逻辑 ***********************************/
  /**
   * @function stopRobot 删除机器人
   */
  const deleteRobot = async (id: string) => {
    try {
      await deleteRobotServer({
        id
      })
      getRobotList()
      message.success('删除成功')
    } catch (error) {
      message.error(`删除失败，原因是:${error.message}`)
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