import { Api } from "../base/Api.js";
import {
  IProduct,
  IProductsResponse,
  IOrderData,
  IOrderResponse,
} from "../../types/index.js";

export class AppApi {
  constructor(private api: Api) {}

  getProducts(): Promise<IProductsResponse> {
    return this.api.get("/product") as Promise<IProductsResponse>;
  }

  postOrder(data: IOrderData): Promise<IOrderResponse> {
    return this.api.post("/order", data) as Promise<IOrderResponse>;
  }
}
