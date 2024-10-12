<script setup>
import { onMounted } from 'vue'
import { getRiderDetailAPI } from '@/api/riderAPI'
import { useRiderStore } from '@/stores'
const riderStore = useRiderStore()
const getRiderDetail = async () => {
  const res = await getRiderDetailAPI(riderStore.loginInfo?.id)
  console.log(res)
}
onMounted(() => {
  getRiderDetail()
})
</script>

<template>
  <view>我的详情页面</view>
</template>

<style scoped></style>
