import { useLocation } from "react-router-dom"
import { useAppDispatch } from "@/redux/hook"
import { useEffect } from "react"
import { resetKeyword, setKeyword } from "@/redux/features/search/search.slice"

const Search = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        dispatch(setKeyword(target.value))
    }

    useEffect(() => {
        dispatch(resetKeyword())
    }, [location])

    return (
        <form onSubmit={(e) => e.preventDefault()} className="w-96">
            <div className="relative">
                <input
                    type="input"
                    className="block w-full rounded-lg bg-white p-2 pl-3 text-sm outline-none ring-1 ring-gray-300 placeholder:text-sm focus:ring-2 focus:ring-primary/40"
                    placeholder="Search..."
                    required
                    onChange={handleSearch}
                />
                <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 ">
                    <svg
                        className="h-4 w-4 transition-all duration-100 hover:scale-110 hover:text-primary"
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
        </form>
    )
}

export default Search
