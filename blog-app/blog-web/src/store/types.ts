export interface BaseHTTPResponse {
  message?: string;
}

export interface HTTPFieldErrors {
  errors?: HTTPFieldError[];
}

export interface HTTPFieldError {
  rule?: string;
  field?: string;
  message: string;
}

export interface SubState extends HTTPFieldErrors {
  loading?: boolean;
  error?: boolean;
  message?: string;
}

export interface MapErrorToState extends HTTPFieldErrors, BaseHTTPResponse {}

export type SortType = 'asc' | 'desc';

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
}