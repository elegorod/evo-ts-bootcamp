import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { loadData } from "./marsApi"

export interface MarsState {
  sol: number
  solData: SolData[],
  favourites: number[]
}

export interface SolData {
  sol: number
  images: MarsImage[]
}

export interface MarsImage {
  id: number
  src: string
  caption: string
}

const initialState: MarsState = {
  sol: 0,
  solData: [],
  favourites: []
}

export const load = createAsyncThunk(
  "mars/load",
  async (sol: number) => {
    const data = await loadData(sol)
    return { sol: sol, data: data }
  }
)

export const marsSlice = createSlice({
  name: "mars",
  initialState,
  reducers: {
    setSol: (state, action: PayloadAction<number>) => {
      state.sol = action.payload
    },
    addToFavourites: (state, action: PayloadAction<number>) => {
      state.favourites.push(action.payload)
    },
    removeFromFavourites: (state, action: PayloadAction<number>) => {
      state.favourites = state.favourites.filter(_ => _ !== action.payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(load.fulfilled, (state, action) => {
      const sol = action.payload.sol
      let data = state.solData.find(_ => _.sol === sol)
      if (!data) {
        data = { sol: sol, images: [] }
        state.solData.push(data)
      }
      data.images = action.payload.data.photos.map(item => ({
        id: item.id,
        src: item.img_src,
        caption: item.rover.name + ", " + item.camera.full_name
      }))
    })
  }
})

export const { setSol, addToFavourites, removeFromFavourites } = marsSlice.actions

export const selectSol = (state: RootState) => state.mars.sol

export const selectCurrentSolData = (state: RootState) => state.mars.solData.find(_ => _.sol === state.mars.sol)

export const selectInFavourites = (id: number) => (state: RootState) => state.mars.favourites.includes(id)

export const selectFavouriteImages = (state: RootState) => state.mars.solData.flatMap(solData => 
  solData.images.filter(_ => state.mars.favourites.includes(_.id)))

export default marsSlice.reducer
