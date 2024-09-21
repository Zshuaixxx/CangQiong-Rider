import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { loginResult } from '@/types/login'
// 定义 Store
export const useRiderStore = defineStore(
  'rider',
  () => {
    // 会员信息
    const loginInfo = ref<loginResult>()

    // 保存会员信息，登录时使用
    const setloginInfo = (val: loginResult) => {
      loginInfo.value = val
    }

    // 清理会员信息，退出时使用
    const clearloginInfo = () => {
      loginInfo.value = undefined
    }

    // 记得 return
    return {
      loginInfo,
      setloginInfo,
      clearloginInfo,
    }
  },
  // TODO: 持久化
  {
    // persist: true,
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
