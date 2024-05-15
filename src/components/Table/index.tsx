import { ITable } from "@/interfaces/table.interface"
import { Table } from "antd"
import "./styled.css"

const TableAntd = (props: ITable<any>) => {
    const height = window.innerHeight

    let pageSize
    switch (true) {
        case height <= 480:
            pageSize = 5
            break
        case height <= 700:
            pageSize = 8
            break
        default:
            pageSize = 12
            break
    }

    return (
        <Table
            pagination={{
                position: ["bottomCenter"],
                pageSize,
                prevIcon: "Previous",
                nextIcon: "Next",
                showSizeChanger: false,
                responsive: true,
                showLessItems: true
            }}
            dataSource={props.dataSource}
            columns={props.columns}
            rowKey={props.rowKey}
        />
    )
}

export default TableAntd
