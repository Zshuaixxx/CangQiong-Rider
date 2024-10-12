/**
 * 骑手相关接口
 */

import { http } from '@/utils/http'
import type { RiderProfile, RiderDetail } from '@/types/rider'

/**
 * 获取骑手简要信息接口
 * @param riderId 骑手id
 * @returns 骑手简要信息
 */
export const getRiderProfileAPI = (riderId: string) => {
  return http<RiderProfile>({
    url: `/rider/riderProfile/${riderId}`,
    method: 'GET',
  })
}

/**
 * 获取骑手详细个人信息
 * @param riderId 骑手id
 * @returns 骑手详细个人信息:RiderDetail
 */
export const getRiderDetailAPI = (riderId: string) => {
  return http<RiderDetail>({
    url: `/rider/detail/${riderId}`,
    method: 'GET',
  })
}
