import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    keyword: ""
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setKeyword: (state, action) => {
            state.keyword = action.payload
        },
        resetKeyword: (state) => {
            state.keyword = initialState.keyword
        }
    }
})

export const { setKeyword, resetKeyword } = searchSlice.actions

export default searchSlice.reducer
