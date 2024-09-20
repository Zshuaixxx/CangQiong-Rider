<script setup lang="ts">
import { ref } from 'vue'
import { weixinLogin } from '@/api/login'
const AvatarDefault =
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const avatarUrl = ref('')
avatarUrl.value = AvatarDefault
const code = ref('')
const name = ref('')
const onChooseAvatar = (e: any) => {
  avatarUrl.value = e.detail.avatarUrl // 更新头像 URL
  console.log('新头像', avatarUrl.value)
}

//点击授权登录
const onweixinLogin = async () => {
  wx.login({
    success(res) {
      if (res.code) {
        code.value = res.code
      } else {
        console.log('登录失败！' + res.errMsg)
        uni.showToast({
          title: '授权登录失败',
          icon: 'error',
        })
        return
      }
      //发送code 头像 昵称到后端
      handleLogin()
    },
  })
}
const handleLogin = async () => {
  const res = await weixinLogin({
    code: code.value,
    avatar: avatarUrl.value,
    name: name.value,
  })
  console.log('微信登录', res)
}
</script>

<template>
  <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
    <image class="avatar" :src="avatarUrl"></image>
  </button>
  <input type="nickname" class="weui-input" placeholder="请输入昵称" v-model="name" />
  <button class="button" @tap="onweixinLogin">授权登录</button>
</template>

<style scoped>
.avatar-wrapper {
  background-color: #fff;
  margin-top: 100rpx;
}
.avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto;
}
.weui-input {
  width: 70%;
  height: 80rpx;
  margin: 0 auto;
  margin-top: 80rpx;
  border-radius: 80rpx;
  padding-left: 40rpx;
  background-color: #f4f4f4;
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
  margin-top: 100rpx;
}
</style>
