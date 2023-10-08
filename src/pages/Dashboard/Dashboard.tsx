import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { deleteDestination, getDestination } from '../../api/destination'
import { useDispatch } from 'react-redux'
import {
  DestinationDataProps,
  addDestinationData,
  setDestinationData
} from '../../stores/destination/destinationSlice'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../stores/hook'
import { Button, Input, Popconfirm, Rate, Skeleton, Spin, Tooltip } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  FileImageOutlined,
  EditTwoTone,
  StarTwoTone,
  PlusSquareTwoTone,
  QuestionCircleOutlined,
  DeleteTwoTone
} from '@ant-design/icons'
import EditModal from './EditModal'
import { getLocalStorage } from '../../utils/tokenHandler'
import { useNavigate } from 'react-router-dom'
import { postUserReview, updateUserReview } from '../../api/review'

export interface EditModalProps {
  isOpen: boolean
  id: number | null
  title: string
  description: string
  thumbnail: File | string | null
}

interface ReviewProps {
  index: number | null
  id: number | null
  rating: number
  description: string
  isEdit: boolean
  previousRating: number | undefined
}

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const destination = useAppSelector((state) => state.destination)
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    if (getLocalStorage().token) {
      getDestinationData()
    } else {
      navigate('/login')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const initialModalData = {
    isOpen: false,
    id: null,
    title: '',
    description: '',
    thumbnail: null
  }
  const [editModal, setEditModal] = useState<EditModalProps>(initialModalData)

  const initialReviewData = {
    index: null,
    id: null,
    rating: 0,
    description: '',
    isEdit: false,
    previousRating: undefined
  }
  const [review, setReview] = useState<ReviewProps>(initialReviewData)

  const [isReviewConfirmLoading, setIsReviewConfirmLoading] =
    useState<boolean>(false)

  const getDestinationData = () => {
    setIsLoading(true)
    getDestination()
      .then((res) => {
        dispatch(setDestinationData({ data: res.data, total: res.total }))
        setIsLoading(false)
      })
      .catch((err: AxiosError) => {
        toast.error(err.message)
        setIsLoading(false)

        console.error(err)
      })
  }

  const getNextDestinationData = () => {
    getDestination(Math.floor(destination.data.length / 6) + 1)
      .then((res) => dispatch(addDestinationData(res.data)))
      .catch((err: AxiosError) => {
        toast.error(err.message)

        console.error(err)
      })
  }

  const onChangeModalData = (prop: keyof EditModalProps, value: any) => {
    setEditModal({ ...editModal, [prop]: value })
  }

  const resetReview = () => setReview({ ...initialReviewData })

  const onReviewClick = (
    data: DestinationDataProps,
    index: number,
    rating: number
  ) => {
    const isReviewExist = data.reviews.find((e) => e.user_id === user.id)

    setReview({
      ...review,
      index,
      rating,
      id: isReviewExist?.id || data.id,
      description: isReviewExist?.description || '',
      isEdit: isReviewExist !== undefined,
      previousRating: isReviewExist?.rating || undefined
    })
  }

  const handleReviewSubmit = () => {
    if (review.description === '') return toast.error('Description Required!')

    setIsReviewConfirmLoading(true)

    const submitData = {
      id: review.id as number,
      rating: review.rating,
      description: review.description
    }

    if (review.isEdit)
      return updateUserReview(submitData)
        .then(() => {
          toast.success('Review Submitted')
          setIsReviewConfirmLoading(false)
          resetReview()
          getDestinationData()
        })
        .catch((err: AxiosError) => {
          toast.error(err.message)

          setIsReviewConfirmLoading(false)
          console.error(err)
        })

    postUserReview(submitData)
      .then(() => {
        toast.success('Review Submitted')
        setIsReviewConfirmLoading(false)
        resetReview()
        getDestinationData()
      })
      .catch((err: AxiosError) => {
        toast.error(err.message)

        setIsReviewConfirmLoading(false)
        console.error(err)
      })
  }

  const handleDeleteDestination = (id: number) => {
    setIsLoading(true)
    deleteDestination(id)
      .then(() => {
        getDestinationData()
      })
      .catch((err: AxiosError) => {
        toast.error(err.message)

        console.error(err)
        setIsLoading(false)
      })
  }

  return (
    <Layout>
      <EditModal
        modalData={editModal}
        closeModal={() => setEditModal({ ...initialModalData })}
        onChangeModalData={onChangeModalData}
        getDestinationData={getDestinationData}
      />
      <div className="flex justify-between items-center">
        <h2>
          Travel Destination
          {user.roles.name === 'admin' && (
            <Tooltip
              className="ml-2"
              title="Only yours can be edited, but Admin role can Delete All (Rule from API)"
            >
              <QuestionCircleOutlined />
            </Tooltip>
          )}
        </h2>
        <div>
          {user.roles.permission.Destination.Create && (
            <Button
              type="primary"
              icon={<PlusSquareTwoTone />}
              size={'large'}
              onClick={() =>
                setEditModal({
                  ...initialModalData,
                  isOpen: true
                })
              }
            >
              New
            </Button>
          )}
        </div>
      </div>
      <Skeleton active loading={isLoading}>
        <InfiniteScroll
          dataLength={destination.data.length}
          next={getNextDestinationData}
          hasMore={destination.data.length < destination.total}
          loader={
            <div className="w-full flex justify-center py-12">
              <Spin size="large" />
            </div>
          }
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-1">
            {destination.data.map((v, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow-md relative"
              >
                <div className="flex flex-col absolute right-2 top-2 gap-2">
                  {v.created_by === user.id &&
                    user.roles.permission.Destination.Update && (
                      <Button
                        className="px-2"
                        onClick={() =>
                          setEditModal({
                            ...editModal,
                            isOpen: true,
                            id: v.id,
                            title: v.title,
                            description: v.description,
                            thumbnail: v.thumbnail
                          })
                        }
                      >
                        <EditTwoTone />
                      </Button>
                    )}

                  {user.roles.permission.Destination.Delete && (
                    <Popconfirm
                      title="Delete Destination"
                      description={'Are you sure to delete this destination?'}
                      onConfirm={() => handleDeleteDestination(v.id!)}
                      okButtonProps={{ loading: isLoading }}
                    >
                      <Button className="px-2" danger>
                        <DeleteTwoTone
                          className="cursor-pointer"
                          twoToneColor={'red'}
                        />
                      </Button>
                    </Popconfirm>
                  )}
                </div>

                <div className="h-52 overflow-hidden">
                  {v.thumbnail ? (
                    <img
                      className="w-full min-h-[208px]"
                      src={v.thumbnail}
                      alt={v.title + i}
                    ></img>
                  ) : (
                    <div className="w-full min-h-[208px] bg-gradient-to-t from-sky-500 to-sky-300 flex items-center justify-center">
                      <FileImageOutlined className="text-gray-600 text-2xl" />
                    </div>
                  )}
                </div>
                <div className="p-6 h-52">
                  <p
                    className="m-0 font-semibold text-xl mb-2 line-clamp-1"
                    title={v.title}
                  >
                    {v.title}
                  </p>
                  <Popconfirm
                    className="flex items-center mb-6"
                    placement="topLeft"
                    icon={<StarTwoTone />}
                    title={`${review.isEdit ? 'Edit' : 'Add'} Review`}
                    open={review.index === i}
                    okButtonProps={{ loading: isReviewConfirmLoading }}
                    cancelButtonProps={{ disabled: isReviewConfirmLoading }}
                    description={
                      <div className="flex flex-col gap-2">
                        <div className="flex mb-2">
                          Previous Rating: {review.previousRating || '-'} / 5
                        </div>

                        <Rate
                          allowHalf
                          allowClear={false}
                          value={review.rating}
                          onChange={(e) =>
                            setReview({
                              ...review,
                              index: i,
                              rating: e
                            })
                          }
                        />

                        <Input.TextArea
                          className="w-64"
                          placeholder="Share your experience at this place"
                          autoSize={{ minRows: 2, maxRows: 6 }}
                          value={review.description}
                          onChange={(e) =>
                            setReview({
                              ...review,
                              description: e.target.value
                            })
                          }
                        />
                      </div>
                    }
                    onConfirm={() => handleReviewSubmit()}
                    onCancel={() => resetReview()}
                  >
                    <Rate
                      allowHalf
                      value={v.average_rating}
                      onChange={(e) => onReviewClick(v, i, e)}
                    />
                    <div className="ml-1">({v.reviews.length})</div>
                  </Popconfirm>
                  <p className="line-clamp-6">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </Skeleton>
    </Layout>
  )
}

export default Dashboard
