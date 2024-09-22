import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { riderLocation } from '@/types/rider'
// 定义 Store
export const useLocationStore = defineStore(
  'location',
  () => {
    // 定位信息
    const location = ref<riderLocation>()

    // 保存定位信息，选择定位信息时使用
    const setlocation = (val: riderLocation) => {
      location.value = val
    }

    // 清理定位信息，重新选择定位信息时使用
    const clearloction = () => {
      location.value = undefined
    }

    // 记得 return
    return {
      location,
      setlocation,
      clearloction,
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
