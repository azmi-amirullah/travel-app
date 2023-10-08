import { DEL, GET, POSTImage, PUTImage } from './api'

export const getDestination = (page: number = 1) => {
  return GET(`/destination?limit=6&page=${page}`).then((res) => res.data.data)
}

export const postDestination = (data: {
  title: string
  description: string
  thumbnail: string | File | null
}) => {
  return POSTImage('/destination/create', data).then((res) => res.data.data)
}

export const putDestination = (
  id: number,
  data: {
    title: string
    description: string
    thumbnail: string | File | null
  }
) => {
  let submitData = {}

  submitData = {
    _method: 'PUT',
    title: data.title,
    description: data.description
  }

  if (typeof data.thumbnail !== 'string' && data.thumbnail !== null)
    submitData = { ...submitData, thumbnail: data.thumbnail }

  return PUTImage('/destination/update/' + id, submitData).then(
    (res) => res.data.data
  )
}

export const deleteDestination = (id: number = 1) => {
  return DEL('/destination/delete/' + id).then((res) => res.data.data)
}
