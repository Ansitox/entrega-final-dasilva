import { createElement, emptyElement } from "../utils/dom.js";
import { createCartItem } from "./cartItem.js";

//Función para mostrar el carrito
export function renderShoppingCartList(cart) {
    const shoppingCartContainer = document.querySelector("#shopping-cart-container");
    shoppingCartContainer.innerHTML = "<h2>Carrito de compras</h2>";

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

    // Evento: Click
    document.addEventListener("click", event => {
        //Vaciar carrito
        if (event.target.classList.contains("clean-cart")) {
            cart.cleanCart();
            shoppingCartList.innerHTML = `
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Eliminar</th>
                </tr>
            `;
            totalContainer.innerHTML = `
                <h3>Total: $0</h3>
            `;
        }

        //Editar cantidad de productos
        if (event.target.classList.contains("edit-product-quantity")) {
            const id = parseInt(event.target.dataset.id);
            const quantityInput = document.getElementById(`cart-quantity-input-${id}`);

            if (event.target.textContent === "Editar") {
                //Habilitar el input para editar la cantidad
                quantityInput.disabled = false;
                event.target.textContent = 'Ok';
            } else if (event.target.textContent === 'Ok') {
                //Obtener producto asociado al ID
                const product = cart.findById(id);

                //Actualizar cantidad
                const quantity = parseInt(quantityInput.value);
                product.quantity = 0;
                cart.editProductQuantity(id, quantity);

                //Actualizar subtotal en la lista
                const subTotalCell = document.getElementById(`cart-item-price-${id}`);
                subTotalCell.textContent = `$${product.subTotal}`;

                //Calcular nuevo total
                //const total = cart.updateTotal();
                totalContainer.innerHTML = `
                    <h3>Total: $${cart.total}</h3>
                `;

                //Deshabilitar el input
                quantityInput.disabled = true;
                event.target.textContent = 'Editar';
            }
        }

        //Finalizar compra
        if (event.target.classList.contains("finish-purchase")) {
            alert("Gracias por su compra");
        }
    });
}