<script setup lang="ts">
import { useRiderStore } from '@/stores'
import { onMounted } from 'vue'

//跳转账号登录
const goAccountLogin = () => {
  uni.navigateTo({
    url: '/pages/accountLogin/accountLogin',
  })
}
//跳转注册页
const goRegister = () => {
  uni.navigateTo({
    url: '/pages/register/rigister',
  })
}
onMounted(() => {
  if (useRiderStore().loginInfo) {
    uni.switchTab({ url: '/pages/index/index' })
  }
})
</script>

<template>
  <view class="container">
    <view class="welcome">欢迎</view>
    <view class="logo_box">
      <image src="@/static/images/logo.png" />
    </view>
    <view class="title">苍穹外卖，使命必达</view>
    <view class="btn">
      <text class="button" @tap="goAccountLogin">登录</text>
      <text class="button" @tap="goRegister">注册</text>
    </view>
  </view>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
  position: relative;
}
.welcome {
  width: 100%;
  height: 60vh;
  background-image: url('@/static/images/loginBackGround.jpg');
  background-size: auto;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  margin: 0 auto;
  text-align: center;
  font-size: 100rpx;
  line-height: 60vh;
}
.logo_box {
  position: absolute;
  width: 250rpx;
  height: 250rpx;
  border-radius: 25px;
  overflow: hidden;
  left: 50%;
  top: 60vh;
  transform: translate(-50%, -50%);
}
.title {
  font-size: 15px;
  color: #333;
  text-align: center;
  margin-top: 200rpx;
}
.btn {
  display: flex;
  margin-top: 50rpx;
  justify-content: center;
  gap: 20rpx;
}
.button {
  width: 250rpx;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  border-radius: 10px;
  background-color: #24acf2;
  color: #fff;
  font-size: 25px;
}
</style>
