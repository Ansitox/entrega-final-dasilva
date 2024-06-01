import { createElement } from "../utils/dom.js";

//Función para crear tarjeta de la lista de productos
export const createCard = (product) => {
    const card = createElement("div", "product-card");
    card.innerHTML = `
        <div class="card-title">
            <h3>${product.name}</h3>
        </div>
        <div class="card-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="card-body">
            <p>${product.description}</p>
        </div>
        <div class="card-footer">
            <p>Precio: $${product.price}</p>
            <label for="quantity-input-${product.id}">Cant.:</label>
            <input type="number" id="quantity-input-${product.id}" min="1" max="20" value="1" required>
            <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
        </div>
    `;
    return card
}