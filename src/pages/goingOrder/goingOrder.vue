<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getGoingOrderListAPI, completeOrderAPI } from '@/api/order'
import { useLocationStore } from '@/stores'
import { calculateMinutesDifference } from '@/utils/time'
import type { SquareOrder } from '@/types/order'

const locationStore = useLocationStore()

const goingOrderList = ref<SquareOrder[]>([])
/**获取进行中的订单列表 */
const getGoingOrderList = async () => {
  const res = await getGoingOrderListAPI({
    page: 1,
    pageSize: 1000,
    latitude: locationStore.location?.latitude!,
    longitude: locationStore.location?.longitude!,
    adcode: locationStore.location?.adcode!,
  })
  goingOrderList.value = res.data
}

/**
 * 订单送达
 */
const completeOrder = async (orderId: number) => {
  const res = await completeOrderAPI(orderId)
  uni.showToast({
    title: '恭喜，订单送达成功',
    icon: 'success',
  })
  getGoingOrderList()
}

/**
 * 查看订单详情
 * @param orderId 订单id
 */
const viewOrderDetail = (orderId: number) => {
  uni.navigateTo({
    url: `/pages/orderDetail/orderDetail?orderId=${orderId}`,
  })
}
onShow(() => {
  getGoingOrderList()
})
</script>

<template>
  <view
    v-for="item in goingOrderList"
    :key="item.id"
    class="order_item"
    @tap="viewOrderDetail(item.id)"
  >
    <view class="price_time">
      <text>{{ '￥' + item.amount }}</text>
      <text>{{ '剩余' + calculateMinutesDifference(item.estimatedDeliveryTime) + '分钟' }}</text>
    </view>
    <view class="address">
      {{ item.address }}
    </view>
    <view class="remark">
      {{ item.remark }}
    </view>
    <view class="distance_time">
      <span class="distance">{{
        item.distance != 0 ? item.distance + '米' : '算力不足，距离计算错误'
      }}</span>
      <span class="time">{{ '送达时间' + item.estimatedDeliveryTime }}</span>
    </view>
    <view class="confirm" @tap.stop="completeOrder(item.id)">确认送达</view>
  </view>
</template>

<style scoped>
page {
  background-color: #f9f9f9;
}
.order_item {
  width: 95%;
  margin: 20rpx auto;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 20rpx;
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
.confirm {
  margin: 15px auto;
  width: 85%;
  height: 100rpx;
  border-radius: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background-color: #2588ff;
  font-size: 20px;
  color: #fff;
}
</style>
