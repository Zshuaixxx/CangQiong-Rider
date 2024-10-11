<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { defineProps, ref } from 'vue'
import {
  getOrderDetailAPI,
  takeOrderAPI,
  completeOrderAPI,
  uploadDeliveryProofAPI,
} from '@/api/order'
import { useLocationStore, useRiderStore } from '@/stores'
import type { OrderDetail, OrderDetailDTO, uploadDeliveryProofDTO } from '@/types/order'
import { getHourMinute, calculateMinutesDifference } from '@/utils/time'

const locationStore = useLocationStore()
const riderStore = useRiderStore()

/**页面跳转传参 */
const query = defineProps<{
  orderId: string
}>()

const orderDetail = ref<OrderDetail>()
const orderDetailDTO = ref<OrderDetailDTO>({
  orderId: Number(query.orderId),
  latitude: locationStore.location?.latitude!,
  longitude: locationStore.location?.longitude!,
})
/**
 *  获取订单详情
 */
const getOrderDetail = async () => {
  const res = await getOrderDetailAPI(orderDetailDTO.value)
  orderDetail.value = res.data
}

/**
 * 点击导航
 */
const goMap = () => {
  uni.openLocation({
    latitude: Number(orderDetail.value?.location?.split(',')![0]),
    longitude: Number(orderDetail.value?.location?.split(',')![1]),
    scale: 18,
  })
}

/**
 * 骑手接单
 * @param orderId 订单id
 */
const takeOrder = async (orderId: number) => {
  const res = await takeOrderAPI(orderId)
  uni.showToast({
    title: '恭喜，抢单成功',
    icon: 'success',
  })
  getOrderDetail()
}

const uploadDeliveryProof = async (deliveryProof: string) => {
  const uploadDeliveryProofDTO: uploadDeliveryProofDTO = {
    deliveryProof: deliveryProof,
    orderId: orderDetail.value?.id!,
  }
  const res = await uploadDeliveryProofAPI(uploadDeliveryProofDTO)
  uni.showToast({
    title: '凭证上传成功',
    icon: 'success',
  })
}

/**拍照凭证 */
const takePhoto = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['camera'],
    success: function (res) {
      uni.uploadFile({
        url: '/admin/common/upload', //仅为示例，非真实的接口地址
        filePath: res.tempFilePaths[0],
        name: 'file',
        success: (res) => {
          const resData = JSON.parse(res.data)
          console.log(resData)
          uploadDeliveryProof(resData.data)
        },
      })
    },
  })
}

/**
 * 订单送达
 */
const completeOrder = async () => {
  const res = await completeOrderAPI(orderDetail.value?.id!)
  uni.showToast({
    title: '恭喜，订单送达成功',
    icon: 'success',
  })
  getOrderDetail()
}

onLoad(() => {
  getOrderDetail()
})
</script>

<template>
  <!-- 时间和距离 -->
  <view class="time_distance">
    <view class="time">
      <text>送达时间：{{ getHourMinute(orderDetail?.estimatedDeliveryTime!) }}</text>
      <text class="time_left"
        >{{ calculateMinutesDifference(orderDetail?.estimatedDeliveryTime!) >= 0 ? '剩余' : '超时'
        }}<text class="time_right">{{
          Math.abs(calculateMinutesDifference(orderDetail?.estimatedDeliveryTime!)) + '分钟'
        }}</text></text
      >
    </view>
    <view class="distance">
      <text>距离目的地：{{ orderDetail?.distance + 'm' }}</text>
      <text class="distance_right" @tap="goMap()">点击导航</text>
    </view>
  </view>
  <!-- 地址 收货人信息 -->
  <view class="address_consigee_box">
    <view class="title">订单地址</view>
    <view class="address_box">
      <text class="user">收</text>
      <text class="address_phone">
        <text class="address">{{ orderDetail?.address }}</text>
        <text class="consigee">{{ orderDetail?.consignee }}</text>
        <text class="phone">{{ orderDetail?.phone }}</text>
      </text>
    </view>
    <view class="remark" v-if="orderDetail?.remark">备注：{{ orderDetail?.remark }}</view>
  </view>
  <!-- 商品 -->
  <view class="title">商品清单</view>
  <view class="order_list">
    <view v-for="item in orderDetail?.orderDetailList!" :key="item.id" class="order_item">
      <view>{{ item.name }}</view>
      <view>{{ item.number + '份' }}</view>
      <view>{{ '￥' + item.amount }}</view>
    </view>
    <view class="order_item">
      <view>餐具数量</view>
      <view>{{
        orderDetail?.tablewareStatus === 1 ? '根据餐量提供' : orderDetail?.tablewareNumber
      }}</view>
      <view>￥0</view>
    </view>
  </view>
  <view style="text-align: end; padding: 20rpx">{{ '合计 ￥' + orderDetail?.amount }}</view>
  <!-- 收入信息 -->
  <!-- 订单信息 -->
  <view class="title">订单信息</view>
  <view class="order_info"
    ><text class="info_name">送达时间</text>
    <text class="info_detail">{{
      orderDetail?.deliveryStatus === 1 ? '立即送达' : '指定时间'
    }}</text></view
  >
  <view class="order_info"
    ><text class="info_name">订单编号</text>
    <text class="info_detail">{{ orderDetail?.number }} </text></view
  >
  <view class="order_info"
    ><text class="info_name">下单时间</text>
    <text class="info_detail">{{ orderDetail?.orderTime }} </text>
  </view>
  <view class="order_info"
    ><text class="info_name">支付时间</text>
    <text class="info_detail">{{ orderDetail?.checkoutTime }} </text>
  </view>
  <!-- 底部拍照 抢单 确实送达  -->
  <!-- 抢单 -->
  <view v-if="orderDetail?.status === 3">
    <view class="grab" @tap.stop="takeOrder(orderDetail.id)">抢单</view>
  </view>
  <!-- 拍照 确认送达 -->
  <view
    v-else-if="
      orderDetail?.status === 4 && orderDetail.riderId === Number(riderStore.loginInfo?.id)
    "
    class="photo_confirm"
  >
    <view @tap="takePhoto()">
      <image
        src="@/static/images/photo.png"
        mode="scaleToFill"
        style="width: 25px; height: 25px; margin: 3px auto"
      />
      <view class="photo">拍照留凭</view>
    </view>
    <view class="confirm" @tap="completeOrder()">确认送达</view>
  </view>
  <!-- 已完成 -->
  <view v-else-if="orderDetail?.status === 5" class="completed">已完成</view>
  <!-- 状态错误 -->
  <view v-else>订单状态错误</view>
</template>

<style scoped>
.time_distance {
  width: 100%;
  padding: 20rpx;
  color: #2588ff;
}
.time .distance {
  width: 100%;
  display: flex;
  margin: 10rpx 0;
  justify-content: space-between;
}
.time_left {
  color: #000;
}
.time_right {
  color: red;
}
.distance_right {
  padding: 5px;
  background-color: #2588ff;
  color: #fff;
  border-radius: 10px;
}
.address_consigee_box {
  padding: 20rpx;
}
.title {
  margin: 25rpx;
  font-size: 20px;
  font-weight: 900;
}
.address_box {
  display: flex;
}
.user {
  width: 50rpx;
  height: 50rpx;
  color: #fff;
  text-align: center;
  line-height: 50rpx;
  background: #2588ff;
  border-radius: 50%;
  margin: 10rpx;
}
.address_phone {
  flex: 1;
}
.address {
  display: block;
  margin: 10rpx 0;
  font-size: 20px;
}
.consigee .phone {
  font-size: 12px;
  color: #999;
  opacity: 0.8;
  padding-right: 50rpx;
}
.remark {
  margin: 15rpx 0;
  padding: 20rpx;
  font-size: 16px;
  font-weight: 700;
}
.order_list {
  padding: 20rpx;
}
.order_item {
  display: flex;
  justify-content: space-between;
}
.order_info {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
}
.info_name {
  font-weight: 700;
  font-size: 14px;
}
.info_detail {
  color: #999;
  opacity: 0.7;
  font-size: 14px;
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
.photo_confirm {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
}
.confirm {
  width: 180rpx;
  height: 80rpx;
  font-size: 30rpx;
  text-align: center;
  line-height: 80rpx;
  border-radius: 50rpx;
  background-color: #64e7d8;
  margin-right: 20rpx;
  color: #fff;
}
.completed {
  width: 80%;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  margin: 20rpx auto;
  background-color: #64e7d8;
  color: #fff;
  border-radius: 50rpx;
}
</style>
