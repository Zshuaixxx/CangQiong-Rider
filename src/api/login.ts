/**
 * 登录注册相关接口
 */

import { http } from '@/utils/http'
import type { passwordLoginParam, loginResult, weixinLoginParam } from '@/types/login'

//账号密码登录
export const passwordLogin = (passwordLoginParam: passwordLoginParam) => {
  return http<loginResult>({
    url: '/rider/login/password',
    method: 'POST',
    data: passwordLoginParam,
  })
}

//微信登录
export const weixinLogin = (weixinLoginParam: weixinLoginParam) => {
  return http<loginResult>({
    url: '/rider/login/weixin',
    method: 'POST',
    data: weixinLoginParam,
  })
}
