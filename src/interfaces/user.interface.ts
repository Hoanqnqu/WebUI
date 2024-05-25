export interface IUser {
    id: number
    email: string
    name: string
    image_url: string
    role: string
    auth_id: string
}


export interface IUserQuery {
    keyword: string
}

export interface IUsersResponse {
    data: IUser[]
    message: string
    status: string
}

export interface  IUserResponse {
    message: string
    status: string
}


export interface ICreateUserRequest{
    email: string
    name: string
    image_url: string
    role: string
    auth_id: string
}

export interface IUpdateUserRequest {
    id: number
    body: ICreateUserRequest
}

export interface IDisableUserRequest {
    id: number
    status: string
}

export interface IDeleteUserRequest extends Pick<IUser, "id"> {}