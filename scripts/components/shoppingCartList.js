import { createElement } from "../utils/dom.js";
import { createEmptyCartMessage } from "../utils/eventHandler.js";
import { createCartItem } from "./cartItem.js";

//Función para mostrar el carrito
export function renderShoppingCartList(cart) {
    //Preparar contenedor
    const shoppingCartContainer = document.querySelector("#shopping-cart-container");

    //Verificar que el carrito no este vacío
    if (cart.productList.length === 0) {
        createEmptyCartMessage();
    } else {
        // Crear tabla para mostrar el carrito
        const shoppingCartList = createElement("table", "shopping-cart-list");
        shoppingCartList.innerHTML = `
            <thead class="table-header">
                <tr>
                    <th class="cart-item-image"></th>
                    <th class="cart-item-name">Nombre</th>
                    <th class="cart-item-quantity">Cantidad</th>
                    <th class="cart-item-price">Precio</th>
                    <th class="cart-item-remove">Eliminar</th>
                </tr>
            </thead>

        `
        const tableBody = createElement("tbody", "table-body");

        // Crear items del carrito
        cart.productList.forEach(product => {
            const cartItem = createCartItem(product);
            tableBody.appendChild(cartItem);
        });

        shoppingCartList.appendChild(tableBody);
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
}