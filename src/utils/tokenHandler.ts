import { PermissionOptionsProps } from '../constant'

interface TravelProps {
  user: UserProp
  token: string
}

interface RolesProps {
  id: number
  name: string
  permission: PermissionOptionsProps
}

interface UserProp {
  id: number | null
  name: string
  email: string
  email_verified_at: any
  created_at: string
  updated_at: string
  roles: RolesProps
}

export const setLocalStorage = (props: TravelProps) => {
  localStorage.setItem('travel_app', JSON.stringify(props))
}

export const getLocalStorage: () => TravelProps = () => {
  const user = localStorage.getItem('travel_app')

  if (user) {
    try {
      return JSON.parse(user)
    } catch (error) {
      console.error(error)
      return {}
    }
  } else {
    return {}
  }
}

export const removeLocalStorage = () => {
  localStorage.removeItem('travel_app')
}
