/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios, {AxiosRequestConfig, AxiosPromise, AxiosInstance} from 'axios'
import router from '../router'
import store from '@/store'
const qs = require('qs')

/**
 * 根据运行环境
 * 设置baseURL
 */
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://10.10.10.63/'
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.yang143.cn/geek/'
}
/**
 * 配置axios默认值
 */
axios.defaults.baseURL = baseURL
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.timeout = 1000 * 12
axios.defaults.withCredentials = true

interface ApiRequestConfig extends AxiosRequestConfig {
  api: string
  param: Record<string, any>
  config: AxiosRequestConfig
}

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
// const tip = msg => {}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, other: any) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      // tip('登录过期，请重新登录')
      // localStorage.removeItem('token')
      // store.commit('loginSuccess', null)
      // setTimeout(() => {
      //   toLogin()
      // }, 1000)
      break
    // 404请求不存在
    case 404:
      // tip('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

function addInterceptors(instance: AxiosInstance) {
  /**
   * 请求拦截器
   * 每次请求前，如果存在token则在请求头中携带token
   */
  instance.interceptors.request.use(
    config => {
      // 登录流程控制中，根据本地是否存在token判断用户的登录情况
      // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
      // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
      // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
      console.log('状态管理中的token', store.state.base.token)
      const token = store.state.base.token
      token && (config.headers.Authorization = token)
      return config
    },
    error => Promise.reject(error)
  )

  // 响应拦截器
  instance.interceptors.response.use(
    // 请求成功
    res =>
      res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res),
    // 请求失败
    error => {
      const {response} = error
      if (response) {
        // 请求已发出，但是不在2xx的范围
        errorHandle(response.status, response.data.message)
        return Promise.reject(response)
      } else {
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        if (!window.navigator.onLine) {
          store.commit('changeNetwork', false)
        } else {
          return Promise.reject(error)
        }
      }
    }
  )
}

/**
 * 暴露出去的请求方法
 * @param api  请求地址
 * @method method  请求类型
 * @param param  请求参数
 * @param config  请求其他配置（参考Axios）
 */
const callApi = ({
  api,
  method = 'post',
  param,
  config = {}
}: ApiRequestConfig): AxiosPromise => {
  const $ = axios.create(Object.assign(config))
  addInterceptors($)
  const requestData = ['post', 'put', 'patch'].includes(method!)
    ? {data: qs.stringify(param)}
    : {params: param}
  console.log(requestData)

  return $({url: api, method, ...requestData})
}

export default callApi
