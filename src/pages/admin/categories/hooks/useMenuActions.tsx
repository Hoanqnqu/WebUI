import {  TbTrashX } from "react-icons/tb"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL } from "@/utils/constants/GlobalConst"
import { MenuProps } from "antd"

export const useMenuActions = () => {
    const dispacth = useAppDispatch()

    return (record: any) =>
        [
            {
                label: (
                    <div
                        onClick={() =>
                            dispacth(
                                openModal({
                                    type: MODAL.DELETE.UTILITY,
                                    data: record
                                })
                            )
                        }
                        className="flex justify-between font-medium text-orange-500"
                    >
                        Delete
                        <TbTrashX className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "2"
            }
        ] as MenuProps["items"]
}
