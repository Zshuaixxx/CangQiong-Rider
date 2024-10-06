<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLocationStore } from '@/stores'
import { chooseLocation } from '@/composables/useLocation'
import { getSquareOrderListAPI } from '@/api/order'
import type { getSquareOrderDTO, SquareOrder } from '@/types/order'
const locationStore = useLocationStore()

const page = ref(1)
const pageSize = ref(20)

const squareOrderList = ref<SquareOrder[]>([])
//调用获取广场订单接口
const getSquareOrderList = async (getSquareOrderDTO: getSquareOrderDTO) => {
  const res = await getSquareOrderListAPI(getSquareOrderDTO)
  squareOrderList.value.push(...res.data.records)
}
/**
 * 获取订单剩余时间
 */
const deliveryTime = (inputDateTime: string) => {
  const [datePart, timePart] = inputDateTime.split(' ')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hours, minutes] = timePart.split(':').map(Number)
  const inputDate = new Date(Date.UTC(year, month - 1, day, hours, minutes)) // 月份是从0开始的，所以要减1

  const currentDate = new Date()

  // 计算时间差（毫秒）
  const differenceInMilliseconds = inputDate.getTime() - currentDate.getTime()

  const minutesLast = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60))

  // 返回格式化的时间差字符串
  return '剩余' + minutesLast + '分钟'
}
onMounted(() => {
  if (!locationStore.location) {
    uni.showToast({
      title: '请先选择接单位置',
      icon: 'none',
    })
    chooseLocation()
  }
  const getSquareOrderDTO: getSquareOrderDTO = {
    page: page.value,
    pageSize: pageSize.value,
    latitude: locationStore.location!.latitude,
    longitude: locationStore.location!.longitude,
    adcode: locationStore.location!.adcode,
  }
  getSquareOrderList(getSquareOrderDTO)
})
</script>

<template>
  <view class="container">
    <!-- 顶部接单位置信息 -->
    <view class="header-location">
      <text>{{ '当前接单位置：' + locationStore.location?.name }}</text>
      <text @click="chooseLocation">重新选择</text>
    </view>
    <!-- 订单列表 -->
    <view class="order_list">
      <view v-for="item in squareOrderList" :key="item.id" class="order_item">
        <view class="price_time">
          <text>{{ '￥' + item.amount }}</text>
          <text>{{ deliveryTime(item.estimatedDeliveryTime) }}</text>
        </view>
        <view class="address">
          {{ item.address }}
        </view>
        <view class="remark">
          {{ item.remark }}
        </view>
        <view class="distance_time">
          <span class="distance">{{ item.distance + '米' }}</span>
          <span class="time">{{ '送达时间' + item.estimatedDeliveryTime }}</span>
        </view>
        <view class="grab">抢单</view>
      </view>
    </view>
    <view class="refresh-order">
      <view class="refresh">刷新</view>
    </view>
  </view>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
.header-location {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10rpx;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  height: 80rpx;
  line-height: 80rpx;
  font-size: 32rpx;
  color: #333;
}
.order_list {
  width: 100%;
  flex: 1;
}
.order_item {
  width: 100%;
  background-color: #fff;
  border: 1px solid #eee;
  padding: 20rpx;
}
.price_time {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}
.address {
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  padding: 10rpx 5rpx;
}
.remark {
  margin: 10rpx 0;
  font-size: 15px;
  color: #999;
}
.distance_time {
  display: flex;
  justify-content: space-around;
}
.distance {
  color: #64e7d8;
  background-color: #edfffd;
  padding: 10rpx;
  border-radius: 10rpx;
}
.time {
  color: #ff3737;
  background-color: #ffdbdb;
  padding: 10rpx;
  border-radius: 10rpx;
}
.grab {
  width: 85%;
  height: 100rpx;
  font-size: 30rpx;
  margin: 20rpx auto;
  text-align: center;
  line-height: 100rpx;
  border-radius: 50rpx;
  background-color: #64e7d8;
}
.refresh-order {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.refresh {
  width: 90%;
  height: 80rpx;
  margin: 0 auto;
  line-height: 80rpx;
  text-align: center;
  border-radius: 80rpx;
  font-size: 50rpx;
  color: #fff;
  background-color: #2588ff;
}
</style>
