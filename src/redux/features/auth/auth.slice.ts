import type { IAuth } from "@/interfaces/auth.interface"
import { IUser } from "@/interfaces/user.interface"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import jwt from "jwt-decode"

const token = localStorage.getItem("jwt")
let decodedToken = null

if (token) {
    try {
        decodedToken = jwt(token) as IUser
    } catch (error) {
        console.error("Error decoding token:", error)
    }
}

const initialState: IAuth = {
    accessToken: token || null,
    userInfo: decodedToken
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                accessToken: string | null
            }>
        ) => {
            const { accessToken } = action.payload
            state.accessToken = accessToken
            state.userInfo = jwt(accessToken as string)
            const user = jwt(accessToken as string)
            console.log(user)
            localStorage.setItem("jwt", accessToken as string)
        },

        logOut: (state) => {
            state.accessToken = null
            localStorage.setItem("jwt", "")
            state.userInfo = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice

export const selectCurrentToken = (state: { auth: IAuth }) => state.auth.accessToken
