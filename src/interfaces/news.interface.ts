export interface INews {
    id?: string
    author: string
    title: string
    content: string
    description: string
    url: string
    image_url: string
    publish_at: string
    categories?: string[]
    deletedAt?: string
}

export interface IListNewsRespone {
    data: INews[]

    message: string
    status: string
}

export interface INewsRespone {
    message: string
    status: string
}

export interface INewsQuery {
    keyword: string
}

export interface INewsRequest {
    author: string
    title: string
    description: string
    url: string
    image_url: string
    publish_at: string
    categories?: string[]
    content: string
}
