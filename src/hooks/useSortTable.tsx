import { useState } from "react"
import { ISortParams } from "@/interfaces/table.interface"

const initialSortParams: ISortParams = {
    sortField: [],
    sortDir: ""
}

const useSortTable = (defaultSort: ISortParams = initialSortParams) => {
    const [sortParams, setSortParams] = useState<ISortParams>(defaultSort)

    const onSort = ({ sortDir, sortField }: ISortParams) => {
        setSortParams({ sortField, sortDir })
    }

    const { sortField, sortDir } = sortParams

    return { sortField, sortDir, onSort }
}

export default useSortTable
