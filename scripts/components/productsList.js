import { ShoppingCart } from "../classes/shoppingCart.js";
import { getFromLocalStorage } from "../utils/localStorage.js";
import { getProducts } from "../services/loadData.js";
import { createCard } from "./product.js";
import { emptyElement } from "../utils/dom.js";
import { renderShoppingCartList } from "./shoppingCartList.js";

//Función para mostrar los productos
export async function renderProducts(cart) {
    try {
        //Obtener productos
        const products = await getProducts();

        const productsContainer = document.querySelector("#products-container");

        //Crear tarjetas por cada producto
        products.forEach((product) => {
            const card = createCard(product);
            productsContainer.appendChild(card);
        });

        //Evento: Click
        document.addEventListener("click", (event) => {
            //Agregar al carrito
            if (event.target.classList.contains("add-to-cart")) {
                //Id y cantidad
                const id = parseInt(event.target.dataset.id);
                const quantity = parseInt(document.getElementById(`quantity-input-${id}`).value);

                //Si el producto ya existe, actualizar cantidad y subtotal
                if (cart.findById(id)) {
                    cart.editProductQuantity(id, quantity);

                    //Re-renderizar carrito
                emptyElement(document.querySelector("#shopping-cart-container"));
                renderShoppingCartList(cart);
                //Si el proyecto no existe, agregarlo a la lista
                } else {
                    cart.addProduct(id, quantity);
                }
            }
        })
    } catch (error) {
        console.error('Error en obtenerProductos:', error);
        throw error;
    }
};

//Evento: onClick
