import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice'
import destinationSlice from './destination/destinationSlice'
import usersSlice from './users/users.slice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    destination: destinationSlice,
    users: usersSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
