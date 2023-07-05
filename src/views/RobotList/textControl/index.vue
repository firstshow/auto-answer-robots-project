<template>
  <root-page class="flex flex-col items-center">
    <x-header @back="back" />
    
    <a-form class="x-from-box" :rules="rules" ref="formRef" :model="data.formState" @finish="setTextControlDetail">
      <a-form-item label="场控开关">
        <a-radio-group v-model:value="data.formState.textControlOpen" :options="data.options" />
      </a-form-item>
      <a-form-item label="发言频率" name="frequency">
        <a-input-number  class="x-from-input" placeholder="请输入发言频率"  v-model:value="data.formState.textFrequency" :min="20" :max="300" /> 秒
      </a-form-item>
      <a-form-item label="发言顺序" name="order">
        <a-select
          ref="select"
          v-model:value="data.formState.textOrder"
          style="width: 120px"
        >
          <a-select-option value="1">随机发言</a-select-option>
          <a-select-option value="2">顺序发言</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="场控话术" name="speech">
        <a-list class="x-from-input" size="small" bordered :data-source="data.formState.contentList">
          <template #renderItem="{ item, index }">
            <a-row class="x-list-content-box flex items-center">
              <a-col class="x-list-input-box" :span="22">
                <a-form-item-rest>
                  <a-input class="x-from-input x-speech-input" v-model:value="item.value" placeholder="请输入场控话术，最多不超过50字" :maxlength="50" />
                </a-form-item-rest>
              </a-col>
              <a-col class="x-list-input-box" :span="1">
                <a-form-item-rest>
                  <div class="flex items-center" style="width: 50px;">
                    <svg-icon class="margin-left-8 cursor-pointer" name="IconAdd" size="16" v-if="index === 0" @click="addSpeech"/>
                    <svg-icon class="margin-left-8 cursor-pointer" name="IconTextControl" size="16" v-if="index === 0" @click="openDemoList"/>
                    <svg-icon class="margin-left-8 cursor-pointer" name="IconReduce" size="16" v-else @click="reduceSpeech(index)" />
                  </div>
                </a-form-item-rest>
              </a-col>
            </a-row>
          </template>
        </a-list>
      </a-form-item>

      <a-form-item label="">
        <div class="flex justify-center">
          <a-button @click="back">取消</a-button>
          <a-button class="x-save-btn" type="primary" html-type="submit">保存</a-button>
        </div>
      </a-form-item>
    </a-form>

    <!-- S 文字场控模板库弹框 -->
    <a-modal v-model:visible="showDemoList" title="文字场控模板库" :footer="null">
      <a-list class="x-from-input" size="small" bordered :data-source="data.formState.demoList">
          <template #renderItem="{ item }">
            <a-row class="x-demo-content-box flex items-center">
              <a-col class="x-demo-input-box" :span="22">
                <span>{{ item.value }}</span>
              </a-col>
              <a-col class="x-demo-input-box" :span="1">
                <a-form-item-rest>
                  <div class="flex items-center" style="width: 24px;">
                    <svg-icon class="margin-left-8 cursor-pointer" name="IconAdd" size="16" @click="addTextToContentList(item.value)"/>
                  </div>
                </a-form-item-rest>
              </a-col>
            </a-row>
          </template>
        </a-list>
        <span class="x-demo-list-tips">注意：模版仅供参考，部分内容需自行调整</span>
    </a-modal>
     <!-- E 文字场控模板库弹框 -->
  </root-page>
</template>
  
<script setup lang="ts">
import XHeader from '@/components/global/Header/index.vue'
import { routeGoBack } from '@/hooks'
import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { 
  getTextControlDetailServer,
  setTextControlDetailServer
  } from '@/api'

const router = useRoute();
let data = reactive({
  formState: {
    id: '', // 场控话术id
    textControlOpen: 1, // 场控开关
    textFrequency: '30', // 发言频率
    textOrder: '1', // 发言顺序
    contentList: [
      {
        value: ''
      }
    ], // 场控话术
    demoList: [
      {
        value: '欢迎大家来到XXXX直播福利专享直播间！有什么问题都可以打在公屏上咨询，主播为大家一一解答'
      },
      {
        value: '欢迎进入直播间的宝子们，我们是XXXX直播专场，可以左上角给主播点个小关小注呦'
      },
      {
        value: '我们门店的营业时间是早上9:00到傍晚17:00，请大家安排好自己的时间呦'
      },
      {
        value: '我们门店在杭州XXXX，周边停车方便，3小时内免费停车，欢迎大家来玩呦'
      },
      {
        value: '我们直播间给家人们准备了一大一小，两大一小的亲子票；一大一小请拍1号链接，两大一小请拍2号链接，两大两小请拍2个1号链接'
      },
      {
        value: '团购券每人最多买5份；有效期至2023年7月15日；无需预约，高峰期可能需要排队；所以请提前到店哦'
      },
      {
        value: '我们套餐包含非常好玩的游玩项目，包含：XXXX、XXXX、XXXX、XXXX，期待您的到来呦'
      },
      {
        value: '我们乐园的话1.4米以上是需要购买成人票的，1.1米到1.4米是需要购买儿童票的，1.1米以下和70周岁及以上老人都是免票的'
      },
      {
        value: '抖音团购券支持随时退，过期退，自动退，没有任何手续费；请放心购买'
      },
      {
        value: '有卷的时候先要囤到手呦！主播下播后就没有这个福利了哦！'
      }
    ]
  },
  options: [ // 场控开关选项
    { label: '开启', value: 1 },
    { label: '关闭', value: 0 }
  ]
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
 * @function 获取场控话术详情
 */
const getTextControlDetail = async () => {
  const hide = message.loading('加载中...', 0)
  try {
    let resData = await getTextControlDetailServer({ 
      id: router.query.id as string 
    })
    data.formState.id = resData.result.id
    data.formState.textControlOpen = resData.result.textControlOpen
    data.formState.textOrder = resData.result.textOrder || '1'
    data.formState.textFrequency = resData.result.textFrequency
    data.formState.contentList = []  
    if (resData.result.contentList.length === 0) {
      data.formState.contentList = [{
        value: ''
      }]  
    } else {
      resData.result.contentList.map(item => {
        data.formState.contentList.push({
          value: item
        })
      })
    }
    hide()
    console.log(resData)
  } catch (error) {
    hide()
    message.error(`获取场控话术详情失败：${error.message}`)
  }
}

/**
 * @function 获取场控话术详情
 */
 const setTextControlDetail = async () => {
  const hide = message.loading('设置中...', 0)
  try {
    let {
      id,
      textOrder,
      contentList,
      textFrequency,
      textControlOpen
    } = data.formState
    let contentReallyList = [] 
    contentList.map(item => {
      console.log(item)
      contentReallyList.push(item.value)
    } )
    let resData = await setTextControlDetailServer({ 
      id,
      textOrder,
      contentList: contentReallyList,
      textFrequency,
      textControlOpen
    })
    hide()
    message.success(`设置场控话术成功`)
    setTimeout(() => {
      back()
    }, 2000);
    console.log(resData)
  } catch (error) {
    hide()
    message.error(`设置场控话术失败：${error.message}`)
  }
}


/******************************** S 场控话术编辑逻辑 ***********************************/
/**
 * @function addSpeech 添加场控话术，最多增加20个
 */
  const addSpeech = (text: string = '') => {
    if (data.formState.contentList.length >= 20) {
      message.warning('最多添加20个场控话术')
      return
    }
    data.formState.contentList.push({
      value: text
    })
}

/**
 * @function reduceSpeech 删除场控话术，当只剩下一条的时候，不允许删除
 */
const reduceSpeech = (index: number) => {
  if (data.formState.contentList.length <= 1) {
    message.warning('至少保留一条场控话术')
    return
  }
  data.formState.contentList.splice(index, 1)
}
/******************************** E 场控话术编辑逻辑 ***********************************/

/******************************** E 添加模版话术列表 ***********************************/
let showDemoList = ref(false)
/**
 * @function 打开模版话术列表
 */
const openDemoList = () => {
  showDemoList.value = true
}

const addTextToContentList = (text: string) => {
   // 如果只有一条数据，且为空，则直接赋值
  if (data.formState.contentList.length === 1 && data.formState.contentList[0].value === '') {
    data.formState.contentList[0].value = text
    return false
  }
  addSpeech(text)
}
/******************************** E 添加模版话术列表 ***********************************/

/**
 * @function back 返回上一页
 */
 const back = () => {
  routeGoBack(-1)
}

/******************************** S 生命周期钩子函数业务逻辑 ***********************************/
onMounted( () => {
  getTextControlDetail()
})
/******************************** E 生命周期钩子函数业务逻辑 ***********************************/
</script>

<style lang="less" scoped>@import './index.less';</style>