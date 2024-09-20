<script setup lang="ts">
const gologin = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}
</script>

<template>
  <view class="index">index</view>
  <uni-card title="标题"> </uni-card>
  <view @tap="gologin">go login</view>
</template>

<style lang="scss">
//
</style>
