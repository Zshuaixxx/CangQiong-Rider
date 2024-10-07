import { useRiderStore } from './../stores/modules/rider'

const baseURL = 'http://localhost:8080'

const RiderStore = useRiderStore()

//请求拦截器
const Interceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    options.timeout = 10000
    options.header = {
      ...options.header,
    }
    const token = RiderStore.loginInfo?.token
    if (token) {
      options.header.token = token
    }
  },
}
uni.addInterceptor('request', Interceptor)
uni.addInterceptor('uploadFile', Interceptor)

//响应拦截器
interface resdata<T> {
  code: number
  msg: string
  data: T
}
// const memberStore=useUserStore()
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<resdata<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if ((res.data as resdata<T>).code === 1) {
            resolve(res.data as resdata<T>)
          } else {
            uni.showToast({
              icon: 'none',
              title: (res.data as resdata<T>).msg || '请求失败',
            })
            reject(res)
          }
        } else if (res.statusCode === 401) {
          RiderStore.clearloginInfo()
          uni.showToast({
            icon: 'none',
            title: '请先登录',
          })
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as resdata<T>).msg || '请求失败',
          })
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误',
        })
        reject(err)
      },
    })
  })
}
