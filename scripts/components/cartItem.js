import { createElement } from "../utils/dom.js";

export const createCartItem = (product) => {
    const cartItem = createElement("tr", "cart-item");
    cartItem.innerHTML = `
        <td class="cart-item-image">
            <img src="${product.image}" alt="${product.name}">
        </td>
        <td class="cart-item-name">${product.name}</td>
        <td class="cart-item-quantity">
            <input type="number" id="cart-quantity-input-${product.id}" min="1" max="20" value="${product.quantity}" disabled>
            <button class="edit-product-quantity" data-id="${product.id}">Editar</button>
        </td>
        <td class="cart-item-price" id="cart-item-price-${product.id}">$${product.subTotal}</td>
        <td class="cart-item-remove">
            <button class="remove-cart-item" data-id="${product.id}">X</button>
        </td>
    `;
    return cartItem
}