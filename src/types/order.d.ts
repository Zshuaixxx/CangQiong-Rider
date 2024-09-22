//订单广场查询订单请求参数
export type getOrderDTO = {
  //页码
  page: number
  //每页数量
  size: number
  //骑手位置纬度
  latitude: number
  //骑手位置经度
  longitude: number
  //行政区划编码
}
