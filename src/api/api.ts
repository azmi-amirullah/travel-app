import { config } from 'process'
import { getLocalStorage } from '../utils/tokenHandler'
import axios, { AxiosResponse } from 'axios'

const baseUrl = `https://exampletravelapi.datacakra.com/api`

const axiosInstance = axios.create({
  baseURL: baseUrl
})

const getHeaders = () => {
  return { Authorization: `Bearer ${getLocalStorage().token}` }
}

export const Login = (
  url: string,
  data: { email: string; password: string }
) => {
  return axios.post(baseUrl + url, data)
}

export const Register = (
  url: string,
  data: {
    email: string
    name: string
    password: string
    password_confirmation: string
  }
) => {
  return axios.post(baseUrl + url, data)
}

export const GET = (url: string) => {
  return axiosInstance.get(url, {
    headers: getHeaders()
  })
}

export const POST = (url: string, data: object) => {
  return axiosInstance.post(url, data, {
    headers: getHeaders()
  })
}

export const POSTImage = (url: string, data: object) => {
  return axiosInstance.post(url, data, {
    headers: { ...getHeaders(), 'Content-Type': 'multipart/form-data' }
  })
}

export const PUT = (url: string, data: object) => {
  return axiosInstance.put(url, data, {
    headers: getHeaders()
  })
}

export const PUTImage = (url: string, data: object) => {
  return axiosInstance.post(url, data, {
    headers: { ...getHeaders(), 'Content-Type': 'multipart/form-data' }
  })
}

export const DEL = (url: string) => {
  return axiosInstance.delete(url, {
    headers: getHeaders()
  })
}

export const GETBLOB = (url: string) => {
  return axiosInstance
    .get(url, {
      headers: getHeaders(),
      responseType: 'blob'
    })
    .then((res: AxiosResponse) => {
      let objectURL = URL.createObjectURL(res.data)
      let myImage = new Image()
      return (myImage.src = objectURL)
    })
}
