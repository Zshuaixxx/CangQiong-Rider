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

/**
 * 订单详情DTO
 */
export type OrderDetailDTO = {
  //订单id
  orderId: number
  //骑手位置纬度
  latitude: number
  //骑手位置经度
  longitude: number
}

/**
 * 订单详情
 */
export type OrderDetail = {
  /**
   * 订单id
   *  */
  id: number
  /**
   * 订单号
   */
  number: string
  /**
   * 下单时间
   */
  orderTime: string
  /**
   * 结账时间
   */
  checkoutTime: string
  /**
   * 实收金额
   */
  amount: number
  /**
   * 备注
   */
  remark: string
  /**
   * 手机号
   */
  phone: string
  /**
   * 地址
   */
  address: string
  /**
   * 收货人
   */
  consignee: string
  /**
   * 预计送达时间
   */
  estimatedDeliveryTime: string
  /**
   * 配送状态
   */
  deliveryStatus: number
  /**
   * 餐具数量状态
   */
  tablewareStatus: number
  /**
   * 餐具数量
   */
  tablewareNumber: number
  /**
   * 和骑手距离
   */
  distance: number
  /**
   * 订单商品清单
   */
  orderDetailList: Array<OrderItem>
  /**
   * 经纬度
   */
  location: string
  /**
   *行政区划编码
   */
  adcode: string
  /**
   * 订单状态 1待付款2待接单3已接单4派送中5已完成6已取消7退款
   */
  status: number
  /**
   * 骑手id
   */
  riderId: number
}

/**
 * 订单商品项
 */
export type OrderItem = {
  //商品id
  id: number
  //商品名称
  name: string
  //订单id
  orderId: number
  //菜品id
  dishId: number
  //套餐id
  setmealId: number
  //口味
  dishFlavor: string
  //数量
  number: number
  //金额
  amount: number
  //图片
  image: string
}
