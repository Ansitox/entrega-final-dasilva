import { getProducts } from "../services/loadData.js";
import { createCard } from "./product.js";

//Función para mostrar los productos
export async function renderProducts() {
    try {
        //Obtener productos
        let products = await getProducts();

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

        const categorySelect = document.querySelector("#category-select");

        //Generar array de categorías
        const categories = [...new Set(products.map((product) => product.category))];

        //Generar select de categorías
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        //Filtrar productos por categoría
        categorySelect.addEventListener("change", () => {
            const reRender = (categoryArray) => {
                //Limpiar contenedor de tarjetas
                productsContainer.innerHTML = "";

                //Crear tarjetas por cada categoria
                categoryArray.forEach((product) => {
                    const card = createCard(product);
                    productsContainer.appendChild(card);
                });
            }
            if (categorySelect.value) {
                //Crear tarjetas por cada categoria
                const filteredProducts = products.filter((product) => product.category === categorySelect.value);

                reRender(filteredProducts);
                } else {
                    reRender(products);
            }
        });

        //Crear tarjetas por cada producto
        products.forEach((product) => {
            const card = createCard(product);
            productsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error en obtenerProductos:', error);
        throw error;
    }
};