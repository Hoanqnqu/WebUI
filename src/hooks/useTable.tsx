import { ITableSort } from "@/interfaces/table.interface"
import usePagination from "./usePagination"
import useSortTable from "./useSortTable"

export default function useTable({ initialTable }: ITableSort) {
    const { currentPage, onChangePage } = usePagination()
    const { onSort, sortDir, sortField } = useSortTable(initialTable)

    const pagination = { currentPage }
    const sort = { sortField, sortDir }
    const values = { pagination, sort }

    const reset = () => {
        onChangePage(1)
        initialTable &&
            onSort({
                sortDir: initialTable.sortDir,
                sortField: initialTable?.sortField
            })
    }

    const table = {
        values,

        onChangePage,
        onSort,
        reset
    }

    return table
}
