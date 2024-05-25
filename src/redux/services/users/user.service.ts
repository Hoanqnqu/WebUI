import { ICreateUserRequest, IUpdateUserRequest, IUser, IUserResponse, IUsersResponse } from "@/interfaces/user.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const creatApiUserWithAuth = createApiWithAuth("userApi", ["Users"])
export const userApi = creatApiUserWithAuth.injectEndpoints({
  endpoints: (builder) => ({
        getUsers: builder.query<IUser[], string>({ 
            query() {
                return `/users`
            },
            transformResponse: (response: IUsersResponse) => {
                return response.data
             },
            providesTags: ["Users"]
        }),
        createUser: builder.mutation<IUserResponse, ICreateUserRequest>({
            query: (body) => ({
                url: `/users`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Users"]
        }),
        updateUser: builder.mutation<IUserResponse, IUpdateUserRequest>({
            query: ({ id, body }) => {
                return {
                    url: `/users/${id}`,
                    method: "PUT",
                    body
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
    })
})

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi
