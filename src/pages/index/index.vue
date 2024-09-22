<script setup lang="ts">
import { onMounted } from 'vue'
import { useLocationStore } from '@/stores'
import { chooseLocation } from '@/composables/useLocation'
const locationStore = useLocationStore()
// import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js'
// const qqmapsdk = new QQMapWX({
//   key: 'XF5BZ-5JDWN-NBMFI-SHGKL-N6ISE-BMBVX', //申请的key
// })
onMounted(() => {
  if (!locationStore.location) {
    uni.showToast({
      title: '请先选择接单位置',
      icon: 'none',
    })
    chooseLocation()
  }
})
</script>

<template>
  <view>index</view>
</template>

<style scoped></style>
