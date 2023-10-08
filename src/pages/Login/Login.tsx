import { useState } from 'react'
import { Spin, Typography, Input, Alert, Button, Form } from 'antd'
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'

import { getLocalStorage, setLocalStorage } from '../../utils/tokenHandler'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { postLogin, postRegister } from '../../api/login'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../stores/user/userSlice'
import { getUserDetailData } from '../../api/user'
import { Permission, PermissionProps } from '../../constant'

interface loginDataProps {
  email: string
  name: string
  password: string
  password_confirmation: string
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const initialLoginData: loginDataProps = {
    email: '',
    name: '',
    password: '',
    password_confirmation: ''
  }
  const [loginData, setLoginData] = useState<loginDataProps>({
    ...initialLoginData
  })

  const [form] = Form.useForm()

  const onLoginClick = () => {
    setIsLoading(true)

    if (isRegister) {
      return postRegister(loginData)
        .then((res) => {
          toast.success('User Register Success')

          setIsLoading(false)
          setIsRegister(false)
          resetForm()
        })
        .catch((err: AxiosError) => {
          toast.error(err.message)

          console.error(err)
          setIsLoading(false)
        })
    }

    const data = { email: loginData.email, password: loginData.password }
    postLogin(data)
      .then((res) => {
        setLocalStorage(res)

        getUserDetailData(res.user.id)
          .then((r) => {
            const userData = {
              ...r,
              roles: {
                ...r.roles[0],
                permission: Permission[r.roles[0].name as keyof PermissionProps]
              }
            }
            setLocalStorage({
              ...getLocalStorage(),
              user: { ...userData }
            })

            setIsLoading(false)
            dispatch(setUserData(userData))
            if (userData.roles.name === 'superadmin') {
              navigate('/users')
            } else {
              navigate('/')
            }
          })
          .catch((err: AxiosError) => {
            toast.error(err.message)

            console.error(err)
            setIsLoading(false)
            return err
          })
      })
      .catch((err: AxiosError) => {
        toast.error(err.message)

        console.error(err)
        setIsLoading(false)
        resetForm()
      })
  }

  const resetForm = () => {
    setLoginData({ ...initialLoginData })
    form.resetFields()
  }

  const toggleRegister = () => {
    setIsRegister(!isRegister)
    resetForm()
  }

  return (
    <div className="flex h-screen items-center justify-center bg-login bg-cover">
      <div className="w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-white/50 rounded-md shadow-xl select-none">
        <Spin spinning={isLoading}>
          <Form
            onFinish={onLoginClick}
            className="p-8"
            size="large"
            form={form}
          >
            <Typography.Title level={1}>
              {isRegister ? 'Register' : 'Login'}
            </Typography.Title>

            <Form.Item
              className="mt-8"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!'
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                }
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon mr-1" />}
                placeholder="Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                autoComplete="new-password"
              />
            </Form.Item>

            {isRegister && (
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon mr-1" />}
                  placeholder="Name"
                  value={loginData.name}
                  onChange={(e) =>
                    setLoginData({ ...loginData, name: e.target.value })
                  }
                  autoComplete="new-password"
                />
              </Form.Item>
            )}

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon mr-1" />}
                placeholder="Password"
                visibilityToggle
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                autoComplete="new-password"
              />
            </Form.Item>

            {isRegister && (
              <Form.Item
                name="password_confirmation"
                rules={[
                  { required: true, message: 'Please repeat your password!' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon mr-1" />}
                  placeholder="Repeat Password"
                  visibilityToggle
                  value={loginData.password_confirmation}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      password_confirmation: e.target.value
                    })
                  }
                  autoComplete="new-password"
                />
                {loginData.password !== loginData.password_confirmation && (
                  <Alert
                    className="mt-1"
                    message="Password not match!"
                    type="error"
                    showIcon
                  />
                )}
              </Form.Item>
            )}

            <Form.Item className="mt-4">
              <Button
                className="mb-1 w-full"
                type="primary"
                htmlType="submit"
                size="middle"
              >
                {isRegister ? 'Register' : 'Log in'}
              </Button>
              {isRegister ? (
                <div>
                  Have an account?
                  <div
                    className="ml-1 inline text-blue-500 cursor-pointer hover:text-blue-400 transition"
                    onClick={() => toggleRegister()}
                  >
                    Log in
                  </div>
                </div>
              ) : (
                <div>
                  Don't have an account?
                  <div
                    className="ml-1 inline text-blue-500 cursor-pointer hover:text-blue-400 transition"
                    onClick={() => toggleRegister()}
                  >
                    Sign up
                  </div>
                </div>
              )}
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  )
}

export default Login
