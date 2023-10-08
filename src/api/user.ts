import { DEL, GET, POST } from './api'

export const getUserDetailData = (id: number) => {
  return GET('/user/' + id).then((res) => res.data.data)
}

export const logoutUser = () => {
  return GET('/logout').then((res) => res.data.data)
}

export const getUsers = () => {
  return GET('/user').then((res) => res.data.data)
}

export const deleteUsers = (id: number) => {
  return DEL('/user/delete/' + id).then((res) => res.data.data)
}

export const editUsers = (id: number, role: string) => {
  return POST('/user/role/' + id, { role }).then((res) => res.data.data)
}
