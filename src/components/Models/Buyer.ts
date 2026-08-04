import { IBuyer } from "../../types/index.js";

export class Buyer {
  private payment: IBuyer["payment"] | null = null;
  private address: IBuyer["address"] = "";
  private email: IBuyer["email"] = "";
  private phone: IBuyer["phone"] = "";

  setPayment(payment: IBuyer["payment"]): void {
    this.payment = payment;
  }

  setAddress(address: IBuyer["address"]): void {
    this.address = address;
  }

  setEmail(email: IBuyer["email"]): void {
    this.email = email;
  }

  setPhone(phone: IBuyer["phone"]): void {
    this.phone = phone;
  }

  getData(): IBuyer {
    if (!this.payment) {
      throw Error("Выберите тип оплаты");
    }

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
  }

  validate(): {
    payment?: string;
    address?: string;
    email?: string;
    phone?: string;
  } {
    const errors: {
      payment?: string;
      address?: string;
      email?: string;
      phone?: string;
    } = {};

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
