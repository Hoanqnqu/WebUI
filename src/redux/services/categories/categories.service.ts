import { createApiWithAuth } from "../apiWithAuth.service"
import {
    ICreateCategoryRequest,
    ICategory,
    ICategoryCUResponse,
    ICategoryResponse
} from "@/interfaces/category.interface"

const createCategoryWithAuth = createApiWithAuth("categoryApi", ["Categories"])

export const categoriesApi = createCategoryWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<ICategory[], string>({
            query: (keyword) => ({
                url: `/categories?keyword=${keyword}`
            }),
            transformResponse: (response: ICategoryResponse) => {
                const utilities = response.data.utilities
                const uniqueNames = new Set<string>()
                const uniqueUtilities: ICategory[] = []

                for (const item of utilities) {
                    if (!uniqueNames.has(item.name)) {
                        uniqueNames.add(item.name)
                        uniqueUtilities.push(item)
                    }
                }

                return uniqueUtilities
            },
            providesTags: ["Categories"]
        }),
        createCategory: builder.mutation<ICategoryCUResponse, ICreateCategoryRequest>({
            query: (body) => ({
                url: `/categories`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Categories"]
        }),
        deleteCategory: builder.mutation<{ id: number }, ICreateCategoryRequest>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Categories"]
        })
    })
})

export const { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation } =
categoriesApi
