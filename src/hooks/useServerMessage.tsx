import { useEffect } from "react"
import { message } from "antd"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { closeModal } from "@/redux/features/modal/modal.slice"

export type TServerMessage = {
    error: any
    data: any
}

function useServerMessage({ data, error }: TServerMessage) {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.modal.isOpen)

    useEffect(() => {
        if (data && (data.status === "success" || data.success === true)) {
            message.success(data.message)
            isOpen && dispatch(closeModal())
        } else if (error) {
            message.error(error.data?.message)
        }
        // eslint-disable-next-line
    }, [data, error, dispatch])
}

export default useServerMessage
