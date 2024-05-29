import { ShoppingCart } from "./classes/shoppingCart.js";
import { renderProducts } from "./components/productsList.js";

const shoppingCart = new ShoppingCart();

renderProducts(shoppingCart);