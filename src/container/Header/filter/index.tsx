import { MODAL } from "@/utils/constants/GlobalConst"
import { VscSettings } from "react-icons/vsc"
import ModalFilters from "./modal"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"

const Filter = () => {
    const dispatch = useAppDispatch()

    return (
        <>
            <div
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow-md shadow-black/10 transition duration-150 hover:scale-105 hover:shadow-xl`}
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(openModal({ type: MODAL.FILTER.ROOM_FINDING }))
                }}
            >
                <VscSettings size={24} />
                <p className="text-sm font-medium">Filters</p>
            </div>
            <ModalFilters />
        </>
    )
}

export default Filter
