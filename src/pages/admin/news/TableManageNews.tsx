import { INews } from "@/interfaces/news.interface"
import { useAppSelector } from "@/redux/hook"
import { useMenuActions } from "./hooks/useMenuActions"
import { useGetNewsQuery } from "@/redux/services/news/news.service"
import { Dropdown, Space, Spin } from "antd"
import TableAntd from "@/components/Table"
import { ColumnsType } from "antd/es/table"
import { FaEllipsis } from "react-icons/fa6"
import { AlignType } from "rc-table/lib/interface"
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.service"
const TableManageNews = ()=>{
    const keyword = useAppSelector((state) => state.search.keyword)
    const categories = useGetCategoriesQuery("");
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
            title: <span className="font-bold">Author</span>,
            key: "auth",
            width: "10%",
            sorter: (a, b) => a.author.length - b.author.length,
            render: (record: INews) => (
              <span className="text-sm font-medium">{record?.author}</span>
            ),
          },
          {
            title: <span className="font-bold">Title</span>,
            key: "title",
            width: "15%",
            sorter: (a, b) => a.title.length - b.title.length,
            render: (record: INews) => (
              <span className="text-sm font-medium">{record?.title}</span>
            ),
          },
          {
            title: <span className="font-bold">Description</span>,
            key: "description",
            width: "40%",
            render: (record: INews) => (
              <span className="text-sm font-medium">{record?.description}</span>
            ),
          },
          {
            title: <span className="font-bold">Category</span>,
            key: "category",
            width: "10%",
            render: (record: INews) => (
              <span className="text-sm font-medium  flex gap-2 ">
                {record?.categories?.map((catId) => {
                  const cat = categories.data?.find((c) => `${c.id}` == catId);
                  return cat ? <span className="p-2 rounded-full bg-[#fff4e6] " key={catId}>{cat.name}{" "}</span> : null;
                }) || []}
              </span>
            ),
          },
          {
            title: <span className="font-bold">Published At</span>,
            key: "publish_at",
            width: "15%",
            sorter: (a, b) => a.publish_at.localeCompare(b.publish_at),
            render: (record: INews) => (
              <div className="flex items-center">
                <span className="ml-2 text-sm font-semibold">
                  {/* <Moment format="YYYY/MM/DD">1976-04-19T12:59-0500</Moment> */}
                  {record?.publish_at}
                </span>
              </div>
            ),
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