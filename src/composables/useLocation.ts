import { useLocationStore } from '@/stores'
import type { riderLocation } from '@/types/rider'
import { getAdcode } from '@/api/common'
const locationStore = useLocationStore()

const chooseLocation = async () => {
  const resAdcode = await getAdcode()
  if (resAdcode.statusCode !== 200) {
    return uni.showToast({
      title: '获取位置失败',
      icon: 'error',
    })
  }
  if ((resAdcode.data as any).status !== 0) {
    return uni.showToast({
      title: '获取位置失败',
      icon: 'error',
    })
  }
  uni.chooseLocation({
    success: function (res) {
      console.log('位置', res)
      const newLocation: riderLocation = {
        name: res.name,
        address: res.address,
        latitude: res.latitude,
        longitude: res.longitude,
        adcode: (resAdcode.data as any).result.ad_info.adcode,
      }
      locationStore.setlocation(newLocation)
    },
    fail: (fail) => {
      uni.showToast({
        title: '获取位置失败',
        icon: 'error',
      })
    },
  })
}

export { chooseLocation }
