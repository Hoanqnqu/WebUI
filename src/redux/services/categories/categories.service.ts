import { createApiWithAuth } from "../apiWithAuth.service"
import {
    ICreateCategoryRequest,
    ICategory,
    ICategoryResponse,
    ICategoriesResponse,
    IUpdateCategoryRequest
} from "@/interfaces/category.interface"

const createCategoryWithAuth = createApiWithAuth("categoryApi", ["Categories"])

export const categoriesApi = createCategoryWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], string>({
            query: (keyword) => ({
                url: `/categories?keyword=${keyword}`
            }),
            transformResponse: (response: ICategoriesResponse) => {
               return response.data
            },
            providesTags: ["Categories"]
        }),
        createCategory: builder.mutation<ICategoryResponse, ICreateCategoryRequest>({
            query: (body) => ({
                url: `/categories`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Categories"]
        }),
        updateCategory: builder.mutation<ICategoryResponse, IUpdateCategoryRequest>({
            query: ({ id, body }) => ({
                url: `/categories/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Categories"]
        }),
        deleteCategory: builder.mutation<ICategoryResponse, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Categories"]
        })
    })
})

export const { useGetCategoriesQuery, useCreateCategoryMutation,useUpdateCategoryMutation, useDeleteCategoryMutation } =
categoriesApi
