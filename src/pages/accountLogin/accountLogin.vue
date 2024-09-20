<script setup>
import { ref } from 'vue'
import { passwordLogin } from '@/api/login'

const riderPhone = ref()
const riderPassword = ref()

//密码登录
const login = async () => {
  const passwordLoginParam = {
    phone: riderPhone.value,
    password: riderPassword.value,
  }
  const res = await passwordLogin(passwordLoginParam)
}
</script>

<template>
  <view class="title"> 密码登录 </view>
  <view class="input_box">
    <input v-model="riderPhone" placeholder="请输入手机号" type="tel" />
    <input v-model="riderPassword" placeholder="请输入密码" password="true" />
  </view>
  <button @click="login">登录</button>
  <button @click="weixinLogin">微信登录</button>
  <view>还没有账号？<text>快速注册</text></view>
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
</style>
