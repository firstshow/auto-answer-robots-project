<template>
    <root-page class="x-create-robot-page-box flex flex-col items-center">
      <x-header/>
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
                <a-col :span="7">套餐标题</a-col>
                <a-col :span="4">套餐价格</a-col>
                <a-col :span="11">套餐描述</a-col>
                <a-col class="cursor-pointer" :span="1" :offset="1" @click="addGoods">
                  <svg-icon name="IconAdd" size="20" />
                </a-col>
              </a-row>
            </template>
            <template #renderItem="{ item, index }">
              <a-row class="x-list-content-box">
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
                <a-col class="x-list-input-box" flex :span="11">
                  <a-form-item-rest>
                    <a-textarea class="x-list-textarea" v-model:value="item.description" placeholder="请输入套餐描述" />
                  </a-form-item-rest>
                </a-col>
                <a-col class="x-list-input-box cursor-pointer" :span="1" :offset="1" @click="reduceGoods(index)">
                  <svg-icon name="IconReduce" size="20" />
                </a-col>
              </a-row>
            </template>
          </a-list>
        </a-form-item>
        <a-form-item label="套餐限制" name="packageLimit">
          <a-textarea class="x-from-textarea" v-model:value="formState.packageLimit" placeholder="请输入通用套餐限制，如：所有票都需要提前一天购买，不需要预约；" />
        </a-form-item>
        <a-form-item label="关键词汇">
          <a-list class="x-from-input" size="small" bordered :data-source="formState.keywordList" style="background: fff; ">
            <template #header>
              <a-row>
                <a-col :span="8">关键词</a-col>
                <a-col :span="14">回复内容</a-col>
                <a-col class="cursor-pointer" :span="1" :offset="1" @click="addKeyword">
                  <svg-icon name="IconAdd" size="20" />
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
                  <svg-icon name="IconReduce" size="20" />
                </a-col>
              </a-row>
            </template>
          </a-list>
        </a-form-item>
        <a-form-item label="其他信息" name="note">
          <a-textarea class="x-from-textarea" v-model:value="formState.note" placeholder="请输入其他信息。如：是否免费停车，免票或儿童票信息，周末节假日是否可用" />
        </a-form-item>

        <a-form-item label="">
          <div class="flex justify-center">
            <a-button>取消</a-button>
            <a-button class="x-save-btn" type="primary" html-type="submit">保存</a-button>
          </div>
        </a-form-item>
      </a-form>
    </root-page>
  </template>
  
  <script setup lang="ts">
  import XHeader from '@/components/global/Header/index.vue'
  import { addRobotServer } from '@/api'
  import { reactive, ref } from 'vue'
  import { message } from 'ant-design-vue'
  import { routeGoBack} from '@/hooks'
  
    const formRef = ref()
  
    const formState = reactive({
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
    })

    /**
     * @function rules 表单验证规则
     */
    const rules = {
      name: [{ required: true, message: '请输入助手名称'}],
      storeName: [{ required: true, message: '请输入门店名称' }],
      storeAddress: [{ required: true, message: '请输入门店地址' }],
      industry: [{ required: true, message: '请输入所属行业' }],
      businessTime: [{ required: true, message: '请输入营业时间' }],
      packageLimit: [{ required: false, message: '请输入套餐限制' }],
      note: [{ required: false, message: '请输入其他信息' }],
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
     * @function reduceKeyword 减少关键词
     */
    const reduceKeyword = (idx) => {
      if (formState.keywordList.length === 1) return;
      formState.keywordList.splice(idx, 1);
    }

    /**
     * @function saveRobot 保存小助手
     */
    const saveRobot = async (values) => {
      console.log('sssss', values)
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
      } = formState
      try {
        let resData = await addRobotServer({
          name,
          storeName, // 店铺名称
          storeAddress, // 店铺地址
          industry, // 行业
          businessTime, // 营业时间
          packageList, // 套餐列表
          packageLimit, // 套餐限制
          keywordList, // 关键词列表
          note // 备注
        })
        console.log(resData)
        message.info(`添加成功`)
        setTimeout(() => {
          routeGoBack(-1)
        },2000)
      } catch (error) {
        message.info(`添加失败，${error.message}`)
      } 
    }
  
  </script>

<style lang="less" scoped>
  @import './index.less';
</style>