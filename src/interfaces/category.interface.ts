export interface ICategory {
    name: string
    id: number
}
export interface ICategoriesResponse {
    data: {
        categories: ICategory[]
    }
    message: string
    status: string
}

export interface ICategoryResponse {
    message: string
    status: string
}

export interface ICreateCategoryRequest {
    name: string
}
export interface IUpdateCategoryRequest {
    body: {
        name: string
    }
    id: string
}