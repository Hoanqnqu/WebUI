import { createApiWithAuth } from "../apiWithAuth.service"
import {
    INews,
    IListNewsRespone,
    INewsRespone
} from "@/interfaces/news.interface"

const createCategoryWithAuth = createApiWithAuth("newsApi", ["News"])

export const newsApi = createCategoryWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getNews: builder.query<INews[], string>({
            query: (keyword) => ({
                url: `/articles?keyword=${keyword}`
            }),
            transformResponse: (response: IListNewsRespone) => {
                return response.data.news
            },
            providesTags: ["News"]
        }),
        createNews: builder.mutation<INewsRespone, INews>({
            query: (body) => ({
                url: `/news`,
                method: "POST",
                body
            }),
            invalidatesTags: ["News"]
        }),
        updateNews: builder.mutation<INewsRespone, INews>({
            query: ({ id, ...body }) => ({
                url: `/news/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["News"]
        }),
        deleteNews: builder.mutation< INewsRespone,string >({
            query: (id) => ({
                url: `/news/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["News"]
        })
    })
})
export const { useGetNewsQuery } = newsApi