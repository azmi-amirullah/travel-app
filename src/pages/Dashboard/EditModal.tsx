import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { EditModalProps } from './Dashboard'
import { FileImageOutlined } from '@ant-design/icons'
import { postDestination, putDestination } from '../../api/destination'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

interface Props {
  modalData: EditModalProps
  closeModal: () => void
  onChangeModalData: (prop: keyof EditModalProps, value: any) => void
  getDestinationData: () => void
}

const EditModal: React.FC<Props> = ({
  modalData,
  closeModal,
  onChangeModalData,
  getDestinationData
}) => {
  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const objectToURL = (blob: Blob | File) => {
    let objectURL = URL.createObjectURL(blob)
    let myImage = new Image()
    return (myImage.src = objectURL)
  }

  const handleSubmit = () => {
    setIsLoading(true)

    if (modalData.id)
      return putDestination(modalData.id, {
        title: modalData.title,
        description: modalData.description,
        thumbnail: modalData.thumbnail!
      })
        .then(() => {
          toast.success('Destination Edited')
          setIsLoading(false)
          closeModal()
          getDestinationData()
        })
        .catch((err: AxiosError) => {
          toast.error(err.message)

          setIsLoading(false)
          console.error(err)
        })

    postDestination({
      title: modalData.title,
      description: modalData.description,
      thumbnail: modalData.thumbnail
    })
      .then(() => {
        toast.success('Destination Created')
        setIsLoading(false)
        closeModal()
        getDestinationData()
      })
      .catch((err: AxiosError) => {
        toast.error(err.message)

        setIsLoading(false)
        console.error(err)
      })
  }

  return (
    <Modal
      title={`${modalData.id ? 'Edit' : 'New'} Destination`}
      open={modalData.isOpen}
      destroyOnClose
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            handleSubmit()
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
      onCancel={() => {
        closeModal()
      }}
      afterOpenChange={() =>
        form.setFieldsValue({
          title: modalData.title,
          description: modalData.description
        })
      }
      okButtonProps={{ loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <Form form={form} className="p-8" layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input title!'
            }
          ]}
        >
          <Input
            placeholder="Title"
            onChange={(e) => onChangeModalData('title', e.target.value)}
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please input description!'
            }
          ]}
        >
          <Input.TextArea
            placeholder="Description"
            onChange={(e) => onChangeModalData('description', e.target.value)}
            autoSize={{ minRows: 2, maxRows: 6 }}
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="file"
            onChange={(e) =>
              onChangeModalData(
                'thumbnail',
                e.target.files ? e.target.files[0] : null
              )
            }
            accept=".jpeg, .png, .jpg"
          />
        </Form.Item>
        <div className="h-52 overflow-hidden">
          {modalData.thumbnail ? (
            <img
              className="w-full"
              src={
                typeof modalData.thumbnail === 'string'
                  ? modalData.thumbnail
                  : objectToURL(modalData.thumbnail)
              }
              alt={modalData.title}
            ></img>
          ) : (
            <div className="w-full min-h-[208px] bg-gradient-to-t from-sky-500 to-sky-300 flex items-center justify-center">
              <FileImageOutlined className="text-gray-600 text-2xl" />
            </div>
          )}
        </div>
      </Form>
    </Modal>
  )
}

export default EditModal
