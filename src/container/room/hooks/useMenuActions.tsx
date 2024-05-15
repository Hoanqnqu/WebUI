import { TbEdit } from "react-icons/tb"
import { TbTrashX } from "react-icons/tb"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL } from "@/utils/constants/GlobalConst"
import { MenuProps } from "antd"
import { IRoom } from "@/interfaces/room.interface"

export const useMenuActions = () => {
    const dispatch = useAppDispatch()

    return (record: IRoom) =>
        [
            {
                label: (
                    <div
                        onClick={() => dispatch(openModal({ type: MODAL.VIEW.ROOM, data: record }))}
                        className="flex justify-between font-medium text-gray-500"
                    >
                        View room <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "0"
            },
            {
                type: "divider"
            },
            {
                label: (
                    <div
                        onClick={() => dispatch(openModal({ type: MODAL.UPDATE.ROOM, data: record }))}
                        className="flex justify-between font-medium text-yellow-500"
                    >
                        Update <TbEdit className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "1"
            },
            {
                type: "divider"
            },
            {
                label: (
                    <div
                        onClick={() => dispatch(openModal({ type: MODAL.DELETE.ROOM, data: record }))}
                        className="flex justify-between font-medium text-red-500"
                    >
                        Delete <TbTrashX className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "2"
            }
        ] as MenuProps["items"]
}
