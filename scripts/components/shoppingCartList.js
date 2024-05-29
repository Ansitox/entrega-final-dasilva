import { createElement } from "../utils/dom.js";
import { createCartItem } from "./cartItem.js";

//Función para mostrar el carrito
export function renderShoppingCartList(cart) {
    const shoppingCartContainer = document.querySelector("#shopping-cart-container");

    // Crear tabla para mostrar el carrito
    const shoppingCartList = createElement("table", "shopping-cart-list");
    shoppingCartList.innerHTML = `
        <tr>
            <th></th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Eliminar</th>
        </tr>
    `

    // Crear items del carrito
    cart.productList.forEach(product => {
        const cartItem = createCartItem(product);
        shoppingCartList.appendChild(cartItem);
    });
    shoppingCartContainer.appendChild(shoppingCartList);

    // Crear total del carrito
    const totalContainer = createElement("div", "total-container");
    totalContainer.innerHTML = `
        <h3>Total: $${cart.total}</h3>
    `;
    shoppingCartContainer.appendChild(totalContainer);

    //Crear sección para vaciar el carrito y finalizar la compra
    const shoppingCartActions = createElement("div", "shopping-cart-actions");
    shoppingCartActions.innerHTML = `
        <button class="clean-cart">Vaciar carrito</button>
        <button class="finish-purchase">Realizar compra</button>
    `;
    shoppingCartContainer.appendChild(shoppingCartActions);
}