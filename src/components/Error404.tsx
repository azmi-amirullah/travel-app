import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../stores/hook'

const Error404 = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)

  const onHomeClick = () => {
    if (user.roles.name === 'superadmin') {
      return navigate('/users')
    }

    navigate('/')
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => onHomeClick()}>
          Back Home
        </Button>
      }
    />
  )
}

export default Error404
