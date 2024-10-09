/**
 * 骑手订单相关api
 */

import { http } from '@/utils/http'
import type { getSquareOrderDTO, SquareOrder, OrderDetailDTO, OrderDetail } from '@/types/order'
import type { PageResult } from '@/types/common'
//订单广场查询订单
export const getSquareOrderListAPI = (getSquareOrderDTO: getSquareOrderDTO) => {
  return http<PageResult<SquareOrder>>({
    url: '/rider/order/square',
    method: 'POST',
    data: getSquareOrderDTO,
  })
}

//查看订单详情
export const getOrderDetailAPI = (orderDetailDTO: OrderDetailDTO) => {
  return http<OrderDetail>({
    url: '/rider/order/detail',
    method: 'POST',
    data: orderDetailDTO,
  })
}

//骑手接单
export const takeOrderAPI = (orderId: number) => {
  return http({
    url: `/rider/takeOrder/${orderId}`,
    method: 'POST',
  })
}

/**骑手查看进行中的订单 */
export const getGoingOrderListAPI = (getSquareOrderDTO: getSquareOrderDTO) => {
  return http<SquareOrder[]>({
    url: '/rider/goingOrder',
    method: 'POST',
    data: getSquareOrderDTO,
  })
}
