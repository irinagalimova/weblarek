import { IProduct } from "../../types/index.js";
import { IEvents } from "../base/Events.js";

export class Products {
  private items: IProduct[] = [];
  private selectedItem: IProduct | null = null;
  
  constructor(protected events: IEvents) {}

  setItems(items: IProduct[]): void {
    this.items = items;
    this.events.emit("catalog:changed");
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getProductByID(id: string): IProduct | undefined {
    return this.items.find((item) => item.id === id);
  }

  setSelectedProduct(selectedItem: IProduct | null): void {
    this.selectedItem = selectedItem;
    this.events.emit("product:changed");
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedItem;
  }
}
