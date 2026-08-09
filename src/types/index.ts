export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export type TPayment = "card" | "cash";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment | null; 
  address: string;
  email: string;
  phone: string;
}

export interface IValidationErrors {
  payment?: string;
  address?: string;
  email?: string;
  phone?: string;
}

export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

export interface IOrderData {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IOrderResponse {
  id: string;
  total: number;
}
