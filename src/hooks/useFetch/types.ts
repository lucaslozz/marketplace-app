import { AxiosError, AxiosRequestHeaders } from 'axios';

export type METHOD_REQUEST = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface UseFetchProps<Body = any> {
  url: string;
  body?: Body;
  method?: METHOD_REQUEST;
  lateRequest?: boolean;
  componentName?: string;
  headers?: AxiosRequestHeaders;
}

export interface ErrorInfo {
  body?: string;
  method: string;
  url: string;
  error: string;
  title: string;
  status?: number;
  message?: string | object;
  code?: string;
}

export type ApiError<R> = AxiosError<R & { message?: object | string }>;
