<script setup lang="ts">
import { getGoingOrderListAPI } from '@/api/order'
import { useLocationStore } from '@/stores'
import { onShow } from '@dcloudio/uni-app'
const locationStore = useLocationStore()

/**获取进行中的订单列表 */
const getGoingOrderList = async () => {
  const res = await getGoingOrderListAPI({
    page: 1,
    pageSize: 10000,
    latitude: locationStore.location?.latitude!,
    longitude: locationStore.location?.longitude!,
    adcode: locationStore.location?.adcode!,
  })
  console.log(res)
}
onShow(() => {
  getGoingOrderList()
})
</script>

<template>
  <div class="goingOrder">goingOrder</div>
</template>

<style scoped></style>
