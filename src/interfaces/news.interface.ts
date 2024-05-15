export interface INews {
    id?: string
    auth: string
    title: string
    description: string
    url: string
    image_url: string
    publish_at: string
    category_ids?: string[]
    deletedAt?: string
}

export interface IListNewsRespone {
    data: {
        news: INews[]
    }
    message: string
    status: string
}

export interface INewsRespone {
    data: {
        roomBlock: INews
    }
    message: string
    status: string
}

export interface INewsQuery {
    keyword: string
}

export interface INewsRequest {
    auth: string
    title: string
    description: string
    url: string
    image_url: string
    publish_at: string
    category_ids?: string[]
}
