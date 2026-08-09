import {
  IApi,
  IProductsResponse,
  IOrderData,
  IOrderResponse,
} from "../../types/index.js";

export class AppApi {
  constructor(private api: IApi) {}

  getProducts(): Promise<IProductsResponse> {
    return this.api.get<IProductsResponse>("/product");
  }

  postOrder(data: IOrderData): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>("/order", data);
  }
}
