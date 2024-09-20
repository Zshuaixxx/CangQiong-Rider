import { useRiderStore } from './../stores/modules/rider'

const baseURL = 'localhost:8080'

const RiderStore = useRiderStore()

//请求拦截器
const Interceptor = {
  invoke(options: UniApp.RequestOptions) {
    // console.log('拦截器',options)
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
      // console.log('添加请求路径完成',options.url)
    }
    options.timeout = 10000
    options.header = {
      ...options.header,
    }
    const token = RiderStore.profile?.token
    if (token) {
      options.header.token = token
    }
  },
}
uni.addInterceptor('request', Interceptor)
uni.addInterceptor('uploadFile', Interceptor)

//响应拦截器
interface resdata<T> {
  code: string
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
          resolve(res.data as resdata<T>)
        } else if (res.statusCode === 401) {
          // memberStore.clearProfile()
          uni.showToast({
            icon: 'none',
            text: '请先登录',
          })
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            text: (res.data as resdata<T>).msg || '请求失败',
          })
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          text: '网络错误',
        })
        reject(err)
      },
    })
  })
}
