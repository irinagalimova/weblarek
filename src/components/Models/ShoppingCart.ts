import { IProduct } from "../../types/index.js";
import { IEvents } from "../base/Events.js";

export class ShoppingCart {
  private items: IProduct[] = [];

  constructor(protected events: IEvents) {}

  getItems(): IProduct[] {
    return this.items;
  }

  addItem(product: IProduct): void {
    this.items.push(product);
    this.events.emit("basket:changed");
  }

  removeItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.events.emit("basket:changed");
  }

  clearShoppingCart(): void {
    this.items = [];
    this.events.emit("basket:changed");
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
