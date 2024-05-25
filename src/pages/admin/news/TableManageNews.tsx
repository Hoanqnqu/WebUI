import { INews } from "@/interfaces/news.interface"
import { useAppSelector } from "@/redux/hook"
import { useMenuActions } from "./hooks/useMenuActions"
import { useGetNewsQuery } from "@/redux/services/news/news.service"
import { Dropdown, Space, Spin } from "antd"
import TableAntd from "@/components/Table"
import { ColumnsType } from "antd/es/table"
import { FaEllipsis } from "react-icons/fa6"
import { AlignType } from "rc-table/lib/interface"
const TableManageNews = ()=>{
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetNewsQuery(keyword)
    const news = data as INews[]
    const getMenuActions = useMenuActions()
    const columns: ColumnsType<INews> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            dataIndex: "id",
            key: "id",
            width: "8%",
            render: (_, __, index) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Title</span>,
            key: "name",
            width: "30%",
            render: (record: INews) => (
                <div className="flex items-center">
                    <span className="ml-2 text-sm font-semibold">{record?.title}</span>
                </div>
            )
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "10%",
            align: "center" as AlignType,
            render: (record: INews) => {
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
            <TableAntd dataSource={news} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}
export default TableManageNews