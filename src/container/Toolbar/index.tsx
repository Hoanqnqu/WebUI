import Search from "@/components/Search"
import { openModal } from "@/redux/features/modal/modal.slice"
import { useAppDispatch } from "@/redux/hook"
import { MODAL, PAGE } from "@/utils/constants/GlobalConst"
import { FaPlus } from "react-icons/fa6"

interface TableToolbarProps {
    type: PAGE.ROOM | PAGE.BLOCK | PAGE.USER | PAGE.UTILITY | PAGE.RENTAL | PAGE.TRANSACTION | PAGE.PAYMENT
}

const TableToolbar: React.FC<TableToolbarProps> = ({ type }) => {
    const dispatch = useAppDispatch()

    if (type === PAGE.TRANSACTION) return null

    if (type === PAGE.RENTAL || type === PAGE.PAYMENT)
        return (
            <div className="mb-4 flex justify-between">
                <Search />
            </div>
        )
    return (
        <div className="mb-4 flex justify-between">
            <Search />

            <button
                onClick={() => dispatch(openModal({ type: MODAL.ADD[type] }))}
                className="flex items-center space-x-2 rounded-xl bg-primary px-3 py-2 text-white"
            >
                <FaPlus className="h-3 w-3" />
                <span className="text-xs font-bold tracking-wide">Add new</span>
            </button>
        </div>
    )
}

export default TableToolbar
