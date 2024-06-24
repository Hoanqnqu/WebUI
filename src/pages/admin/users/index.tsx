import PageHeader from "@/container/PageHeader"
import TableManageUtilities from "./TableManageUsers"
import TableToolbar from "@/container/Toolbar"
import { PAGE } from "@/utils/constants/GlobalConst"
import ModalUser from "./modals"

const User = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Users Management" />
            <ModalUser />
            <TableToolbar type={PAGE.USER} />
            <TableManageUtilities />
        </div>
    )
}

export default User
