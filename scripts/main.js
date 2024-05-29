import { ShoppingCart } from "./classes/shoppingCart.js";
import { renderProducts } from "./components/productsList.js";
import { renderShoppingCartList } from "./components/shoppingCartList.js";

let shoppingCart;
if (localStorage.getItem("cart")) {
    shoppingCart = JSON.parse(localStorage.getItem("cart"));
} else {
    shoppingCart = new ShoppingCart();
}

renderShoppingCartList(shoppingCart);