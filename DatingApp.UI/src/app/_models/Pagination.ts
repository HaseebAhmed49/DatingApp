export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages:number;
}

export class PaginatedResults<T>{
    result?: T | null;
    pagination?: Pagination;
}