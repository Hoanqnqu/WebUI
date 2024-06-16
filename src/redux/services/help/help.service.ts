
import { createApiWithAuth } from "../apiWithAuth.service"


const creatApiAuthWithAuth = createApiWithAuth("helpApi", ["Help"])

export const helpApi = creatApiAuthWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        
        UploadImages: builder.mutation<{ status: string; message: string; data: string }, FormData>({
            query: (body) => ({
                url: "/image/upload",
                method: "POST",
                body
            })
        })
    })
})

export const {  useUploadImagesMutation } = helpApi
