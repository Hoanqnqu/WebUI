import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import ModalAdd from "./modalAdd"

import { ICategory } from "@/interfaces/category.interface"
import ModalDelete from "./modalDelete"

const ModalCategory = () => {
    const type = useAppSelector((state) => state.modal.type)
    const data = useAppSelector((state) => state.modal.data) as ICategory
    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.UTILITY:
                return <ModalAdd title="Add New Category" />
            case MODAL.DELETE.UTILITY:
                return <ModalDelete title="Delete Category" data={data} />
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalCategory
