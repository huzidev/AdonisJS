export interface SubState {
    loading: boolean;
    error: boolean;
    message?: string | null;
}

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
}