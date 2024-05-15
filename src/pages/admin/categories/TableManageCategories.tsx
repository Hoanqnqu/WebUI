import { ICategory } from "@/interfaces/category.interface"
import { useAppSelector } from "@/redux/hook"
import { useMenuActions } from "./hooks/useMenuActions"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { Dropdown, Space, Spin } from "antd"
import TableAntd from "@/components/Table"
import { FaEllipsis } from "react-icons/fa6"
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.service"

const TableManageCategories = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetCategoriesQuery(keyword)
    const utilities = data as ICategory[]
    const getMenuActions = useMenuActions()

    const columns: ColumnsType<ICategory> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            dataIndex: "id",
            key: "id",
            width: "8%",
            render: (_, __, index) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Name</span>,
            key: "name",
            width: "30%",
            render: (record: ICategory) => (
                <div className="flex items-center">
                    <span className="ml-2 text-sm font-semibold">{record?.name}</span>
                </div>
            )
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "10%",
            align: "center" as AlignType,
            render: (record: ICategory) => {
                const menuActions = getMenuActions(record)

                return (
                    <Dropdown menu={{ items: menuActions }} trigger={["click"]} placement="bottomRight" arrow>
                        <Space>
                            <FaEllipsis className="cursor-pointer text-center text-lg" />
                        </Space>
                    </Dropdown>
                )
            }
        }
    ]
    return (
        <Spin spinning={isLoading}>
            <TableAntd dataSource={utilities} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageCategories
