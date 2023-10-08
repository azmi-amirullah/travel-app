import { POST, PUT } from './api'

export const postUserReview = (data: {
  id: number
  rating: number
  description: string
}) => {
  return POST('/review/' + data.id, {
    rating: data.rating,
    description: data.description
  }).then((res) => res.data.data)
}

export const updateUserReview = (data: {
  id: number
  rating: number
  description: string
}) => {
  return PUT('/review/update/' + data.id, {
    rating: data.rating,
    description: data.description
  }).then((res) => res.data.data)
}
