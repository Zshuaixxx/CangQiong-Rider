//订单广场查询订单请求参数
export type getSquareOrderDTO = {
  //页码
  page: number
  //每页数量
  pageSize: number
  //骑手位置纬度
  latitude: number
  //骑手位置经度
  longitude: number
  //行政区划编码
  adcode: number
}

/**
 * 订单广场订单
 */
export type SquareOrder = {
  //订单id
  id: number
  //订单配送距离
  distance: number
  //订单地址
  address: string
  //订单金额
  amount: number
  //订单截止送到时间
  estimatedDeliveryTime: string
  //订单号
  number: number
  //订单备注
  remark: string
}
