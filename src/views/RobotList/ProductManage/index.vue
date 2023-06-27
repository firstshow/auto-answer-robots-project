<template>
  <root-page class="flex flex-col items-center">
    <x-header @back="back" />
    <x-product-item 
    v-for="(item) in data.productList" 
    :key="item.id"
    :productItem="item"
    :currentTimestamp = "data.currentTimestamp"
    @updateFlashKilling="getProductList"
    />
    <!-- E 直播间数据 -->
  </root-page>
</template>
  
<script setup lang="ts">
  import XHeader from '@/components/global/Header/index.vue'
  import XProductItem from '@/components/business/ProductItem/index.vue'
  import { routeGoBack } from '@/hooks'
  import { getQuery } from '@/utils/common'
  import { 
    getProductListServer,
    getFlashKillingConfigServer
  } from '@/api'
  import { message } from 'ant-design-vue'
  import { onMounted, reactive, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'

  const router = useRoute();
  let timer = null // 每10秒获取列表的定时器

  const data = reactive({
    productList: [],
    grouponIds: '', // 商品ID字符串，以,分割
    hasFlashKillingList: [], // 有秒杀的商品Id列表
    recordIdMap: {}, // 用于提取查询秒杀详情所需的assign_record_id
    currentTimestamp: 0
  })

  /**
   * @function back 返回上一页
   */
  const back = () => {
    routeGoBack(-1)
  }

    /**
   * @function 每秒获取时间戳
   */
   const getCurrentTimestamp = () => {
    setTimeout(() => {
      data.currentTimestamp = Math.floor(new Date().getTime() / 1000)
      getCurrentTimestamp()
    }, 1000)
  }

  /**
   * @function getProductList 获取商品列表
   */
  const getProductList = async () => {
    try {
      let resData = await getProductListServer({
        assistantId: router.query.id as string
      })
      data.productList = []
      data.grouponIds = ''
      for (let i = 0; i < resData.result.card_list.length; i++) {
        let cardData = JSON.parse(resData.result.card_list[i].card_data)
        cardData.id = resData.result.card_list[i].card_id
        cardData.seckill_loop = resData.result.card_list[i].seckill_loop
        cardData.permanentOpen = resData.result.card_list[i].permanent_open
        cardData.assistantId = router.query.id
        data.productList.push(cardData)
        data.grouponIds += `${cardData.groupon_id}${resData.result.card_list.length - 1 === i ? '' : ','}`
      }
      getFlashKillingConfig()
    } catch (error) {
      message.error(`获取商品列表失败:${error.message}`)
    }
  }

  /**
   * @function 获取秒杀设置
   */
  const getFlashKillingConfig = async () =>  {
    try {
      let resData = await getFlashKillingConfigServer({
        assistantId: router.query.id as string,
        grouponIds: data.grouponIds 
      })
      if (resData.result.groupon_has_flash_sale.length > 0) {
        getCurrentTimestamp()
      }
      data.hasFlashKillingList = resData.result.groupon_has_flash_sale
      getRecordIdAndCouponIdList(resData.result.groupon_url_map)
      setFlashKillingFlagAndRecordId(data.hasFlashKillingList)
      console.log('最终的productList:', data.productList)
    } catch (error) {
      message.error(`获取秒杀设置失败:${error.message}`)
    }
  }

  /**
   * @function 获取recordId和couponId，抖音接口中recordId和couponId是在一个链接里面，所以这边需要解析链接，拿到recordId
   * @param urlMap 
   */
  const getRecordIdAndCouponIdList = (urlMap) => {
    for (let item in urlMap) {
      let query =  getQuery(urlMap[item]) as any
      data.recordIdMap[item] = {
        recordId: query.assign_record_id,
        couponId: query.coupon_id
      }
    }
    console.log('recordIdMap:', data.recordIdMap)
  }

  /**
   * @function 设置秒杀标识和recordId
   * @param list 有秒杀权限的商品ID列表
   */
  const setFlashKillingFlagAndRecordId = (list) => {
    for (let i = 0; i < data.productList.length; i++) {
        if (list.includes(data.productList[i].groupon_id)) {
          data.productList[i].hasFlashKilling = true
          data.productList[i].recordId = data.recordIdMap[data.productList[i].groupon_id].recordId
          data.productList[i].couponId = data.recordIdMap[data.productList[i].groupon_id].couponId
        }
      }
  }

  /******************************** S 生命周期钩子函数业务逻辑 ***********************************/
  onMounted( async () => {
    getProductList()
    timer = setInterval(getProductList, 5000)
  })
  onUnmounted(() => {
    clearInterval(timer)
  })
  /******************************** E 生命周期钩子函数业务逻辑 ***********************************/
</script>

<style lang="less" scoped>@import './index.less';</style>