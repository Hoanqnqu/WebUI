import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import Modal from "./Modal"
import DeleteModal from "./DeleteModal"
import ViewModal from "./ViewModal"

const ModalProps = () => {
    const type = useAppSelector((state) => state.modal.type)

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.ROOM:
            case MODAL.UPDATE.ROOM:
                return <Modal />
            case MODAL.VIEW.ROOM:
                return <ViewModal />
            case MODAL.DELETE.ROOM:
                return <DeleteModal />
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalProps
