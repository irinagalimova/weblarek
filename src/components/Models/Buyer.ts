import { IBuyer } from "../../types/index.js";
import { IValidationErrors } from "../../types/index.js";
import { IEvents } from "../base/Events.js";

export class Buyer {
  private payment: IBuyer["payment"] | null = null;
  private address: IBuyer["address"] = "";
  private email: IBuyer["email"] = "";
  private phone: IBuyer["phone"] = "";

  constructor(private events: IEvents) {}

  setPayment(payment: IBuyer["payment"]): void {
    this.payment = payment;
    this.events.emit("buyer:changed");
  }

  setAddress(address: IBuyer["address"]): void {
    this.address = address;
    this.events.emit("buyer:changed");
  }

  setEmail(email: IBuyer["email"]): void {
    this.email = email;
    this.events.emit("buyer:changed");
  }

  setPhone(phone: IBuyer["phone"]): void {
    this.phone = phone;
    this.events.emit("buyer:changed");
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  clearData(): void {
    this.payment = null;
    this.address = "";
    this.email = "";
    this.phone = "";
    this.events.emit("buyer:changed");
  }

  validate(): IValidationErrors {
    
    const errors: IValidationErrors = {};

    if (!this.payment) {
      errors.payment = "Выберите тип оплаты";
    }

    if (!this.address) {
      errors.address = "Введите адрес доставки";
    }

    if (!this.email) {
      errors.email = "Введите email";
    }

    if (!this.phone) {
      errors.phone = "Укажите телефон";
    }
    return errors;
  }
}
