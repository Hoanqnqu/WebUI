import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import ModalAdd from "./modalAdd"

import { ICategory } from "@/interfaces/category.interface"
import ModalDelete from "./modalDelete"
import ModalUpdate from "./modalUpdate"

const ModalCategory = () => {
    const type = useAppSelector((state) => state.modal.type)
    const data = useAppSelector((state) => state.modal.data) as ICategory
    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.CATEGORY:
                return <ModalAdd title="Add New Category" />
            case MODAL.UPDATE.CATEGORY:
                return <ModalUpdate title="Edit Cateogy Infomation" data={data} />    
            case MODAL.DELETE.CATEGORY:
                return <ModalDelete title="Delete Category" data={data} />
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalCategory
