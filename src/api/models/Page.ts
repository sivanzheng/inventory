export interface PageRequest {
	size: number
	page: number
}

export interface SortRequest {
    field?: string
    order?: Order
}

export declare enum Order {
    ASC = "ASC",
    DESC = "DESC"
}