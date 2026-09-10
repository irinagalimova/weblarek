import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IForm {
  valid: boolean;
  errors: string;
}

export class Form<T extends IForm> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(
    container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container);

    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container,
    );
    this.errorsElement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );

    this.container.addEventListener("submit", (event) => {
      event.preventDefault();
      this.events.emit(`${container.name}:submit`);
    });

    this.container.addEventListener("input", (event) => {
      const input = event.target;

      if (input instanceof HTMLInputElement) {
        this.events.emit(`${container.name}:change`, {
          field: input.name,
          value: input.value,
        })
      }
    });
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
}
