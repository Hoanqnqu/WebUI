export interface IRoom {
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
export interface IRoomQuery {
    keyword: string
}
