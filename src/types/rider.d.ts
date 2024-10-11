//骑手接单定位信息
export type riderLocation = {
  //位置名称
  name: string
  //详细地址
  address: string
  //经度
  longitude: number
  //纬度
  latitude: number
  //行政区划编码
  adcode: number
}

/**
 * 骑手简要信息
 */
export type RiderProfile = {
  /**骑手id */
  id: number
  /**骑手头像 */
  avatar: string
  /**骑手名称 */
  name: string
  /**今日收益 */
  todayIncome: number
  /**本月收益 */
  monthIncome: number
}
