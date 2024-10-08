<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { defineProps, ref } from 'vue'
import { getOrderDetailAPI } from '@/api/order'
import { useLocationStore } from '@/stores'
import type { OrderDetail, OrderDetailDTO } from '@/types/order'

const locationStore = useLocationStore()

//页面跳转传参
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
 * 获取订单详情
 */
const getOrderDetail = async () => {
  const res = await getOrderDetailAPI(orderDetailDTO.value)
  orderDetail.value = res.data
  console.log(res.data)
}

onLoad(() => {
  getOrderDetail()
})
</script>

<template>
  <view class="orderDetail">orderDetail</view>
</template>

<style scoped></style>
