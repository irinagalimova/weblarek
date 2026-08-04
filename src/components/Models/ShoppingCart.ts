import { IProduct } from "../../types/index.js";

export class ShoppingCart {
  private items: IProduct[] = [];

  getItems(): IProduct[] {
    return this.items;
  }

  addItem(product: IProduct): void {
    this.items.push(product);
  }

  removeItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  clearShoppingCart(): void {
    this.items = [];
  }

  getTotalSum(): number {
    let totalSum = 0;

    for (let item of this.items) {
      totalSum += item.price || 0;
    }

    return totalSum;
  }

  getAmountOfItem(): number {
    return this.items.length;
  }

  hasItem(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }
}
