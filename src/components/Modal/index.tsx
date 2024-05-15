import { ConfigProvider, Modal } from "antd"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { closeModal } from "@/redux/features/modal/modal.slice"
import { resetPlaceInfo } from "@/redux/features/search-map/search-map.slice"
import "./style.css"

interface IModal {
    title?: string
    children: React.ReactNode
}

const ModalAntd = (props: IModal) => {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.modal.isOpen)

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E36414"
                }
            }}
        >
            <Modal
                open={isOpen}
                onCancel={() => {
                    dispatch(closeModal())
                    dispatch(resetPlaceInfo())
                }}
                footer={null}
                destroyOnClose
            >
                <>{props.children}</>
            </Modal>
        </ConfigProvider>
    )
}

export default ModalAntd
