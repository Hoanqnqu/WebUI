import { IUtiltity } from "@/interfaces/utility.interface"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { Autocomplete, Slider, TextField, ThemeProvider, createTheme } from "@mui/material"
import { useEffect, useState } from "react"
import ModalAntd from "@/components/Modal"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { closeModal } from "@/redux/features/modal/modal.slice"
import { MODAL } from "@/utils/constants/GlobalConst"
import { formatPrice } from "@/utils/helpers"

const minDistance = 100000

const sliderTheme = createTheme({
    palette: {
        primary: {
            main: "#E36414"
        }
    }
})

const ModalFilters = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const dispacth = useAppDispatch()

    const { data } = useGetUtilitiesQuery()

    const [value, setValue] = useState<number[]>([1000000, 10000000])

    const [selectedOptions, setSelectedOptions] = useState<IUtiltity[]>([])

    const [searchParamsObject, setSearchParamsObject] = useState<Record<string, string[]>>({})

    const type = useAppSelector((state) => state.modal.type)

    useEffect(() => {
        //set value when user change url
        setValue([
            parseInt(searchParams.get("minPrice") || "1000000", 10),
            parseInt(searchParams.get("maxPrice") || "10000000", 10)
        ])
        // set value when user change url
        setSelectedOptions(
            searchParams.getAll("utilities")
                ? (searchParams
                      .getAll("utilities")
                      .map((value: string) => (data ? data.find((utility) => String(utility.id) == value) : undefined))
                      .filter((option) => option !== undefined) as IUtiltity[])
                : []
        )

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

        // eslint-disable-next-line
    }, [searchParams])

    const handleChange = (_: any, value: any) => {
        setSelectedOptions(value)
    }

    const handlePriceChange = (_: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 10000000 - minDistance)
                setValue([clamped, clamped + minDistance])
            } else {
                const clamped = Math.max(newValue[1], minDistance)
                setValue([clamped - minDistance, clamped])
            }
        } else {
            setValue(newValue as number[])
        }
    }

    const handleFilters = () => {
        const queryCodesObj = new URLSearchParams()

        // Function to append key-value pairs to the URLSearchParams object
        const appendKeyValuePair = (key: string, value: string | string[]) => {
            if (key !== "utilities") queryCodesObj.set(key, String(value))
        }

        // Append each key-value pair from searchParamsObject
        Object.entries(searchParamsObject).forEach(([key, values]) => {
            values.forEach((value) => {
                appendKeyValuePair(key, value)
            })
        })

        appendKeyValuePair("minPrice", String(value[0]))
        appendKeyValuePair("maxPrice", String(value[1]))
        selectedOptions.forEach((option) => queryCodesObj.append("utilities", String(option.id)))

        navigate({
            pathname: "/",
            search: createSearchParams(queryCodesObj).toString()
        })
    }

    if (type !== MODAL.FILTER.ROOM_FINDING) return null

    return (
        <ModalAntd>
            <div onClick={(e) => e.stopPropagation()}>
                <h2 className="w-full border-b pb-2 text-center text-xl font-bold">Filters</h2>
                <div className="mt-4">
                    <label className="text-lg font-semibold">Utilities</label>
                    <Autocomplete
                        onChange={handleChange}
                        multiple
                        id="tags-outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                border: "1px solid #e0e0e0",
                                margin: "0.5rem 0 1.5rem",
                                height: "fit-content",
                                minHeight: "2.5rem",
                                width: "100%",
                                fontSize: "0.75rem",
                                borderRadius: "0.5rem",
                                zIndex: "10",
                                "&.Mui-focused fieldset": {
                                    border: "0px solid #fff"
                                }
                            },
                            "& .MuiOutlinedInput-root ": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "0px solid #fff"
                                }
                            }
                        }}
                        options={data || []}
                        getOptionLabel={(option) => option.name}
                        value={selectedOptions}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{
                                    "& .MuiButtonBase-root": {
                                        lineHeight: "20px",
                                        fontSize: "12px"
                                    }
                                }}
                                placeholder="New util"
                            />
                        )}
                    />
                </div>
                <div>
                    <label className="text-lg font-semibold">Price range</label>
                    <div className="mt-4">
                        <div className="my-6 px-2">
                            <ThemeProvider theme={sliderTheme}>
                                <Slider
                                    step={100000}
                                    min={1000000}
                                    max={10000000}
                                    value={value}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="auto"
                                    disableSwap
                                />
                            </ThemeProvider>
                        </div>
                        <div className="my-4 flex items-center gap-2">
                            <div className="h-12 flex-1 rounded-lg border border-gray-0 px-2">
                                <label htmlFor="minPrice" className="text-xs font-medium text-black">
                                    Minimum
                                </label>
                                <input
                                    id="minPrice"
                                    className="h-5 w-4/5 font-semibold"
                                    value={formatPrice(value[0])}
                                />
                            </div>
                            <p className="text-[40px] font-thin">-</p>
                            <div className="h-12 flex-1 rounded-lg border border-gray-0 px-2">
                                <label htmlFor="maxPrice" className="text-xs font-medium text-black">
                                    Maximum
                                </label>
                                <input
                                    id="maxPrice"
                                    type="text"
                                    className="h-5 w-4/5 font-semibold"
                                    value={formatPrice(value[1])}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-between border-t pt-3">
                    <button
                        onClick={() => {
                            setValue([1000000, 3000000])
                            setSelectedOptions([])
                        }}
                        className="rounded-xl bg-white px-3 py-2 font-semibold text-black underline underline-offset-2 transition duration-100 hover:text-primary hover:no-underline"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={() => {
                            dispacth(closeModal())
                            handleFilters()
                        }}
                        className="rounded-xl bg-primary px-4 py-2 font-semibold text-white transition duration-100 hover:shadow-md"
                    >
                        Show places
                    </button>
                </div>
            </div>
        </ModalAntd>
    )
}

export default ModalFilters
