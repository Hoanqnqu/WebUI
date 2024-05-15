import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    moveInDate: "",
    leaseTerm: "",
    numberOfTenants: ""
}

const contractSlice = createSlice({
    name: "contract",
    initialState,
    reducers: {
        setContract: (state, action) => {
            state.moveInDate = action.payload.moveInDate
            state.leaseTerm = action.payload.leaseTerm
            state.numberOfTenants = action.payload.numberOfTenants
        },
        resetContract: (state) => {
            state.moveInDate = initialState.moveInDate
            state.leaseTerm = initialState.leaseTerm
            state.numberOfTenants = initialState.numberOfTenants
        }
    }
})

export const { setContract, resetContract } = contractSlice.actions

export default contractSlice.reducer
