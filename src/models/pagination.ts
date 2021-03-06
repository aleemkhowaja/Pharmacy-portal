export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  maxSize : number;
}

export class PaginatedResult<T> {
  result: T | undefined;
  pagination: Pagination | undefined;
}
