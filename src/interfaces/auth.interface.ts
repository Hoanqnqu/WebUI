import { IUser } from "./user.interface"

export interface IAuth {
    accessToken: string | null
    userInfo: IUser | null
}
export interface IAccountRegister extends Omit<IUser, "id" | "photo"> {
    password: string
}
export interface IEmail {
    email: string
}
export interface IVerifyCode {
    email: string
    code: string
}
export interface ResetPassword {
    password: string
    code: string
}
export interface IAccountLogin {
    email: string
    password: string
}
export interface INewPassword {
    password: string
    code: string
    email: string
}
export interface IAuthResponse {
    data?: { token: string }
    message: string
    status: string
}
