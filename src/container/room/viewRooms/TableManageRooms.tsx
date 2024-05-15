import TableAntd from "@/components/Table"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Badge, Dropdown, Space } from "antd"
import { useMenuActions } from "../hooks/useMenuActions"
import { IRoom } from "@/interfaces/room.interface"
import { ROOM_STATUS, ROOM_STATUS_COLORS, RoomStatusType } from "@/utils/constants/GlobalConst"
import { convertDate, formatStatus } from "@/utils/helpers"
import { INews } from "@/interfaces/news.interface"

const TableManageNews = ({ news }: { news: INews[] }) => {
    const getMenuActions = useMenuActions()

    const columns: ColumnsType<IRoom> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            key: "id",
            width: "8%",
            render: (_: any, __: any, index: number) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Room Name</span>,
            key: "roomName",
            width: "18%",
        },
        {
            title: <span className="font-bold">Area</span>,
            dataIndex: "area",
            key: "area",
            width: "15%",
            sortDirections: ["ascend", "descend"],
            sorter: (a, b) => a.area - b.area,
            render: (area: number) => <span className="text-sm font-medium">{area}</span>
        },
        {
            title: <span className="font-bold">Price</span>,
            key: "price",
            dataIndex: "price",
            width: "15%",
            sortDirections: ["ascend", "descend"],
            sorter: (a, b) => a.price - b.price,
            render: (price: number) => <span className="text-sm font-medium">{price}</span>
        },
        {
            title: <span className="font-bold">Deposit amount</span>,
            key: "depositAmount",
            dataIndex: "depositAmount",
            width: "15%",
            sortDirections: ["ascend", "descend"],
            sorter: (a, b) => a.depositAmount - b.depositAmount,
            render: (depositAmount: number) => <span className="text-sm font-medium">{depositAmount}</span>
        },
        {
            title: <span className="font-bold">Status</span>,
            key: "status",
            dataIndex: "status",
            width: "15%",
            filters: [
                { text: "Empty", value: ROOM_STATUS.EMPTY },
                { text: "Occupied", value: ROOM_STATUS.OCCUPIED }
            ],
            onFilter: (value, record) => record.status === value,
            render: (status: RoomStatusType) => (
                <Badge
                    color={ROOM_STATUS_COLORS[status]}
                    className="flex items-center text-xs font-medium"
                    text={formatStatus(status)}
                ></Badge>
            )
        },
        {
            title: <span className="font-bold">Delete at</span>,
            key: "deletedAt",
            dataIndex: "deletedAt",
            width: "12%",
            align: "center" as AlignType,
            render: (deletedAt: string) => <span className="text-sm font-medium">{convertDate(deletedAt)}</span>
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "10%",
            align: "center" as AlignType,
            render: (record: IRoom) => {
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
    return <TableAntd dataSource={rooms} columns={columns} rowKey={(record) => record.id} />
}
export default TableManageRooms
