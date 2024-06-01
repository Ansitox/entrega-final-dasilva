import { getProducts } from "../services/loadData.js";
import { createCard } from "./product.js";

//Función para mostrar los productos
export async function renderProducts(cart) {
    try {
        //Obtener productos
        const products = await getProducts();

        const productsContainer = document.querySelector("#products-container");
        const titleContainer = document.querySelector(".main-title");

        titleContainer.innerHTML = `
        <h3>Lista de productos</h3>
        <div id="category-container">
            <label for="category-select">Categoría:</label>
            <select id="category-select">
                <option value="">Todos</option>
            </select>
        </div>
        `;

        //Generar array de categorías
        const categories = [...new Set(products.map((product) => product.category))];

        //Generar select de categorías
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            document.querySelector("#category-select").appendChild(option);
        });

        //Crear tarjetas por cada producto
        products.forEach((product) => {
            const card = createCard(product);
            productsContainer.appendChild(card);
        });

        // //Evento: Click
        // document.addEventListener("click", (event) => {
        //     const cartCounter = document.querySelector("#cart-counter");
        //     //Agregar al carrito
        //     if (event.target.classList.contains("add-to-cart")) {
        //         //Id y cantidad
        //         const id = parseInt(event.target.dataset.id);
        //         const quantity = parseInt(document.getElementById(`quantity-input-${id}`).value);

        //         //Si el producto ya existe, actualizar cantidad y subtotal
        //         if (cart.findById(id)) {
        //             cart.editProductQuantity(id, quantity);

        //             //Actualizar contador
        //             cartCounter.textContent = cart.productList.length;
        //         //Si el proyecto no existe, agregarlo a la lista
        //         } else {
        //             cart.addProduct(id, quantity);
        //         }
        //     }
        // })
    } catch (error) {
        console.error('Error en obtenerProductos:', error);
        throw error;
    }
};