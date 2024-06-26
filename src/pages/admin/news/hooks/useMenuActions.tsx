import {  TbEdit, TbTrashX } from "react-icons/tb"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL } from "@/utils/constants/GlobalConst"
import { MenuProps } from "antd"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"

export const useMenuActions = () => {
    const dispacth = useAppDispatch()

    return (record: any) =>
        [
            {
                label: (
                  <div
                    className="flex justify-between font-medium text-gray-500"
                    onClick={() => {
                      dispacth(openModal({ type: MODAL.VIEW.NEWS, data: record }));
                    }}
                  >
                    View
                    <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" />
                  </div>
                ),
                key: "0",
            },
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.UPDATE.NEWS, data: record }))}
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
                        onClick={() =>
                            dispacth(
                                openModal({
                                    type: MODAL.DELETE.NEWS,
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
