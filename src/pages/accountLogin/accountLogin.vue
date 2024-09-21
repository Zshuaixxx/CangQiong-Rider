<script setup lang="ts">
import { ref } from 'vue'
import { passwordLogin } from '@/api/login'
import { useRiderStore } from '@/stores'

const riderStore = useRiderStore()

const riderPhone = ref()
const riderPassword = ref()

//密码登录
const login = async () => {
  const passwordLoginParam = {
    phone: riderPhone.value,
    password: riderPassword.value,
  }
  const res = await passwordLogin(passwordLoginParam)
  riderStore.setloginInfo(res.data)
  uni.showToast({
    title: '登录成功',
    icon: 'success',
  })
  //跳转到订单广场
  setTimeout(() => {
    uni.switchTab({ url: '/pages/index/index' })
  }, 500)
}
// 微信登录
const weixinLogin = () => {
  uni.navigateTo({
    url: '/pages/weixinLogin/weixinLogin',
  })
}
//注册
const goRegister = () => {
  uni.navigateTo({
    url: '/pages/register/rigister',
  })
}
</script>

<template>
  <view class="title"> 密码登录 </view>
  <view class="input_box">
    <input v-model="riderPhone" placeholder="请输入手机号" type="tel" class="input" />
    <input v-model="riderPassword" placeholder="请输入密码" password="true" class="input" />
  </view>
  <button @tap="login" class="login">登录</button>
  <button @tap="weixinLogin" class="weixinLogin">微信登录</button>
  <view class="buttom_text"
    >还没有账号？<text class="register" @tap="goRegister">快速注册</text>
  </view>
</template>

<style scoped>
.title {
  margin: 30rpx auto;
  text-align: center;
  font-size: 20px;
}
.input_box {
  padding: 15rpx;
  background-color: #f9f9f9;
}
.input {
  width: 80%;
  height: 100rpx;
  border-radius: 100rpx;
  margin: 10rpx auto;
  padding-left: 50rpx;
  background-color: #fff;
}
.login {
  width: 80%;
  height: 100rpx;
  line-height: 100rpx;
  margin: 30rpx auto;
  background-color: #24acf2;
  color: #fff;
  font-size: 25px;
}
.weixinLogin {
  width: 30%;
  height: 50rpx;
  line-height: 50rpx;
  margin: 100rpx auto;
}
.buttom_text {
  color: #b4b8bc;
  text-align: center;
}
.register {
  color: #000;
  font-weight: 700;
}
</style>
