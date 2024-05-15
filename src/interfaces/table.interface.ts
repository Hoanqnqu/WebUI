import { TableProps } from "antd"

export interface ITable<T> extends TableProps<T> {}

export interface ITableSort {
    initialTable: ISortParams
}

export interface ISortParams {
    sortDir?: "asc" | "desc" | ""
    sortField?: Array<"id" | "googleId" | "email" | "firstName" | "role" | "phone_number">
}
