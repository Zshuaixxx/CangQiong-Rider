<script setup lang="ts">
import { onMounted } from 'vue'
import { getRiderProfileAPI } from '@/api/riderAPI'
import { useRiderStore } from '@/stores'

const riderStore = useRiderStore()

const getRiderProfile = async () => {
  const res = await getRiderProfileAPI(riderStore.loginInfo?.id!)
  console.log(res.data)
}

onMounted(() => {
  getRiderProfile()
})
</script>

<template>
  <view>我的</view>
</template>

<style lang="scss"></style>
