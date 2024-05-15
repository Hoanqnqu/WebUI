import PageHeader from "@/container/PageHeader"
import TableManageUtilities from "./TableManageCategories"
import TableToolbar from "@/container/Toolbar"
import { PAGE } from "@/utils/constants/GlobalConst"
import Modal from "./modal"

const Category = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Categories Management" />
            <Modal />
            <TableToolbar type={PAGE.UTILITY} />
            <TableManageUtilities />
        </div>
    )
}

export default Category
