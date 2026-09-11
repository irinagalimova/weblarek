import "./scss/styles.scss";
import { Api } from "./components/base/Api.js";
import { AppApi } from "./components/Models/AppApi.js";
import { API_URL, CDN_URL } from "./utils/constants.js";
import { Products } from "./components/Models/Products.js";
import { EventEmitter } from "./components/base/Events.js";
import { CardCatalog } from "./components/View/CardCatalog.js";
import { ensureElement, cloneTemplate } from "./utils/utils.js";
import { Gallery } from "./components/View/Gallery.js";
import { IProduct, TPayment, IOrderData } from "./types/index.js";
import { CardPreview } from "./components/View/CardPreview.js";
import { Modal } from "./components/View/Modal.js";
import { ShoppingCart } from "./components/Models/ShoppingCart.js";
import { Header } from "./components/View/Header.js";
import { Basket } from "./components/View/Basket.js";
import { CardBasket } from "./components/View/CardBasket.js";
import { Order } from "./components/View/Order.js";
import { Buyer } from "./components/Models/Buyer.js";
import { Contacts } from "./components/View/Contacts.js";
import { Success } from "./components/View/Success.js";

const events = new EventEmitter();
const api = new Api(API_URL);
const appApi = new AppApi(api);

const productsModel = new Products(events);
const gallery = new Gallery(ensureElement<HTMLElement>(".gallery"));
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const modal = new Modal(events, ensureElement<HTMLElement>("#modal-container"));
const shoppingCart = new ShoppingCart(events);
const header = new Header(events, ensureElement<HTMLElement>(".header"));
const basket = new Basket(events, cloneTemplate("#basket"));
const order = new Order(cloneTemplate<HTMLFormElement>("#order"), events);
const buyer = new Buyer(events);
const contacts = new Contacts(
  cloneTemplate<HTMLFormElement>("#contacts"),
  events,
);
const card = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
const success = new Success(events, cloneTemplate("#success"));

appApi
  .getProducts()
  .then((data) => {
    productsModel.setItems(data.items);
  })
  .catch((error) => {
    console.error("Ошибка загрузки с сервера", error);
  });

events.on("catalog:changed", () => {
  const itemCards = productsModel.getItems().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit("card:select", item),
    });

    return card.render({
      title: item.title,
      price: item.price,
      category: item.category,
      image: CDN_URL + item.image,
    });
  });

  gallery.render({ catalog: itemCards });
});

events.on<IProduct>("card:select", (item) => {
  productsModel.setSelectedProduct(item);
});

events.on("product:changed", () => {
  const item = productsModel.getSelectedProduct();

  if (!item) {
    return;
  }

  let buttonText = "Купить";
  let buttonDisabled = false;

  if (item.price === null) {
    buttonText = "Недоступно";
    buttonDisabled = true;
  } else if (shoppingCart.hasItem(item.id)) {
    buttonText = "Удалить из корзины";
  }

  modal.render({
    content: card.render({
      title: item.title,
      price: item.price,
      image: CDN_URL + item.image,
      category: item.category,
      description: item.description,
      buttonText: buttonText,
      buttonDisabled: buttonDisabled,
    }),
  });
  modal.open();
});

events.on("modal:close", () => {
  modal.close();
});

events.on("preview:submit", () => {
  const item = productsModel.getSelectedProduct();

  if (!item) {
    return;
  }

  if (!shoppingCart.hasItem(item.id)) {
    shoppingCart.addItem(item);
  } else {
    shoppingCart.removeItem(item.id);
  }

  modal.close();
});

function getBasketCards(): HTMLElement[] {
  return shoppingCart.getItems().map((item, index) => {
    const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
      onClick: () => events.emit("basket:delete", { id: item.id }),
    });

    return card.render({
      title: item.title,
      price: item.price,
      index: index + 1,
    });
  });
}

events.on("basket:changed", () => {
  header.render({ counter: shoppingCart.getAmountOfItem() });

  basket.render({
    items: getBasketCards(),
    total: shoppingCart.getTotalSum(),
    buttonDisabled: shoppingCart.getAmountOfItem() === 0,
  });
});

events.on("basket:open", () => {
  modal.render({ content: basket.render() });
  modal.open();
}); 

events.on("basket:delete", (data: { id: string }) => {
  shoppingCart.removeItem(data.id);
});

function updateOrderForm(): void {
  const data = buyer.getData();
  const errors = buyer.validate();
  const messages: string[] = [];

  if (errors.payment) {
    messages.push(errors.payment);
  }
  if (errors.address) {
    messages.push(errors.address);
  }

  order.render({
    payment: data.payment,
    address: data.address,
    errors: messages.join(". "),
    valid: messages.length === 0,
  });
}

function updateContactsForm(): void {
  const data = buyer.getData();
  const errors = buyer.validate();
  const messages: string[] = [];

  if (errors.email) {
    messages.push(errors.email);
  }
  if (errors.phone) {
    messages.push(errors.phone);
  }

  contacts.render({
    email: data.email,
    phone: data.phone,
    errors: messages.join(". "),
    valid: messages.length === 0,
  });
}

events.on("order:open", () => {
  updateOrderForm();
  modal.render({ content: order.render() });
  modal.open();
});

events.on("payment:change", (data: { payment: TPayment }) => {
  buyer.setPayment(data.payment);
});

events.on("order:change", (data: { field: string; value: string }) => {
  if (data.field === "address") {
    buyer.setAddress(data.value);
  }
});

events.on("contacts:change", (data: { field: string; value: string }) => {
  if (data.field === "email") {
    buyer.setEmail(data.value);
  }

  if (data.field === "phone") {
    buyer.setPhone(data.value);
  }
});

events.on("buyer:changed", () => {
  updateOrderForm();
  updateContactsForm();
});

events.on("order:submit", () => {
  updateContactsForm();
  modal.render({ content: contacts.render() });
  modal.open();
});

events.on("contacts:submit", async () => {
  const data = buyer.getData();

  if (data.payment === null) {
    return;
  }

  const orderData: IOrderData = {
    payment: data.payment,
    address: data.address,
    email: data.email,
    phone: data.phone,
    items: shoppingCart.getItems().map((item) => item.id),
    total: shoppingCart.getTotalSum(),
  };

  try {
    const result = await appApi.postOrder(orderData);

    shoppingCart.clearShoppingCart();
    buyer.clearData();

    modal.render({
      content: success.render({
        total: result.total,
      }),
    });

    modal.open();
  } catch (error) {
    console.error("Не удалось оформить заказ", error);
  }
});

events.on("success:close", () => {
  modal.close();
});
