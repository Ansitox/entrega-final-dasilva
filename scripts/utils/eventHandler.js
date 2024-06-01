import { renderProducts } from "../components/productsList.js";
import { renderShoppingCartList } from "../components/shoppingCartList.js";
import { createElement, emptyElement } from "./dom.js";

const shoppingCartContainer = document.querySelector("#shopping-cart-container");

//Generar mensaje de carrito vacío
export const createEmptyCartMessage = () => {
    const emptyCartMessage = createElement("p", "empty-cart-message");
    emptyCartMessage.textContent = `Aún no hay productos en el carrito`;
    shoppingCartContainer.appendChild(emptyCartMessage);
}

//Eventos
export const eventHandler = (shoppingCart) => {
    //Evento "Click"
    document.addEventListener("click", (event) => {
        const cartCounter = document.querySelector("#cart-counter");

        //Agregar al carrito
        if (event.target.classList.contains("add-to-cart")) {
            //Id y cantidad
            const id = parseInt(event.target.dataset.id);
            const quantity = parseInt(document.getElementById(`quantity-input-${id}`).value);

            //Si el producto ya existe, actualizar cantidad y subtotal
            if (shoppingCart.findById(id)) {
                shoppingCart.editProductQuantity(id, quantity);

                //Actualizar contador
                cartCounter.textContent = shoppingCart.productList.length;
            //Si el proyecto no existe, agregarlo a la lista
            } else {
                shoppingCart.addProduct(id, quantity);
            }
        }

        //Editar cantidad de producto
        if (event.target.classList.contains("edit-product-quantity")) {
            const id = parseInt(event.target.dataset.id);
            const quantityInput = document.getElementById(`cart-quantity-input-${id}`);

            if (event.target.textContent === "Editar") {
                //Habilitar el input para editar la cantidad
                quantityInput.disabled = false;
                event.target.textContent = 'Ok';
            } else if (event.target.textContent === 'Ok') {
                //Obtener producto asociado al ID
                const product = shoppingCart.findById(id);

                //Actualizar cantidad
                const quantity = parseInt(quantityInput.value);
                product.quantity = 0;
                shoppingCart.editProductQuantity(id, quantity);

                //Actualizar subtotal en la lista
                const subTotalCell = document.getElementById(`cart-item-price-${id}`);
                subTotalCell.textContent = `$${product.subTotal}`;

                //Calcular nuevo total
                shoppingCart.updateTotal();

                const totalContainer = document.querySelector(".total-container");
                totalContainer.innerHTML = `
                    <h3>Total: $${shoppingCart.total}</h3>
                `;

                //Deshabilitar el input
                quantityInput.disabled = true;
                event.target.textContent = 'Editar';
            }
        }

        //Vaciar carrito
        if (event.target.classList.contains("clean-cart")) {
            Swal.fire({
                title: "¿Deseas vaciar el carrito?",
                text: "¡No podrás deshacer esta operación!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3E8A53",
                cancelButtonColor: "#d33",
                confirmButtonText: "Vaciar",
                cancelButtonText: "No"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Carrito vaciado",
                        text: "Se ha vaciado correctamente el carrito.",
                        icon: "success",
                        iconColor: "#A9F291",
                        confirmButtonColor: "#3E8A53"
                    });

                    //Limpiar carrito
                    shoppingCart.cleanCart();
                    emptyElement(shoppingCartContainer);
                    createEmptyCartMessage();

                    //Actualizar contador
                    cartCounter.textContent = shoppingCart.productList.length;
                }
            });
        }

        //Eliminar producto
        if (event.target.classList.contains("remove-cart-item")) {
            const id = parseInt(event.target.dataset.id);

            //Modal para confirmar eliminación
            Swal.fire({
                title: `Deseas eliminar ${shoppingCart.findById(id).name} del carrito?`,
                text: "¡No podrás deshacer esta operación!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3E8A53",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
                cancelButtonText: "No"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Producto borrado",
                        text: `Has eliminado ${shoppingCart.findById(id).name} del carrito.`,
                        icon: "success",
                        iconColor: "#A9F291",
                        confirmButtonColor: "#3E8A53"
                    });

                    //Eliminar el carrito
                    shoppingCart.removeProduct(id);
                    emptyElement(shoppingCartContainer);
                    renderShoppingCartList(shoppingCart);

                    //Actualizar contador
                    const cartCounter = document.querySelector("#cart-counter");
                    cartCounter.textContent = shoppingCart.productList.length;
                }
            });
        }

        //Finalizar compra
        if (event.target.classList.contains("finish-purchase")) {
            //Modal para confirmar compra
            Swal.fire({
                //Cuerpo del modal
                title: `¿Deseas finalizar la compra?\nEl total a pagar es: $${shoppingCart.total}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3E8A53",
                cancelButtonColor: "#d33",
                confirmButtonText: "Continuar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                //Si el usuario acepta la compra
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Compra realizada",
                        text: "Te enviaremos los datos de la compra a tu correo.",
                        icon: "success",
                        iconColor: "#A9F291",
                        confirmButtonColor: "#3E8A53"
                    });

                    //Limpiar carrito
                    shoppingCart.cleanCart();
                    emptyElement(shoppingCartContainer);
                    createEmptyCartMessage();

                    //Actualizar contador
                    cartCounter.textContent = shoppingCart.productList.length;
                }
            })
        }
    })
}
