export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages:number;
}

export class PaginatedResults<T>{
  [x: string]: PaginatedResults<import("/Users/haseebahmed/Desktop/dotNetPractice/DatingApp/DatingApp.UI/src/app/_models/User").User[]>;
    result?: T;
    pagination?: Pagination;
  paginatedResult: PaginatedResults<import("/Users/haseebahmed/Desktop/dotNetPractice/DatingApp/DatingApp.UI/src/app/_models/User").User[]>;
}