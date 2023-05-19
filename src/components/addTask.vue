<template>
  <div>
    <a-form ref="formRef">
      <a-form-item label="助手名称" :model="dynamicValidateForm">
        <a-input value="" placeholder="请输入助手名称" />
      </a-form-item>
      <a-form-item label="门店名称">
        <a-input placeholder="请输入门店名称" />
      </a-form-item>
      <a-form-item label="门店地址">
        <a-textarea placeholder="请输入门店地址" />
      </a-form-item>
      <a-form-item label="所属行业">
        <a-input placeholder="请输入所属行业" />
      </a-form-item>
      <a-form-item label="营业时间">
        <a-input value="" placeholder="请输入所属行业" />
      </a-form-item>
      <a-form-item label="套餐描述">
        <a-list size="small" bordered :data-source="state.ticketList" style="background: fff; ">
          <template #header>
            <a-row>
              <a-col :span="10">套餐标题</a-col>
              <a-col :span="10" :offset="1">套餐描述</a-col>
              <a-col :span="2" :offset="1"><MinusCircleFilled /></a-col>
            </a-row>
          </template>
          <template #renderItem="{ item }">
            <a-row style="padding: 10px; border-bottom: 1px solid #303030;" align="middle">
              <a-col :span="10"><a-textarea :value="item.name" @change="handleInput"/></a-col>
              <a-col flex :span="10" :offset="1"><a-textarea :value="item.desc" /></a-col>
              <a-col :span="2" :offset="1"><MinusCircleFilled /></a-col>
            </a-row>
            <!-- <div v-for="item in state.ticketList" :key="item">
              <a-list-item>{{item.name}}</a-list-item>
            </div> -->
          </template>
          
        </a-list>
        <!-- <a-form-item v-bind="formItemLayoutWithOutLabel">
          <a-button type="primary" html-type="submit" @click="submitForm">Submit</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
        </a-form-item> -->
      </a-form-item>
      <a-form-item label="其他信息">
        <a-textarea placeholder="请输入其他信息。如：是否免费停车，免票或儿童票信息，周末节假日是否可用" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { MinusCircleFilled } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'

  const formRef = ref();

  const state = reactive({
    ticketList: [{ name: '32323', desc: '描述' }, { name: '32323232323', desc: '描述' }],
    // dynamicValidateForm: { domains: [] }
  })
  const dynamicValidateForm:any = reactive({
    domains: [],
  });

  // const submitForm = () => {
  //   console.log(dynamicValidateForm)
  //   formRef.value
  //     .validate()
  //     .then(() => {
  //       console.log('values', dynamicValidateForm);
  //     })
  // };

  const handleInput = (val, e): void => {
    console.log(val, e)
    // state.ticketList = []
  };

</script>
