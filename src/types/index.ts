export type ApiPostMethods = "POST" | "PUT" | "DELETE";

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
  payment: "card" | "cash";
  address: string;
  email: string;
  phone: string;
}

export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

export interface IOrderData {
  payment: "card" | "cash";
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
