import PageHeader from "@/container/PageHeader"
import TableManageUtilities from "./TableManageNews"
import TableToolbar from "@/container/Toolbar"
import { PAGE } from "@/utils/constants/GlobalConst"

const User = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Users Management" />

            <TableToolbar type={PAGE.NEWS} />
            <TableManageUtilities />
        </div>
    )
}

export default User
