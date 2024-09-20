/**
 * 登录注册相关接口
 */

import { http } from '@/utils/http'
import type { passwordLoginParam, loginResult } from '@/types/login'

//账号密码登录
export const passwordLogin = (passwordLoginParam: passwordLoginParam) => {
  return http<loginResult>({
    url: '/rider/login/password',
    method: 'POST',
    data: passwordLoginParam,
  })
}
