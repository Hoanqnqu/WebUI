import { ICreateUserRequest, IUpdateUserRequest, IUser, IUserQuery, IUsersResponse } from "@/interfaces/user.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const creatApiUserWithAuth = createApiWithAuth("userApi", ["Users"])
export const userApi = creatApiUserWithAuth.injectEndpoints({
  endpoints: (builder) => ({
        getUsers: builder.query<IUsersResponse, IUserQuery>({
            query({ keyword = "" }) {
                return `/users?keyword=${keyword}`
            },
            providesTags: ["Users"]
        }),
        createUser: builder.mutation<IUsersResponse, ICreateUserRequest>({
            query: (body) => ({
                url: `/users`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Users"]
        }),
        updateUser: builder.mutation<IUsersResponse, IUpdateUserRequest>({
            query: ({ id, formData }) => {
                return {
                    url: `/users/${id}`,
                    method: "PATCH",
                    body: formData
                }
            },
            invalidatesTags: ["Users"]
        }),
        deleteUser: builder.mutation<void, Pick<IUser, "id">>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"]
        }),
        getLandLord: builder.query<any, void>({
            query: () => `/users/mods`,
            providesTags: ["Users"]
        })
    })
})

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetLandLordQuery
} = userApi
