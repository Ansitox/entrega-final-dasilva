import { saveInLocalStorage } from "../utils/localStorage.js";
import { getProducts } from "../services/loadData.js";
import { renderShoppingCartList } from "../components/shoppingCartList.js";

export class ShoppingCart{
    constructor () {
        this.productList = []
        this.total = 0
    }

//Métodos:
    //Localizar un producto por ID
    findById(id) {
        const product = this.productList.find(product => product.id == id);
        return product;
    }

    //Calcular total del carrito
    updateTotal() {
        return this.productList.reduce((total, product) => total + product.subTotal, 0)
    }

    //Añadir producto y actualizar precio
    async addProduct(id, quantity) {
        try {
          const data = await getProducts();
          const targetProduct = data.find(product => parseInt(product.id) === id);
          if (targetProduct) {
            const newProduct = { ...targetProduct, quantity, subTotal: targetProduct.price * quantity };
            this.productList.push(newProduct);
            this.total = this.updateTotal();

            // Actualizar el carrito en el localStorage
            saveInLocalStorage("cart", this);

            //Actualizar contador de carrito
            const cartCounter = document.querySelector("#cart-counter");
            cartCounter.textContent = this.productList.length;
          } else {
            console.error("No se encontró el producto");
          }
        } catch (error) {
          console.error(error);
        }
      }

    //Eliminar producto y actualizar precio
    removeProduct(id) {
        const targetProductIndex = this.productList.findIndex(product => product.id == id);

        if (targetProductIndex != -1) {
            this.productList.splice(targetProductIndex, 1);
            this.total = this.updateTotal();
        }

        //Actualizar el carrito en el localStorage
        saveInLocalStorage("cart", this);

        //Re-renderizar carrito
        renderShoppingCartList(this);
    }

    //Editar cantidad de producto
    editProductQuantity(id, quantity) {
        //Verificar que el producto esté en el carrito
        const index = this.productList.findIndex(product => parseInt(product.id) === id);

        if (index != -1) {
            const product = this.productList[index];
            product.quantity += quantity;
            product.subTotal = product.price * product.quantity;
            this.total = this.updateTotal();

            //Actualizar el carrito en el localStorage
            saveInLocalStorage("cart", this);
        } else {
            console.error("No se encontró el producto");
        }
    }

    //Limpiar carrito
    cleanCart() {
        //Vaciar lista de productos en carrito
        this.productList = []

        //Reiniciar precio total
        this.total = 0
        localStorage.removeItem("cart");
    }
};