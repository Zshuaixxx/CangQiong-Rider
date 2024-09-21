//密码登录传参
export type passwordLoginParam = {
  //手机号
  phone: string
  //密码
  password: string
}

//微信登录传参
export type weixinLoginParam = {
  //微信code
  code: string
  //头像
  avatar: string
  //昵称
  name: string
}

//注册账号传参
export type registerParam = {
  //手机号
  phone: string
  //密码
  password: string
  //昵称
  name: string
}

// 登录返回结果
export type loginResult = {
  // 用户id
  id: string
  // token
  token: string
  //微信openid
  openid: string
}

//注册账号返回结果
export type registerResult = {
  //用户id
  id: string
}
