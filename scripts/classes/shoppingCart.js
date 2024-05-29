import { saveInLocalStorage } from "../utils/localStorage.js";
import { getProducts } from "../services/loadData.js";
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
    addProduct(id, quantity) {
        const targetProductIndex = this.productList.findIndex(product => product.id == id);

        // Si el producto ya existe, actualizar cantidad y subtotal
        if (targetProductIndex !== -1) {
            //Actualizar cantidad y subtotal
            this.productList[targetProductIndex].quantity += quantity;
            this.productList[targetProductIndex].subTotal = this.productList[targetProductIndex].price * this.productList[targetProductIndex].quantity;
            this.total = this.updateTotal();

            //Actualizar el carrito en el localStorage
            saveInLocalStorage("cart", this);
        } else {
            //Si el producto no existe, agregar a la lista
            getProducts()
                .then(data => {
                    const targetProduct = data.find(product => parseInt(product.id) === id);
                    if (targetProduct) {
                        const newProduct = { ...targetProduct, quantity, subTotal: targetProduct.price * quantity };
                        this.productList.push(newProduct);
                        this.total = this.updateTotal();

                        //Actualizar el carrito en el localStorage
                        saveInLocalStorage("cart", this);
                    } else {
                        console.error("No se encontró el producto");
                    }
                })
                .catch(error => console.error(error));
        }
    }

    //Eliminar producto y actualizar precio
    removeProduct(id) {
        const targetProduct = this.findById(id);
        console.log(targetProduct);
        return

        //Verificar que el producto esté en el carrito
        if (targetProduct) {
            const index = this.productList.indexOf(targetProduct);
            if (index !== -1) {
                //Eliminar
                this.productList.splice(index, 1);
                //Actualizar precio
                this.total = this.updateTotal()
                localStorage.setItem("cart", JSON.stringify(this));
            }
        } else {
            alert("No se encontró el producto");
        }
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