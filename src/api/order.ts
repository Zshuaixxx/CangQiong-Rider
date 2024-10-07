/**
 * 骑手订单相关api
 */

import { http } from '@/utils/http'
import type { getSquareOrderDTO, SquareOrder } from '@/types/order'
import type { PageResult } from '@/types/common'
//订单广场查询订单
export const getSquareOrderListAPI = (getSquareOrderDTO: getSquareOrderDTO) => {
  return http<PageResult<SquareOrder>>({
    url: '/rider/order/square',
    method: 'POST',
    data: getSquareOrderDTO,
  })
}
//骑手接单
export const takeOrderAPI = (orderId: number) => {
  return http({
    url: `/rider/takeOrder/${orderId}`,
    method: 'POST',
  })
}
