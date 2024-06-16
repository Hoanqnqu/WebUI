import PageHeader from "@/container/PageHeader"
import TableManageUtilities from "./TableManageNews"
import TableToolbar from "@/container/Toolbar"
import { PAGE } from "@/utils/constants/GlobalConst"
import ModalNews from "./modals"

const User = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Users Management" />
            <ModalNews/>
            <TableToolbar type={PAGE.NEWS} />
            <TableManageUtilities />
        </div>
    )
}

export default User
