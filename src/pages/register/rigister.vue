<script setup lang="ts">
import { ref } from 'vue'
import type { registerParam } from '@/types/login'
import { registerAPI } from '@/api/login'
const riderPhone = ref('')
const riderPassword = ref('')
const riderName = ref('')
//点击注册
const register = async () => {
  const registerDTO: registerParam = {
    phone: riderPhone.value,
    password: riderPassword.value,
    name: riderName.value,
  }
  const res = await registerAPI(registerDTO)
  uni.showToast({
    title: '注册成功',
    icon: 'success',
  })
  //跳转到登录页面
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}
</script>

<template>
  <view class="title"> 手机号注册 </view>
  <view class="input_box">
    <input v-model="riderPhone" placeholder="请输入手机号" type="tel" class="input" />
    <input v-model="riderPassword" placeholder="请输入密码" password="true" class="input" />
    <input v-model="riderName" placeholder="请输入姓名" type="text" class="input" />
  </view>
  <button @tap="register" class="register">注册</button>
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
.register {
  width: 80%;
  height: 100rpx;
  line-height: 100rpx;
  margin: 30rpx auto;
  background-color: #24acf2;
  color: #fff;
  font-size: 25px;
}
</style>
