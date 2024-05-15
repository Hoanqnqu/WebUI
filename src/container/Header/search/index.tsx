import CustomAutoComplete from "@/components/Autocomplete/CustomAutoComplete"
import { useEffect, useState } from "react"
import { IDistrict, IProvince } from "@/interfaces/location.interface"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"
import { useGetDistrictsQuery, useGetProvincesQuery } from "@/redux/services/help/help.service"
import { Spin } from "antd"

const SearchRoom = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    //province
    const { data: provincesData, isLoading: isLoadingProvinces } = useGetProvincesQuery()

    const [province, setProvince] = useState<IProvince | null>(null)
    const [provinces, setProvinces] = useState<IProvince[]>(provincesData || [])

    //district
    const queryArgs = province !== null ? { province_code: province.code } : { province_code: "" }
    const { data: districtsData, isLoading } = useGetDistrictsQuery(queryArgs)
    const [districts, setDistricts] = useState<IDistrict[]>(districtsData || [])
    const [district, setDistrict] = useState<IDistrict | null>(null)
    // keyword
    const [keyword, setKeyword] = useState<string>(searchParams.get("keyword") || "")
    const [searchParamsObject, setSearchParamsObject] = useState<Record<string, string[]>>({})

    useEffect(() => {
        setProvince(provincesData?.find((province) => province.code === searchParams.get("province")) || null)
        setDistrict(districtsData?.find((district) => district.code === searchParams.get("district")) || null)
    }, [searchParams])

    useEffect(() => {
        setDistricts(districtsData || [])
        setDistrict(districtsData?.find((district) => district.code === searchParams.get("district")) || null)
    }, [districtsData])

    useEffect(() => {
        setProvinces(provincesData || [])
        setProvince(provincesData?.find((province) => province.code === searchParams.get("province")) || null)
    }, [provincesData])

    useEffect(() => {
        if (province === null) setDistricts([])
        setDistrict(null)
    }, [province])

    useEffect(() => {
        const params: [string, string][] = []
        for (const entry of searchParams.entries()) {
            params.push(entry as [string, string])
        }

        const newSearchParamsObject: Record<string, string[]> = {}

        params?.forEach((i) => {
            if (Object.keys(newSearchParamsObject).some((item) => item === i[0])) {
                newSearchParamsObject[i[0]] = [...newSearchParamsObject[i[0]], i[1]]
            } else {
                newSearchParamsObject[i[0]] = [i[1]]
            }
        })

        setSearchParamsObject(newSearchParamsObject)
    }, [searchParams])

    const handleSearch = () => {
        const queryCodesObj = new URLSearchParams()

        // Function to append key-value pairs to the URLSearchParams object
        const appendKeyValuePair = (key: string, value: string | string[]) => {
            if (key !== "utilities") {
                queryCodesObj.set(key, String(value))
            } else {
                queryCodesObj.append(key, String(value))
            }
        }

        // Append each key-value pair from searchParamsObject
        Object.entries(searchParamsObject).forEach(([key, values]) => {
            values.forEach((value) => {
                appendKeyValuePair(key, value)
            })
        })

        // Append additional parameters if they exist
        if (province) appendKeyValuePair("province", province.code)
        else {
            queryCodesObj.delete("province")
        }
        if (district) {
            appendKeyValuePair("district", district.code)
        } else {
            queryCodesObj.delete("district")
        }
        if (keyword) {
            appendKeyValuePair("keyword", keyword)
        } else {
            queryCodesObj.delete("keyword")
        }
        navigate({
            pathname: "/",
            search: createSearchParams(queryCodesObj).toString()
        })
    }

    return (
        <Spin spinning={isLoading || isLoadingProvinces}>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className="flex justify-center"
            >
                <div className=" flex h-14 w-[34rem] flex-row items-center gap-1 rounded-full bg-white shadow-md shadow-black/10">
                    <div className="flex w-40 flex-col justify-center border-r pl-4 focus:rounded-full focus:border">
                        <label className="pl-4 text-[16px] font-bold">City</label>
                        <CustomAutoComplete
                            type={"city"}
                            options={provinces}
                            selectedOption={province}
                            setSelectedOption={setProvince}
                        />
                    </div>
                    <div className="flex w-40 flex-col justify-center border-r pl-4 focus:rounded-full focus:border">
                        <label className="pl-4 text-[16px] font-bold">District</label>
                        <CustomAutoComplete
                            type={"district"}
                            options={districts}
                            selectedOption={district}
                            setSelectedOption={setDistrict}
                        />
                    </div>
                    <div className="flex w-40 flex-1 flex-col justify-center pb-1 pl-4 focus:rounded-full focus:border">
                        <label htmlFor={"headerSearch"} className="pl-4 text-[16px] font-bold">
                            Search
                        </label>
                        <input
                            type="text"
                            id="headerSearch"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search"
                            className="mt-2 h-4 bg-white pl-4 font-inherit text-[13px] text-slate-800 placeholder:text-[13px] placeholder:font-normal placeholder:text-secondaryBlack/80  focus:outline-none focus:ring-0"
                        />
                    </div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            handleSearch()
                        }}
                        className="mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-all duration-150 hover:scale-110"
                    >
                        <svg
                            className="h-4 w-4 transition-all duration-100 hover:scale-110"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default SearchRoom
