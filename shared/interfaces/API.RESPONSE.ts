export interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
  errors?: any;
  metadata?: {
    timestamp: string;
    path: string;
    [key: string]: any;
  };
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
