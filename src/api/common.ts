/**
 * 通用接口
 */
import { http } from '@/utils/http'

//获取行政区划编码
export const getAdcode = () => {
  return uni.request({
    url: 'https://apis.map.qq.com/ws/location/v1/ip?ip=&key=XF5BZ-5JDWN-NBMFI-SHGKL-N6ISE-BMBVX',
    method: 'GET',
  })
}
