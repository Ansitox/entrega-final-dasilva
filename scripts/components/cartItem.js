import { createElement } from "../utils/dom.js";

export const createCartItem = (product) => {
    const cartItem = createElement("tr", "cart-item");
    cartItem.innerHTML = `
        <tr class="cart-item-image">
            <img src="${product.image}" alt="${product.name}">
        </tr>
        <tr class="cart-item-name">${product.name}</tr>
        <tr class="cart-item-quantity">
            <input type="number" id="quantity-input-${product.id}" min="1" max="20" value="${product.quantity}" disabled>
            <button class="edit-cart-item" data-id="${product.id}">Editar</button>
        </tr>
        <tr class="cart-item-price">$${product.subTotal}</tr>
        <tr class="cart-item-remove">
            <button class="remove-cart-item" data-id="${product.id}">Eliminar</button>
        </tr>
    `;
    return cartItem
}