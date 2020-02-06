import axios from 'axios'
import { API_URL } from '@/common/config'

export const ApiService = (options = {}) => {
  return axios.create({
    baseURL: API_URL,
    ...options

  })
}
