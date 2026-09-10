import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card, ICard, ICardActions } from "./Card";

interface ICardPreview extends ICard {
  image: string;
  category: string;
  description: string;
  buttonText: string;
  buttonDisabled: boolean;
}

export class CardPreview extends Card<ICardPreview> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );

    if (actions?.onClick) {
      this.buttonElement.addEventListener("click", actions.onClick);
    }
  }

  set title(value: string) {
    super.title = value;
    this.imageElement.alt = value;
  }

  set image(value: string) {
    this.setImage(
      this.imageElement,
      value,
      this.titleElement.textContent ?? "",
    );
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
    const categoryClass = categoryMap[value as keyof typeof categoryMap] ?? "";
    this.categoryElement.className = `card__category ${categoryClass}`;
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.buttonElement.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this.buttonElement.disabled = value;
  }
}
