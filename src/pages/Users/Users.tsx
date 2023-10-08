import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../stores/hook'
import { UserProps, setUsersData } from '../../stores/users/users.slice'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { Input, Popconfirm, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { EditTwoTone, DeleteTwoTone, SearchOutlined } from '@ant-design/icons'
import {
  deleteUsers,
  editUsers,
  getUserDetailData,
  getUsers
} from '../../api/user'
import { Roles } from '../../constant'

interface EditModalProps {
  id: number | null
  role: 'user' | 'admin' | 'superadmin'
}

const Users = () => {
  const dispatch = useDispatch()
  const users = useAppSelector((state) => state.users)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [filter, setFilter] = useState<string>('')

  const initialEditUserData: EditModalProps = {
    id: null,
    role: 'user'
  }
  const [editUser, setEditUser] = useState<EditModalProps>(initialEditUserData)

  useEffect(() => {
    initiateData()
  }, [])

  const initiateData = () => {
    setIsLoading(true)
    getUsers()
      .then((res) => {
        dispatch(setUsersData(res))
        setIsLoading(false)
      })
      .catch((err: AxiosError) => {
        toast.error(err.message)

        console.error(err)
        setIsLoading(false)
      })
  }

  const handleDelete = (id: number) => {
    setIsLoading(true)
    deleteUsers(id)
      .then(() => {
        initiateData()
      })
      .catch((err: AxiosError) => {
        toast.error(err.message)

        console.error(err)
        setIsLoading(false)
      })
  }

  const handleEdit = (id: number) => {
    setIsLoading(true)
    editUsers(id, editUser.role)
      .then(() => {
        setEditUser({ ...initialEditUserData })
        initiateData()
      })
      .catch((err: AxiosError) => {
        toast.error(err.message)

        console.error(err)
        setIsLoading(false)
      })
  }

  const column: ColumnsType<UserProps> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Action',
      key: 'action',
      width: '15%',
      render: (_, record) => (
        <div className="flex flex-wrap gap-4">
          <Popconfirm
            zIndex={2}
            title="Edit User Role"
            description={
              <div className="flex flex-col">
                <Select
                  className="w-48"
                  options={Roles.map((v) => ({ value: v, label: v }))}
                ></Select>
              </div>
            }
            onConfirm={() => handleEdit(record.id!)}
            onCancel={() => setEditUser({ ...initialEditUserData })}
            okButtonProps={{ loading: isLoading }}
          >
            <EditTwoTone className="cursor-pointer" />
          </Popconfirm>
          <Popconfirm
            title="Delete User"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.id!)}
            okButtonProps={{ loading: isLoading }}
          >
            <DeleteTwoTone className="cursor-pointer" twoToneColor={'red'} />
          </Popconfirm>
        </div>
      )
    }
  ]

  const filteredData = users.filter((x) => x.name.includes(filter))

  return (
    <Layout>
      <h2>User List</h2>
      <Input
        className="mb-2 w-1/3 "
        allowClear
        size="large"
        addonBefore={<SearchOutlined />}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Table
        className="shadow rounded-lg"
        tableLayout="fixed"
        loading={isLoading}
        columns={column}
        dataSource={filteredData}
      />
    </Layout>
  )
}

export default Users
