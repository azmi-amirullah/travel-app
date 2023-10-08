import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Popover } from 'antd'
import { useAppSelector } from '../stores/hook'
import { useNavigate } from 'react-router-dom'
import { removeLocalStorage } from '../utils/tokenHandler'
import { logoutUser } from '../api/user'
import { AxiosError } from 'axios'

const Layout = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate()

  const user = useAppSelector((state) => state.user)

  const pathName = window.location.pathname

  return (
    <div>
      <div className="bg-sky-400 h-14 flex items-center gap-4 px-4 sm:px-10 md:px-16 lg:px-32 2xl:px-80">
        <h2 className="cursor-pointer" onClick={() => navigate('/')}>
          Travel App
        </h2>
        <div className="grow flex flex-row-reverse items-center gap-2">
          {user.roles.permission.User.Read && (
            <div
              className={`${
                pathName === '/users' && 'bg-sky-300'
              } hover:bg-sky-300 rounded cursor-pointer h-10 flex items-center px-4`}
              onClick={() => navigate('/Users')}
            >
              <div>Users</div>
            </div>
          )}
          {user.roles.permission.Destination.Read && (
            <div
              className={`${
                pathName === '/' && 'bg-sky-300'
              }  hover:bg-sky-300 rounded cursor-pointer h-10 flex items-center px-4`}
              onClick={() => navigate('/')}
            >
              <div>Destinaton</div>
            </div>
          )}
        </div>

        <Popover
          className="hover:bg-sky-300 h-10 rounded cursor-pointer capitalize flex items-center px-2"
          placement="bottomRight"
          content={PopupAvatar}
          trigger="click"
          arrow={false}
        >
          <Avatar
            className="bg-white text-black mr-2"
            icon={<UserOutlined />}
          />
          {user.name}
        </Popover>
      </div>
      <div className="py-6 px-6 sm:px-14 md:px-20 lg:px-40 xl:px-40 2xl:px-96  ">
        {children}
      </div>
    </div>
  )
}

const PopupAvatar = () => {
  const navigate = useNavigate()

  return (
    <div className="w-52">
      <Button
        className="w-full"
        type="text"
        onClick={() => navigate('/profile')}
      >
        Profile
      </Button>
      <Divider className="my-1" />
      <Button
        className="w-full"
        type="text"
        onClick={() => {
          //for instant logout even when fail in BE
          navigate('/login')
          removeLocalStorage()
          logoutUser().catch((err: AxiosError) => console.error(err))
        }}
      >
        Logout
      </Button>
    </div>
  )
}

export default Layout
