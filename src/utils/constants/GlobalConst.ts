export const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL as string
export const RENTALLY_URL = import.meta.env.VITE_DOMAIN as string
export const CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID as string

export enum ROLE {
    USER = "USER",
    MOD = "MOD",
    ADMIN = "ADMIN"
}

export const ROLE_COLORS = {
    [ROLE.USER]: "#2C839A",
    [ROLE.MOD]: "#1D5868",
    [ROLE.ADMIN]: "#E36414"
}

export enum USER_STATUS {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED",
    REGISTING = "REGISTING"
}

export const USER_STATUS_COLORS = {
    [USER_STATUS.ACTIVE]: "green",
    [USER_STATUS.DISABLED]: "red",
    [USER_STATUS.REGISTING]: "blue"
}

export enum RENTAL_STATUS {
    CREATED = "CREATED",
    APPROVED = "APPROVED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
    REQUEST_BREAK = "REQUEST_BREAK",
    BROKEN = "BROKEN",
    ENDED = "ENDED"
}

export const RENTAL_STATUS_TEXT: Record<RENTAL_STATUS, string> = {
    CREATED: "Created",
    APPROVED: "Approved",
    COMPLETED: "Completed",
    CANCELED: "Canceled",
    REQUEST_BREAK: "Request Break",
    BROKEN: "Broken",
    ENDED: "Ended"
}

export const RENTAL_STATUS_COLORS: Record<RENTAL_STATUS, string> = {
    [RENTAL_STATUS.CREATED]: "#3498db",
    [RENTAL_STATUS.APPROVED]: "#27ae60",
    [RENTAL_STATUS.COMPLETED]: "#f39c12",
    [RENTAL_STATUS.CANCELED]: "#b2b2b2",
    [RENTAL_STATUS.REQUEST_BREAK]: "#f1c40f",
    [RENTAL_STATUS.BROKEN]: "#c0392b",
    [RENTAL_STATUS.ENDED]: "#e74c3c"
}

export enum TRANSACTION_STATUS {
    CREATED = "CREATED",
    PAID = "PAID",
    PAYOUT = "PAYOUT",
    DEPOSITED = "DEPOSITED",
    FAILED = "FAILED"
}

export const TRANSACTION_TYPE_COLOR: Record<TRANSACTION_STATUS, string> = {
    [TRANSACTION_STATUS.CREATED]: "#3498db",
    [TRANSACTION_STATUS.PAID]: "#27ae60",
    [TRANSACTION_STATUS.PAYOUT]: "#f39c12",
    [TRANSACTION_STATUS.DEPOSITED]: "#f1c40f",
    [TRANSACTION_STATUS.FAILED]: "#ff0000"
}

export enum ROOM_STATUS {
    EMPTY = "Empty",
    OCCUPIED = "Occupied"
}

export const ROOM_STATUS_COLORS = {
    [ROOM_STATUS.OCCUPIED]: "green",
    [ROOM_STATUS.EMPTY]: "red"
}

export enum RATING_STATUS {
    NONE = "NONE",
    RATED = "RATED"
}

export enum PAYMENT_STATUS {
    PAID = "PAID",
    UNPAID = "UNPAID"
}

export const PAYMENT_STATUS_COLORS = {
    [PAYMENT_STATUS.PAID]: "#27ae60",
    [PAYMENT_STATUS.UNPAID]: "#b2b2b2"
}

export const PAYMENT_STATUS_TEXT: Record<PAYMENT_STATUS, string> = {
    PAID: "Paid",
    UNPAID: "Unpaid"
}

export type RoleType = keyof typeof ROLE_COLORS
export type UserStatusType = keyof typeof USER_STATUS_COLORS
export type RentalStatusType = keyof typeof RENTAL_STATUS_COLORS
export type RoomStatusType = keyof typeof ROOM_STATUS_COLORS
export type TransactionStatusType = keyof typeof TRANSACTION_TYPE_COLOR
export type PaymentStatusType = keyof typeof PAYMENT_STATUS_COLORS

export enum PAGE {
    USER = "USER",
    ROOM = "ROOM",
    NEWS = "NEWS",


    CATEGORY = "CATEGORY",
}

export const MODAL = {
    ADD: {
        CATEGORY: "ADD_CATEGORY",
        USER: "ADD_USER",
        NEWS: "ADD_NEWS",
    },
    UPDATE: {
        CATEGORY: "UPDATE_CATEGORY",
        USER: "UPDATE_USER",
        NEWS: "UPDATE_NEWS",
    },
    DELETE: {
        CATEGORY: "DELETE_CATEGORY",
        USER: "DELETE_USER",
        NEWS: "DELETE_NEWS",
    },
    DISABLE: {
        USER: "DISABLE_USER",
        ROOM: "DISABLE_ROOM",
        BLOCK: "DISABLE_BLOCK"
    },
    ENABLE: {
        USER: "ENABLE_USER",
        ROOM: "ENABLE_ROOM",
        BLOCK: "ENABLE_BLOCK"
    },
    VIEW: {
        USER: "VIEW_USER",
        NEWS: "VIEW_NEWS",
        BLOCK: "VIEW_BLOCK",
        RENTAL: "VIEW_RENTAL",
        PAYMENT: "VIEW_PAYMENT"
    },
} as const

export const monthFormat = "YYYY-MM"
export const dateFormat = "YYYY-MM-DD"
