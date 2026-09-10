import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form, IForm } from "./Form";

interface IContacts extends IForm {
  email: string;
  phone: string;
}

export class Contacts extends Form<IContacts> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(
    container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container,
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container,
    );
  }

  set email(value: string) {
    this.emailInput.value = value;
  };

  set phone(value: string) {
    this.phoneInput.value = value;
  };
}
