export interface IUser {
    id: number
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    photo: string
    role: string
    googleId?: string
    status?: string
    bankCode?: string
    accountNumber?: string
}

export interface ILandlord {
    id: number
    name: string
    phoneNumber: string
    email?: string
    photo: string
    deletedAt?: string | null
}

export interface IUserQuery {
    keyword: string
}

export interface IUsersResponse {
    data: any
    message: string
    status: string
}

export interface IMyInfoResponse {
    token: any
    message: string
    status: string
}

export interface IUpdatePassword {
    currentPassword: string
    newPassword: string
}

export interface IBecomeHost {
    bankCode: string
    accountNumber: string
    phoneNumber: string
}
export interface ICreateUserRequest extends FormData {}

export interface IUpdateMyInfoRequest extends FormData {}
export interface IUpdateUserRequest {
    id: number
    formData: FormData
}

export interface IDisableUserRequest {
    id: number
    status: string
}

export interface IDeleteUserRequest extends Pick<IUser, "id"> {}

export interface IUpdateInfoUser {
    firstName: string
    lastName: string
    phoneNumber: string
    photo: string
}
