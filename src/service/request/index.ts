import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { ZYRequestConfig, CreateRequestConfig } from './type'

class ZYrequest {
  instance: AxiosInstance
  constructor(config: CreateRequestConfig) {
    this.instance = axios.create(config)
    // 全局拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config
      },
      (err: any) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data
      },
      (err) => {
        return err
      }
    )
    // 实例拦截器
    this.instance.interceptors.request.use(config.interpectors?.requestSuccessFn, config.interpectors?.requestFailureFn)
    this.instance.interceptors.response.use(config.interpectors?.responseSuccessFn, config.interpectors?.responseFailureFn)
  }
  request<T>(config: ZYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interpectors?.requestSuccessFn) {
        config = config.interpectors.requestSuccessFn(config as any)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interpectors?.responseSuccessFn) {
            res = config.interpectors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }
  get<T>(config: ZYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
}

export default ZYrequest
