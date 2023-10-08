import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getLocalStorage } from '../../utils/tokenHandler'
import {
  Permission,
  PermissionProps,
  PermissionOptionsProps
} from '../../constant'

interface RolesProps {
  id: number
  name: string
  permission: PermissionOptionsProps
}

interface UserProps {
  id: number | null
  name: string
  email: string
  email_verified_at: any
  created_at: string
  updated_at: string
  roles: RolesProps
}

const initialState: UserProps = getLocalStorage().user || {
  id: null,
  name: '',
  email: '',
  email_verified_at: null,
  created_at: '',
  updated_at: '',
  roles: {}
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserData: (_state, action: PayloadAction<UserProps>) => {
      return action.payload
    }

    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  }
})

export const { setUserData } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
