export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
