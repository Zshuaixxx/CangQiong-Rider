//密码登录传参
export type passwordLoginParam = {
  phone: string
  password: string
}

//微信登录传参
export type weixinLoginParam = {
  code: string
  avatar: string
  name: string
}

// 登录返回结果
export type loginResult = {
  id: string
  token: string
  openid: string
}
