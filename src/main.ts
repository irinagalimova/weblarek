import "./scss/styles.scss";
import { Api } from "./components/base/Api.js";
import { AppApi } from "./components/Models/AppApi.js";
import { API_URL } from "./utils/constants.js";
import { Products } from "./components/Models/Products.js";

const api = new Api(API_URL);
const appApi = new AppApi(api);
const productsModel = new Products();

/** ТЕСТЫ 
 * import { ShoppingCart } from "./components/Models/ShoppingCart.js";
import { Buyer } from "./components/Models/Buyer.js";
import { apiProducts } from "./utils/data.js";

const products = new Products(); 
const shoppingCart = new ShoppingCart(); 
const buyer = new Buyer();

console.log('КАТАЛОГ');
console.log('Проверка методов setItems() и getItems()');
products.setItems(apiProducts.items);
console.log(products.getItems());

console.log('Проверка метода getProductByID()');
console.log(products.getProductByID(apiProducts.items[2].id)); 

console.log('Проверка методов setSelectedProduct() и getSelectedProduct()');
products.setSelectedProduct(apiProducts.items[1]);
console.log(products.getSelectedProduct());

console.log('КОРЗИНА');
console.log('Проверка метода getItems()');
console.log(shoppingCart.getItems()); 
console.log('Проверка метода addItem(apiProducts.items[2])');
shoppingCart.addItem(apiProducts.items[2]);
console.log(shoppingCart.getItems()); 
console.log('Проверка метода removeItem(apiProducts.items[2].id)');
shoppingCart.removeItem(apiProducts.items[2].id);
console.log(shoppingCart.getItems());
console.log('Проверка метода clearShoppingCart() ДО МЕТОДА');
shoppingCart.addItem(apiProducts.items[1]);
shoppingCart.addItem(apiProducts.items[2]);
console.log(shoppingCart.getItems());
console.log('Проверка метода clearShoppingCart() ПОСЛЕ');
shoppingCart.clearShoppingCart();
console.log(shoppingCart.getItems());
console.log('Проверка метода getTotalSum()');
shoppingCart.addItem(apiProducts.items[1]);
shoppingCart.addItem(apiProducts.items[2]);
console.log(shoppingCart.getTotalSum());
console.log('Проверка метода getAmountOfItem()');
console.log(shoppingCart.getAmountOfItem());
console.log('Проверка метода hasItem()');
console.log(shoppingCart.hasItem(apiProducts.items[2].id));

console.log('ПОКУПАТЕЛЬ');

buyer.setAddress('ул. Милашенкова 17');
buyer.setPhone('89777746556');
buyer.setPayment('card');
buyer.setEmail('murmeow@gmail.com');
console.log('getData():', buyer.getData());

buyer.clearData();
console.log('После clear() validate():', buyer.validate());

buyer.setPhone('89777746556');
buyer.setPayment('card');
buyer.setEmail('murmeow@gmail.com');
console.log('validate():', buyer.validate());
*/

console.log("КАТАЛОГ");
console.log("Проверка методов getProducts()");

appApi
  .getProducts()
  .then((data) => {
    productsModel.setItems(data.items);
    console.log("Товары с сервера");
    console.log(productsModel.getItems());
  })
  .catch((error) => {
    console.error("Ошибка", error);
  });
