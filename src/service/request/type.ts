import type { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'

export interface ZYRequestInterceptors<T = AxiosResponse> {
  requestSuccessFn: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn: (err: any) => any
  responseSuccessFn: (res: T) => T
  responseFailureFn: (err: any) => any
}

export interface ZYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interpectors?: ZYRequestInterceptors<T>
}

export interface CreateRequestConfig<T = AxiosResponse> extends CreateAxiosDefaults {
  interpectors?: ZYRequestInterceptors<T>
}
