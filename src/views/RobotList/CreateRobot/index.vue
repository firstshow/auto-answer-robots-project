<template>
  <root-page class="x-create-robot-page-box flex flex-col items-center">
    <x-header @back="back" />
    <p class="x-draft-tips flex items-center justify-left" v-if="draftData.isShowDraftTips">
      <svg-icon class="cursor-pointer margin-right-6" name="IconClear" size="14" @click="draftData.isShowDraftTips = false"/>
      您本地有一份存储于{{draftData.setTime}}的一份草稿，是否<span class="x-use-btn" @click="useDraft">使用</span>该草稿? 
    </p>
    <a-form class="x-from-box" :rules="rules" ref="formRef" :model="formState" @finish="saveRobot">
      <a-form-item label="助手名称" name="name">
        <a-input class="x-from-input" v-model:value="formState.name" placeholder="请输入助手名称" />
      </a-form-item>
      <a-form-item label="门店名称" name="storeName">
        <a-input class="x-from-input" v-model:value="formState.storeName" placeholder="请输入门店名称" />
      </a-form-item>
      <a-form-item label="门店地址" name="storeAddress">
        <a-input class="x-from-input" v-model:value="formState.storeAddress" placeholder="请输入门店地址" />
      </a-form-item>
      <a-form-item label="所属行业" name="industry">
        <a-input class="x-from-input" v-model:value="formState.industry" placeholder="请输入所属行业" />
      </a-form-item>
      <a-form-item label="营业时间" name="businessTime">
        <a-input class="x-from-input" v-model:value="formState.businessTime" placeholder="请输入所属行业" />
      </a-form-item>
      <a-form-item label="套餐描述" name="packageList">
        <a-list class="x-from-input" size="small" bordered :data-source="formState.packageList">
          <template #header>
            <a-row>
              <a-col :span="1">排序</a-col>
              <a-col :span="7">套餐标题</a-col>
              <a-col :span="4">套餐价格</a-col>
              <a-col :span="10">套餐描述</a-col>
              <a-col class="cursor-pointer" :span="1" :offset="1" @click="addGoods">
                <svg-icon name="IconAdd" size="16" />
              </a-col>
            </a-row>
          </template>
          <template #renderItem="{ item, index }">
            <a-row class="x-list-content-box">
              <a-col class="x-list-input-box" :span="1">
                <a-form-item-rest>
                  <svg-icon class="cursor-pointer" name="IconUpMove" size="16" @click="upMove(index)" />
                </a-form-item-rest>
              </a-col>
              <a-col class="x-list-input-box" :span="7">
                <a-form-item-rest>
                  <a-input class="x-list-input" v-model:value="item.title" placeholder="请输入套餐标题" />
                </a-form-item-rest>
              </a-col>
              <a-col class="x-list-input-box" flex :span="4">
                <a-form-item-rest>
                  <a-input class="x-list-input" v-model:value="item.price" placeholder="请输入价格" />
                </a-form-item-rest>
              </a-col>
              <a-col class="x-list-input-box" flex :span="10">
                <a-form-item-rest>
                  <a-textarea class="x-list-textarea" v-model:value="item.description" placeholder="请输入套餐描述" />
                </a-form-item-rest>
              </a-col>
              <a-col class="x-list-input-box cursor-pointer" :span="1" :offset="1" @click="reduceGoods(index)">
                <svg-icon name="IconReduce" size="16" />
              </a-col>
            </a-row>
          </template>
        </a-list>
      </a-form-item>
      <a-form-item label="套餐限制" name="packageLimit">
        <a-textarea class="x-from-textarea" v-model:value="formState.packageLimit"
          placeholder="请输入通用套餐限制，如：所有票都需要提前一天购买，不需要预约；" />
      </a-form-item>
      <a-form-item label="关键词汇">
        <a-list class="x-from-input" size="small" bordered :data-source="formState.keywordList" style="background: fff; ">
          <template #header>
            <a-row>
              <a-col :span="8">关键词</a-col>
              <a-col :span="14">回复内容</a-col>
              <a-col class="cursor-pointer" :span="1" :offset="1" @click="addKeyword">
                <svg-icon name="IconAdd" size="16" />
              </a-col>
            </a-row>
          </template>
          <template #renderItem="{ item, index }">
            <a-row class="x-list-content-box">
              <a-col class="x-list-input-box" :span="8">
                <a-form-item-rest>
                  <a-input class="x-list-input" v-model:value="item.keyword" placeholder="请输入关键词" />
                </a-form-item-rest>
              </a-col>
              <a-col class="x-list-input-box" flex :span="14">
                <a-form-item-rest>
                  <a-textarea class="x-list-textarea" v-model:value="item.reply" placeholder="请输入回复内容" />
                </a-form-item-rest>
              </a-col>
              <a-col class="x-list-input-box cursor-pointer" :span="1" :offset="1" @click="reduceKeyword(index)">
                <svg-icon name="IconReduce" size="16" />
              </a-col>
            </a-row>
          </template>
        </a-list>
      </a-form-item>
      <a-form-item label="其他信息" name="note">
        <a-textarea class="x-from-textarea" v-model:value="formState.note"
          placeholder="请输入其他信息。如：是否免费停车，免票或儿童票信息，周末节假日是否可用" />
      </a-form-item>

      <a-form-item label="">
        <div class="flex justify-center">
          <a-button @click="back">取消</a-button>
          <a-button class="x-save-btn" type="primary" html-type="submit">保存</a-button>
        </div>
      </a-form-item>
    </a-form>
  </root-page>
</template>
  
<script setup lang="ts">
import XHeader from '@/components/global/Header/index.vue'
import { addRobotServer, getRobotDetailServer, editRobotServer } from '@/api'
import { DRAFT_TYPE } from '@/constants'
import { useRoute } from 'vue-router'
import { reactive, ref, onMounted, watch } from 'vue'
import { message } from 'ant-design-vue'
import { routeGoBack, setDraft, getDraft, clearDraft } from '@/hooks'

const router = useRoute();
const formRef = ref()
let watchFlag = null // 事件监听对象
let isChange = false // 是否更改表单数据
let setDraftTimer = null // 存储草稿定时器

let formState = reactive({
  code: router.query.code, // 激活码
  name: '', // 助手名称
  storeName: '', // 门店名称
  storeAddress: '', // 门店地址
  industry: '', // 所属行业
  businessTime: '', // 营业时间
  packageList: [ // 套餐描述列表
    {
      index: 0,
      title: '',
      price: '',
      description: ''
    }
  ] as API.PackageList[],
  packageLimit: '', // 套餐限制
  keywordList: [ // 关键词列表
    {
      keyword: '',
      reply: ''
    }
  ] as API.KeywordList[],
  note: '', // 其他备注
} as API.AddRobotParams)

/**
 * @function draftData 草稿箱数据
 */
let draftData = reactive({
  isShowDraftTips: false,
  setTime: '',
  value: {} as API.AddRobotParams
})

/**
 * @function rules 表单验证规则
 */
const rules = {
  name: [{ required: true, message: '请输入助手名称' }],
  storeName: [{ required: true, message: '请输入门店名称' }],
  storeAddress: [{ required: true, message: '请输入门店地址' }],
  industry: [{ required: true, message: '请输入所属行业' }],
  businessTime: [{ required: true, message: '请输入营业时间' }],
  packageLimit: [{ required: false, message: '请输入套餐限制' }],
  note: [{ required: false, message: '请输入其他信息' }],
}

/**
 * @function 初始化草稿箱；如果本地有存储草稿，则直接提示；没有则没有提示
 */
const initDraft = () => {
  let draft = getDraft(DRAFT_TYPE.editRobotDraft)
  if (!draft) return

  draftData.value = draft.value
  draftData.setTime = draft.setTime
  draftData.isShowDraftTips = true
  console.log(draftData)
}

/**
 * @function setDraftTimerFun 设置草稿定时器
 */
const setDraftTimerFun = () => {
  // 每3秒存储一下表单数据
  setDraftTimer = setInterval(() => {
    console.log('存储：', isChange)
    if (isChange) {
      setDraft(DRAFT_TYPE.editRobotDraft, formState)
    }
  }, 2000)
}

/**
 * @function 开始监听
 */
const startWatch = () => {
  watchFlag = watch(formState, (newVal, oldVal) => {
    console.log('监听：', isChange)
    // 当表单数据改变时，将可变标记做变更，这样就会触发草稿存储
    isChange = true
    // 如果修改了表单数据，则不再提示草稿
    draftData.isShowDraftTips = false
  }, { deep: true })
}

/**
 * @function useDraft 使用草稿箱
 */
const useDraft = () => {
  formState = {
    ...formState,
    ...draftData.value
  }
  draftData.isShowDraftTips = false
}

/**
 * @function getRobotDetail 获取小助手详情
 */
const getRobotDetail = async () => {
  console.log('getRobotDetail')
  let id = router.query.id as string
  if (!id) {
    return false
  }
  const hide = message.loading('加载中...', 0)
  try {
    let resData = await getRobotDetailServer({ id })
    let {
      name,
      storeName,
      storeAddress,
      industry,
      businessTime,
      packageList,
      packageLimit,
      keywordList,
      note
    } = resData.result
    formState.name = name
    formState.storeName = storeName
    formState.storeAddress = storeAddress
    formState.industry = industry
    formState.businessTime = businessTime
    formState.packageList = packageList
    formState.packageLimit = packageLimit
    formState.keywordList = keywordList
    formState.note = note
    console.log(resData)
    isChange = false
    hide()
  } catch (error) {
    hide()
    message.error(`获取小助手详情失败:${error.message}`)
  }
}

/**
 * @function addGoods 新增套餐商品
 */
const addGoods = () => {
  formState.packageList.push({
    index: formState.packageList.length,
    title: '',
    price: '',
    description: ''
  })
}

/**
 * @function reduceGoods 减少套餐商品
 */
const reduceGoods = (idx) => {
  console.log(idx, formState.packageList);
  if (formState.packageList.length === 1) return;
  formState.packageList.splice(idx, 1);
}

/**
 * @function addKeyword 新增关键词
 */
const addKeyword = () => {
  formState.keywordList.push({
    keyword: '',
    reply: ''
  })
}

/**
 * @function upMove 上移
 */
const upMove = (index: number) => {
  console.log('upMove')
  // 与前面一个元素交换位置
  if (index > 0) {
    let temp = formState.packageList[index - 1]
    formState.packageList[index - 1] = formState.packageList[index]
    formState.packageList[index] = temp
  } else {
    message.info('已经是第一个了')
  }
}

/**
 * @function reduceKeyword 减少关键词
 */
const reduceKeyword = (idx) => {
  if (formState.keywordList.length === 1) return;
  formState.keywordList.splice(idx, 1);
}

/**
 * @function back 返回上一页
 */
const back = () => {
  clearInterval(setDraftTimer)
  // 取消监听表单数据
  watchFlag()
  routeGoBack(-1)
}

/**
 * @function saveRobot 保存小助手
 */
const saveRobot = async () => {
  let id = router.query.id as string
  // 如果有id，则是编辑；没有id是新增
  let handleRobotFun = !id ? addRobotServer : editRobotServer
  let {
    code,
    name,
    storeName,
    storeAddress,
    industry,
    businessTime,
    packageList,
    packageLimit,
    keywordList,
    note
  } = formState
  let reqData = {
      id,
      code,
      name,
      storeName, // 店铺名称
      storeAddress, // 店铺地址
      industry, // 行业
      businessTime, // 营业时间
      packageList, // 套餐列表
      packageLimit, // 套餐限制
      keywordList, // 关键词列表
      note // 备注
  }
  try {
    let resData = await handleRobotFun(reqData)
    console.log(resData)
    message.success(`${id ? '修改' : '添加'}成功`)
    clearInterval(setDraftTimer)
    clearDraft(DRAFT_TYPE.editRobotDraft)
    // 取消监听表单数据
    watchFlag()
    
    setTimeout(() => {
      routeGoBack(-1)
    }, 2000)
  } catch (error) {
    message.error(`${id ? '修改' : '添加'}失败，${error.message}`)
  }
}

/******************************** S 生命周期钩子函数业务逻辑 ***********************************/
onMounted( async () => {
  initDraft()
  await getRobotDetail()
  startWatch()
  setDraftTimerFun()
})
/******************************** E 生命周期钩子函数业务逻辑 ***********************************/
</script>

<style lang="less" scoped>@import './index.less';</style>