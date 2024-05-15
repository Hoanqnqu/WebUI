import { IUtiltity, IUtiltityResponse } from "@/interfaces/utility.interface"
import { createApiWithAuth } from "../apiWithAuth.service"
import { IProvince, IDistrict } from "@/interfaces/location.interface"

const creatApiAuthWithAuth = createApiWithAuth("helpApi", ["Help"])

export const helpApi = creatApiAuthWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getUtilities: builder.query<IUtiltity[], void>({
            query: () => ({
                url: "/utilities"
            }),
            transformResponse: (response: IUtiltityResponse) => {
                const utilities = response.data.utilities
                const uniqueNames = new Set<string>()
                const uniqueUtilities: IUtiltity[] = []

                for (const item of utilities) {
                    if (!uniqueNames.has(item.name)) {
                        uniqueNames.add(item.name)
                        uniqueUtilities.push(item)
                    }
                }

                return uniqueUtilities
            }
        }),
        getProvinces: builder.query<IProvince[], void>({
            query: () => ({
                url: "/provinces"
            })
        }),
        getDistricts: builder.query<IDistrict[], { province_code: string }>({
            query: ({ province_code = "" }) => ({
                url: `/provinces/${province_code}/districts`
            })
        }),

        UploadImages: builder.mutation<{ status: string; message: string; data: string[] }, FormData>({
            query: (body) => ({
                url: "/aws/upload",
                method: "POST",
                body
            })
        })
    })
})

export const { useGetUtilitiesQuery, useGetDistrictsQuery, useGetProvincesQuery, useUploadImagesMutation } = helpApi
