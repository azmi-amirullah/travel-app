import React from 'react'
import Layout from '../../components/Layout'
import { useAppSelector } from '../../stores/hook'

import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
import { Card } from 'antd'

const Profile = () => {
  const user = useAppSelector((state) => state.user)
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-8/12 shadow bg-sky-300 rounded-xl overflow-hidden">
          <div className="h-52 overflow-hidden">
            <img
              className="w-full"
              src="https://picsum.photos/600/200"
              alt="img"
            />
          </div>
          <div className="p-8 flex gap-4">
            <div className="rounded-full bg-white p-4">
              <UserOutlined className="text-7xl" />
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="capitalize text-2xl font-bold mb-0">
                {user.name}
                <div className="ml-1 mb-2 lowercase inline-block font-normal text-base">
                  ({user.email})
                </div>
              </div>
              <div className="capitalize">
                Created at: {moment(user.created_at).format('LL')}
              </div>
              <div className="capitalize">Roles: {user.roles.name}</div>
            </div>
          </div>
          <div className="p-8 flex gap-4">
            <Card className="w-full">
              <h3>Reviewed Destination</h3>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
