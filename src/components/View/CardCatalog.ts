import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card, ICard, ICardActions } from "./Card";

interface ICardCatalog extends ICard {
  image: string;
  category: string;
}

export class CardCatalog extends Card<ICardCatalog> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

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

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
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
}
