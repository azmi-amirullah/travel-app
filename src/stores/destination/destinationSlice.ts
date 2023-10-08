import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface DestinationProps {
  data: DestinationDataProps[]
  total: number
}

interface ReviewProps {
  id: number
  created_at: string
  updated_at: string
  description: string
  rating: number
  user_id: number
  destination_id: number
}

export interface DestinationDataProps {
  id: number | null
  created_at: string
  updated_at: string
  title: string
  description: string
  thumbnail: string | null
  created_by: number
  average_rating: number
  reviews: ReviewProps[]
}

const initialState: DestinationProps = {
  data: [],
  total: 0
}

export const destinationSlice = createSlice({
  name: 'destination',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDestinationData: (_state, action: PayloadAction<DestinationProps>) => {
      return action.payload
    },
    addDestinationData: (
      state,
      action: PayloadAction<DestinationDataProps[]>
    ) => {
      state.data = [...state.data, ...action.payload]
    }
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  }
})

export const { setDestinationData, addDestinationData } =
  destinationSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.destination

export default destinationSlice.reducer
