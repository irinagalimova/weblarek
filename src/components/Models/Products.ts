import { IProduct } from "../../types/index.js";

export class Products {
  private items: IProduct[] = [];
  private selectedItem: IProduct | null = null;

  setItems(items: IProduct[]): void {
    this.items = items;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getProductByID(id: string): IProduct | undefined {
    return this.items.find((item) => item.id === id);
  }

  setSelectedProduct(selectedItem: IProduct | null): void {
    this.selectedItem = selectedItem;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedItem;
  }
}
