import { Login } from './api'

export const postLogin = (data: { email: string; password: string }) => {
  return Login('/login', data).then((res) => res.data.data)
}

export const postRegister = (data: {
  email: string
  name: string
  password: string
  password_confirmation: string
}) => {
  return Login('/register', data).then((res) => res.data.data)
}
