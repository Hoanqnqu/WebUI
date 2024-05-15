import { useState } from "react"
const initialPage = { currentPage: 1 }

const usePagination = () => {
    const [page, setPage] = useState(initialPage)

    const onChangePage = (page: number) => {
        setPage((prevPage) => ({ ...prevPage, currentPage: page }))
    }

    const { currentPage } = page
    return { currentPage, onChangePage }
}

export default usePagination
