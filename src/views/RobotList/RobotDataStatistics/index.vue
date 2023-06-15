<template>
  <root-page class="flex flex-col items-center">
    <div class="x-statistics-box">
      <x-header @back="back" />
    </div>
    
    <!-- S 直播间信息 -->
    <div class="x-room-info-box flex justify-center items-center">
        <a-image
          :width="24"
          :height="24"
          :src="data.roomInfo.cover"
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
          style="border-radius: 50%;"
        />
        <span class="x-nickname">{{ data.roomInfo.nickname }}</span>
        <span class="x-duration">{{ liveTime }}</span>
        <span class="x-create-time">{{ timestampToTime(data.roomInfo.create_time) }}</span>
    </div>
    <!-- E 直播间信息 -->

    <!-- S 直播间数据 -->
    <div class="x-room-data-statistics-box">
      <div class="x-order-money flex flex-col items-center" >
        <span class="x-title">成交订单金额</span>
        <span class="x-value">{{ splitMoney(data?.liveDataStatistics[0]?.value || 0) }}</span>
      </div>
      <ul class="flex items-center" style="flex-wrap: wrap;">
        <template v-for="(item, index) in data.liveDataStatistics" :key="item.key">
          <li class="x-data-item  flex flex-col items-center" v-if="index > 0">
            <span class="x-title">{{ item.name }}</span>
            <span class="x-value">{{ splitMoney(item.value) }}</span>
          </li>
        </template>
      </ul>
    </div>
    <!-- E 直播间数据 -->
  </root-page>
</template>
  
<script setup lang="ts">
import XHeader from '@/components/global/Header/index.vue'
import { routeGoBack, splitMoney } from '@/hooks'
import { timestampToTime, showTime } from '@/utils/time'
import { reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { 
  getRoomInfoServer,
  getRoomDataStatisticsServer
  } from '@/api'

const router = useRoute();
let data = reactive({
  roomInfo: {} as API.RoomInfo,
  liveDataStatistics: {} as API.RoomDataStatistics[],
  currentDuration: 0
})

// 直播时长
let liveTime = computed(() => {
    let time = showTime(data.currentDuration)
    return time
})

/**
 * @function runLiveTime 实时统计运行直播时长
 */
const runLiveTime = () => {
  data.currentDuration++
  setTimeout(runLiveTime, 1000)
}

/******************************** S 获取直播间信息 ***********************************/
/**
 * @function startRobot 获取直播间信息
 */
 const getRoomInfo = async () => {
  try {
    let resData = await getRoomInfoServer({
      id: router.query.id as string
    })
    data.roomInfo = resData.result.data
    data.currentDuration = data.roomInfo.duration
    runLiveTime()
   console.log('直播间信息：', resData)
  } catch (error) {
    message.error(`'获取直播间信息失败：${error.message}`)
  }
}
/**
 * @function startRobot 获取直播间信息
 */
 const getRoomDataStatistics = async () => {
  try {
    let resData = await getRoomDataStatisticsServer({
      id: router.query.id as string
    })
    data.liveDataStatistics = resData.result.data
   console.log('直播数据统计信息：', resData)
  } catch (error) {
    message.error(`'获取直播数据统计信息失败：${error.message}`)
  }
}
/******************************** E 获取直播间信息 ***********************************/


/**
 * @function back 返回上一页
 */
 const back = () => {
  routeGoBack(-1)
}

/******************************** S 生命周期钩子函数业务逻辑 ***********************************/
onMounted( () => {
  getRoomInfo()
  getRoomDataStatistics()
})
/******************************** E 生命周期钩子函数业务逻辑 ***********************************/
</script>

<style lang="less" scoped>@import './index.less';</style>