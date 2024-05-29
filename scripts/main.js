import { ShoppingCart } from "./classes/shoppingCart.js";
import { renderProducts } from "./components/productsList.js";
import { renderShoppingCartList } from "./components/shoppingCartList.js";

let shoppingCart;

if (localStorage.getItem("cart")) {
    const storageShoppingCart = JSON.parse(localStorage.getItem("cart"));
    shoppingCart = new ShoppingCart();
    shoppingCart.productList = storageShoppingCart.productList;
    shoppingCart.total = storageShoppingCart.total;
} else {
    shoppingCart = new ShoppingCart();
}

renderProducts(shoppingCart);
renderShoppingCartList(shoppingCart);
