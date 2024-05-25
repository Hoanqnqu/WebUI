import { IUser } from "@/interfaces/user.interface"
import { useAppSelector } from "@/redux/hook"
import { useMenuActions } from "./hooks/useMenuActions"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { Dropdown, Space, Spin } from "antd"
import TableAntd from "@/components/Table"
import { FaEllipsis } from "react-icons/fa6"
import {  useGetUsersQuery  } from "@/redux/services/users/user.service"

const TableManageUsers = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetUsersQuery(keyword)
    console.log(data)
    const users = data as IUser[]
    const getMenuActions = useMenuActions()
    console.log(users)
    const columns: ColumnsType<IUser> = [
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
            width: "18%",
            sorter: (a, b) => a.name?.localeCompare(b.name),
            render: (record: IUser) => (
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={record.image_url}/>
                    <span className="ml-2 text-sm font-semibold">{record.name}</span>
                </div>
            )   
        },
        {
            title: <span className="font-bold">Email</span>,
            dataIndex: "email",
            key: "email",
            width: "18%",
            sorter: (a, b) => a.email?.localeCompare(b.email),
            render: (email: string) => <span className="text-sm font-medium">{email}</span>
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "10%",
            align: "center" as AlignType,
            render: (record: IUser) => {
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
            <TableAntd dataSource={users} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageUsers
