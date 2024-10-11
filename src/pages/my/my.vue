<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getRiderProfileAPI } from '@/api/riderAPI'
import { useRiderStore } from '@/stores'
import type { RiderProfile } from '@/types/rider'

const riderStore = useRiderStore()

const riderProfile = ref<RiderProfile>()
const getRiderProfile = async () => {
  const res = await getRiderProfileAPI(riderStore.loginInfo?.id!)
  riderProfile.value = res.data
}

onMounted(() => {
  getRiderProfile()
})
</script>

<template>
  <view class="container">
    <!-- 头像 昵称 -->
    <view class="avatar_name">
      <view class="avatar_box">
        <image
          :src="
            riderProfile?.avatar ? riderProfile?.avatar : '../../static/images/default_avatar.png'
          "
          mode="widthFix"
        />
      </view>
      <view class="name">{{ riderProfile?.name }}</view>
    </view>
    <!-- 收益 -->
    <view class="income">
      <view class="income_item">
        <view class="many">{{ riderProfile?.todayIncome }}</view>
        <view>今日收益/元</view>
      </view>
      <view class="delivery"></view>
      <view class="income_item">
        <view class="many">{{ riderProfile?.monthIncome }}</view>
        <view>当月收益/元</view>
      </view>
    </view>
    <!-- 更多 -->
    <view class="more_box">
      <view class="more_item">
        <image src="@/static/images/myOrder.png" class="icon" />
        <view class="more_item_text">我的订单</view>
        <image src="@/static/images/right.png" class="icon" />
      </view>
      <view class="more_item">
        <image src="@/static/images/myIncome.png" class="icon" />
        <view class="more_item_text">我的收益</view>
        <image src="@/static/images/right.png" class="icon" />
      </view>
      <view class="more_item">
        <image src="@/static/images/myInfo.png" class="icon" />
        <view class="more_item_text">我的信息</view>
        <image src="@/static/images/right.png" class="icon" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding-left: 30rpx;
  padding-right: 30rpx;
}
.avatar_name {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 30rpx 0;
}
.avatar_box {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  overflow: hidden;
}
.name {
  margin-left: 30rpx;
  font-size: 40rpx;
  font-weight: 700;
}
.income {
  display: flex;
  justify-content: space-evenly;
  background-color: #5975ff;
  color: #fff;
  border-radius: 20rpx;
  padding: 20rpx 40rpx;
}
.delivery {
  border: 0.5px solid #fff;
}
.income_item {
  text-align: center;
}
.many {
  font-size: 30px;
  font-weight: 900;
}
.more_box {
  margin: 60rpx 0;
}
.more_item {
  position: relative;
  margin: 40rpx 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon {
  width: 20px;
  height: 20px;
}
.more_item_text {
  position: absolute;
  left: 40px;
}
</style>
