import { BASE_URL, TIMEOUT } from './config'
import ZYrequest from './request'

const zyrequest = new ZYrequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

export default zyrequest
