import type { RootState } from "@/redux/store"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "@/utils/constants/GlobalConst"

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: 'include',
    // mode: "cors",

    prepareHeaders: (headers, { getState }) => {
        // headers.set("Accept", "true")
        headers.set("Content-Type", "application/json")
        // headers.set("Access-Control-Allow-Origin", "*")
        // headers.set("Access-Control-Allow-Credentials", "true")
        // headers.set("Access-Control-Allow-Headers", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
        headers.set("Cross-Origin-Opener-Policy", "unsafe-none")
        const token = (getState() as RootState).auth.accessToken
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const createApiWithAuth = (reducerPath: string, tagTypes: Array<string>) =>
    createApi({
        baseQuery: baseQuery,
        endpoints: () => ({}),
        reducerPath: reducerPath,
        tagTypes: tagTypes
    })
