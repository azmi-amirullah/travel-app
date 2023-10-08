import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface UserProps {
  id: number | null
  name: string
  email: string
  email_verified_at: any
  created_at: string
  updated_at: string
}

const initialState: UserProps[] = []

export const usersSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUsersData: (_state, action: PayloadAction<UserProps[]>) => {
      return action.payload
    }

    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  }
})

export const { setUsersData } = usersSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUsers = (state: RootState) => state.users

export default usersSlice.reducer
