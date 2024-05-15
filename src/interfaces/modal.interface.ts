export interface IModal {
    isOpen?: boolean
    type?: any
    id?: string | null | number
    data?: any
    title?: string
    isActive?: boolean
}

export interface IOpenModalPayload {
    type?: any
    id?: string | number
    data?: any
}
