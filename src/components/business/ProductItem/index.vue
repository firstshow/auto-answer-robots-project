<template>
  <div class="x-product-item-box flex flex-col items-left">
    <div class="x-product-info-box flex items-center">
      <a-image
        class="x-product-img"
        :width="80"
        :height="80"
        :src="productItem.image_info[0].web_url"
        fallback="data:image/png;base64,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"
        style="width: 100%; height: 100%;"
        />
      <div class="x-product-info flex justify-between">
        <div class="x-product-info-text flex flex-col justify-between">
          <div class="x-main">
            <h3 class="x-title">{{ productItem.source }}</h3>
            <div class="x-address flex items-center">
              <svg-icon class="x-store-icon" name="IconStore" size="16"/>
              <span>{{ productItem.poi.shop_info }}</span>
            </div>
          </div>
          <p class="x-price flex  items-center">
            <span class="x-flash-killing-text">{{ productItem.display_control.pre_price_text }}</span>
            <span class="x-actual-amount">
              <span>{{ productItem.display_control.pay_price }}</span>
            </span>
            <span class="x-origin-amount">￥{{ splitMoney(productItem.origin_amount_num / 100) }}</span>
            <a-progress class="x-progress" strokeColor="#FF3C7D" :percent="currentTimeProhress" size="small" status="active" :format="setProgressText" v-if="productItem.display_control.pre_price_text === '秒杀'" />
          </p>
        </div>
        <div class="x-product-info-action flex justify-right items-center">
          <i class="x-flash-killing-icon" @click="getFlashKillingInfo" v-show="productItem.hasFlashKilling">
            <svg-icon name="IconFlashKilling" size="14"/>
          </i>
          <a-button class="x-explain-btn" type="default" @click="setAlwaysExplain()">{{ productItem.permanentOpen === PERMANENT_TYPE.open ? '取消讲解' : '一直讲解' }}</a-button>
        </div>
      </div>
    </div>
  </div>

  <!-- S 秒杀设置弹框 -->
  <a-modal
    v-model:visible="isShowFlashKillingModal"
    title="秒杀设置"
    :footer="null"
  >
    <span class="x-offshelf" @click="offShelf">下架秒杀</span>
    <a-form ref="flashKillingForm" class="x-flash-killing-form" :rules="rules" :model="data" @finish="setFlashKilling">
      <a-form-item label="投放时长" name="duration">
        <a-input-number v-model:value="data.formData.duration" :min="1" :max="1440" /> 分钟
      </a-form-item>
      <a-form-item label="投放库存" name="stock">
        <a-input-number placeholder="请输入"  v-model:value="data.formData.stock" :min="1" :max="999999999" /> 可售库存：{{ data.flashKillingData?.discount_activity_info
?.activity_discount_unit_list[0]?.stock }}份

      </a-form-item>
      <a-form-item label="每人限购" name="buyLimit">
        <a-input-number placeholder="请输入" v-model:value="data.formData.buyLimit" :min="1" :max="999" /> 限购区间：1~999
      </a-form-item>
      <a-form-item label="每人限购" name="limitBuy">
        <a-checkbox v-model:checked="data.formData.loop" name="type"> 开启后，库存不足或时间到期，会自动再上秒杀，打造秒杀
的氛围感</a-checkbox>
      </a-form-item>
      <a-form-item class="text-align-right">
        <a-button  class="margin-right-12" @click="isShowFlashKillingModal = false">取消</a-button>
        <a-button type="primary" html-type="submit">确定</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
  <!-- E 秒杀设置弹框 -->
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive, computed } from 'vue'
  import { splitMoney } from '@/hooks'
  import { showTime } from '@/utils/time'
  import { message } from 'ant-design-vue'
  import { PERMANENT_TYPE } from '@/constants'
  import { 
    setRobotAlwaysExplainServer,
    setRobotExplainServer,
    getFlashKillingInfoServer,
    setFlashKillingServer,
    OffShelfServer
  } from '@/api'

  const emit = defineEmits(['updateFlashKilling'])

  defineOptions({
    name: 'ProductItem'
  })

  const props = defineProps({
    productItem: {
      type: Object,
      default: {}
    },
    currentTimestamp: {
      type: Number,
      default: 0
    }, // 当前时间戳
  })

  const data = reactive({
    formData: {
      buyLimit: 5, // 每人限购
      loop: true, // 是否循环
      duration: 10, // 投放时长
      stock: 5 // 投放库存
    },
    flashKillingData: {} as any,
  })

  /**
   * 表单验证规则
   */
  const rules = {
    code: [{ required: true }]
  }

  /**
   * @function 初始化数据
   */
  const initData = (resData) => {
    data.formData.loop = props.productItem?.seckill_loop
    data.formData.buyLimit = resData.result.assign_record.extra_map.user_limit
    data.formData.stock = resData.result.assign_record.left_quantity
    data.formData.duration = (resData.result.assign_record.end_time - resData.result.assign_record.start_time)/60
  }

  /******************************** S 秒杀进度条逻辑 ***********************************/
  // 当前秒杀时间的进度条
  const currentTimeProhress = computed(() => {
    const totalTime = props.productItem.flash_sale.end_time - props.productItem.flash_sale.start_time
    let currentLeftTime = props.productItem.flash_sale.end_time - props.currentTimestamp
    console.log(props.currentTimestamp, currentLeftTime, totalTime, currentLeftTime / totalTime)
    return Math.floor(currentLeftTime / totalTime * 100)
  })

  /**
   * @function 设置进度条文案
   * @param percent 当前进度
   */
  const setProgressText = (percent) => {
    if (percent > 0 && props.productItem.flash_sale.end_time && props.currentTimestamp) {
      return showTime(props.productItem.flash_sale.end_time - props.currentTimestamp)
    }
    // emit('updateFlashKilling')
    return '00:00:00'
  }
  /******************************** S 秒杀进度条逻辑 ***********************************/

  /******************************** S 秒杀逻辑区域 ***********************************/
  /**
   * @function handleCode 验证激活码
   */
  let isShowFlashKillingModal = ref(false)

   /**
   * @function 获取秒杀信息，然后打开秒杀弹框
   */
   const getFlashKillingInfo = async () => {
    // 如果之前没有开过秒杀，则直接打开弹框设置秒杀；不然则获取秒杀详情
    if (!props.productItem.recordId) {
      isShowFlashKillingModal.value = true
      return
    }
    
    const hide = message.loading('加载中...', 0)
    try {
      let resData = await getFlashKillingInfoServer({
        assignRecordId: props.productItem.recordId,
        assistantId: props.productItem.assistantId,
        couponId: props.productItem.couponId
      })
      console.log('获取秒杀信息成功', resData)
      data.flashKillingData = resData.result
      isShowFlashKillingModal.value = true
      initData(resData)
      hide()
    } catch (error) {
      hide()
      message.error(`获取秒杀信息失败:${error.message}`)
    }
  }

  /**
   * @function 设置秒杀信息
   * */
  const setFlashKilling = async () => {
    const hide = message.loading('设置中...', 0)
    // 如果当前商品已经有秒杀，先下架；不然则直接上架
    if (props.productItem?.flash_sale) {
      await offShelf()
    }

    try {
      let { buyLimit, duration, loop, stock } = data.formData
      await setFlashKillingServer({
        assign_quantity: stock, // 秒杀库存
        assign_time_type: 1,
        assistant_id: props.productItem.assistantId, // 助手ID
        count_down_seconds: 0,
        count_down_switch: false,
        component_id: props.productItem.groupon_id,
        coupon_id: props.productItem.couponId,
        draw_rule: {
          rule_name: "",
          rule_target: "",
          rule_type: 10,
          term_list: [
            {
              term_function: 1,
              term_sign: 21,
              term_type: 11,
              term_value: buyLimit // 单人购买限制
            }
          ]
        },
        "scence": 1,
        "seckill_loop": loop ? 1 : 0,
        "time_interval": duration*60
      })
      message.success('设置成功')
      emit('updateFlashKilling')
      isShowFlashKillingModal.value = false
      hide()
    } catch (error) {
      isShowFlashKillingModal.value = false
      hide()
      message.error(`设置秒杀失败，${error.message}`)
    }
  }

  /**
   * @function 秒杀上下架
   * */
   const offShelf = async () => {
    try {
      let resData = await OffShelfServer({
        assignRecordId: props.productItem.recordId,
        assistantId: props.productItem.assistantId,
        couponId: props.productItem.couponId
      })
      emit('updateFlashKilling')
      message.success('秒杀下架成功')
      console.log(resData)
    } catch (error) {
      message.error(`秒杀下架失败，${error.message}`)
      console.log('设置讲解失败')
    }
  }

  /******************************** E 秒杀逻辑区域 ***********************************/

  /******************************** S 讲解逻辑区域 ***********************************/
  /**
   * @function 商品讲解
   * @param operationd // 3讲解，4取消讲解
   */
   const explain = async (operation: number) => {
    const hide = message.loading('设置中...', 0)
    try {
      let resData = await setRobotExplainServer({
        cardId: props.productItem.id,
        assistantId: props.productItem.assistantId,
        operation
      })
      hide()
      console.log(resData)
    } catch (error) {
      hide()
      message.error(`设置讲解失败:${error.message}`)
    }
  }
  /**
   * @function 商品一直讲解
   * @param id 商品id
   */
   const alwaysExplain = async () => {
    const hide = message.loading('设置中...', 0)
    try {
      let resData = await setRobotAlwaysExplainServer({
        cardId: props.productItem.id,
        assistantId: props.productItem.assistantId,
        open: props.productItem.permanentOpen === PERMANENT_TYPE.open ? PERMANENT_TYPE.close : PERMANENT_TYPE.open
      })
      emit('updateFlashKilling')
      hide()
      message.success('设置成功')
      console.log(resData)
    } catch (error) {
      hide()
      message.error(`设置一直讲解失败:${error.message}`)
    }
  }

  /**
   * @function 点击开启常驻讲解，先开讲解，再设置常驻
   */
  const setAlwaysExplain = async () => {
    console.log(props.productItem.permanentOpen, props.productItem.permanentOpen === PERMANENT_TYPE.open)
    // 如果是一直讲解状态，先取消讲解，再取消常驻
    await explain(props.productItem.permanentOpen === PERMANENT_TYPE.open ? PERMANENT_TYPE.reject : PERMANENT_TYPE.openOnce)
    alwaysExplain()
  }
  /******************************** E 讲解逻辑区域 ***********************************/

/******************************** S 生命周期钩子函数业务逻辑 ***********************************/
onMounted(() => {
  console.log('ScenePage ~ onMounted')
})
/******************************** E 生命周期钩子函数业务逻辑 ***********************************/
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
