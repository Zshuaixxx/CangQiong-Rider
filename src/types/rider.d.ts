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

/**
 * 骑手详细个人信息
 */
export type RiderDetail = {
  /** 骑手ID*/
  id: number

  /** 用户手机号码*/
  phone: string

  /*** 用户密码*/
  password: string

  /** 用户的OpenID*/
  openid: string

  /** 用户的注册时间*/
  registerTime: string

  /**用户的性别信息。0位置 1男 2女*/
  sex: number

  /** 用户的头像地址*/
  avatar: string

  /** 骑手名称*/
  name: string
}
