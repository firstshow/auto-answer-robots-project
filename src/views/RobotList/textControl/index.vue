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
              <a-col class="x-list-input-box" :span="23">
                <a-form-item-rest>
                  <a-input class="x-from-input x-speech-input" v-model:value="item.value" placeholder="请输入场控话术，最多不超过50字" maxlength="50" />
                </a-form-item-rest>
              </a-col>
              <a-col class="x-list-input-box" :span="1">
                <a-form-item-rest>
                  <svg-icon class="margin-left-8 cursor-pointer" name="IconAdd" size="16" v-if="index === 0" @click="addSpeech"/>
                  <svg-icon class="margin-left-8 cursor-pointer" name="IconReduce" size="16" v-else @click="reduceSpeech(index)" />
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
  </root-page>
</template>
  
<script setup lang="ts">
import XHeader from '@/components/global/Header/index.vue'
import { routeGoBack } from '@/hooks'
import { reactive, onMounted } from 'vue'
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
    console.log(resData)
  } catch (error) {
    message.error(`获取场控话术详情失败：${error.message}`)
  }
}

/**
 * @function 获取场控话术详情
 */
 const setTextControlDetail = async () => {
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
    message.success(`设置场控话术成功`)
    setTimeout(() => {
      back()
    }, 2000);
    console.log(resData)
  } catch (error) {
    message.error(`设置场控话术失败：${error.message}`)
  }
}


/******************************** S 场控话术编辑逻辑 ***********************************/
/**
 * @function addSpeech 添加场控话术，最多增加20个
 */
  const addSpeech = () => {
    if (data.formState.contentList.length >= 20) {
      message.warning('最多添加20个场控话术')
      return
    }
    data.formState.contentList.push({
      value: ''
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