import { ShoppingCart } from "./classes/shoppingCart.js";
import { renderProducts } from "./components/productsList.js";
import { renderShoppingCartList } from "./components/shoppingCartList.js";
import { emptyElement } from "./utils/dom.js";

//Inicializar carrito de compras
let shoppingCart;

if (localStorage.getItem("cart")) {
    const storageShoppingCart = JSON.parse(localStorage.getItem("cart"));
    shoppingCart = new ShoppingCart();
    shoppingCart.productList = storageShoppingCart.productList;
    shoppingCart.total = storageShoppingCart.total;
} else {
    shoppingCart = new ShoppingCart();
}

//Obtener botones del switch
let productListButton = document.getElementById("product-list-btn");
let cartButton = document.getElementById("cart-btn");

//Iniciar contador del carrito
let cartCounter = document.getElementById("cart-counter");
cartCounter.innerHTML = shoppingCart.productList.length;

//Renderizar productos
renderProducts(shoppingCart);
document.querySelector("#shopping-cart-container").style.display = "none";

//Renderizar productos
productListButton.addEventListener("click", function() {
    //Cambiar titulo
    document.querySelector(".main-title").textContent = "Lista de productos";
    //Cambiar estado de los botones
    productListButton.classList.add("active");
    cartButton.classList.remove("active");
    //Vaciar contenedores
    emptyElement(document.querySelector("#products-container"));
    emptyElement(document.querySelector("#shopping-cart-container"));
    //Ocultar carrito y mostrar productos
    document.querySelector("#products-container").style.display = "flex";
    document.querySelector("#shopping-cart-container").style.display = "none";

    //Renderizar productos
    renderProducts(shoppingCart);
});

//Renderizar carrito
cartButton.addEventListener("click", function() {
    //Cambiar titulo
    document.querySelector(".main-title>h3").textContent = "Carrito de compras";
    document.querySelector("#category-container").classList.toggle("hidden");
    //Cambiar estado de los botones
    cartButton.classList.add("active");
    productListButton.classList.remove("active");
    //Vaciar contenedores
    emptyElement(document.querySelector("#shopping-cart-container"));
    emptyElement(document.querySelector("#products-container"));
    //Ocultar productos y mostrar carrito
    document.querySelector("#products-container").style.display = "none";
    document.querySelector("#shopping-cart-container").style.display = "flex";
    //Renderizar carrito
    renderShoppingCartList(shoppingCart);
});

//Evento: Click para el botón "agregar al carrito"
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
})
