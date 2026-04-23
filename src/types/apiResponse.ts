import type { IUser } from './user';

export type IPaginatedResponse<TData> = {
  data: TData[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export interface IResponse<TData> {
  message: string;
  code: number;
  [key: string]: TData | string | number;
}

export interface LoginResponse {
  code: number;
  message: string;
  access_token: string;
  user: IUser;
}
