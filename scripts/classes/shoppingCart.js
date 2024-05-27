export class ShoppingCart{
    constructor () {
        this.productList = []
        this.total = 0
    }

//Métodos:
    //Localizar un producto por nombre
    findProduct(productName) {
        return this.productList.find(product => product.name.toLowerCase() === productName.toLowerCase())
    }

    //Calcular total del carrito
    calculateTotal() {
        return this.productList.reduce((total, product) => total + product.subTotal, 0)
    }

    //Añadir producto y actualizar precio
    addProduct(productName, quantity) {
        const targetProductIndex = this.productList.findIndex(product => product.name.toLowerCase() === productName.toLowerCase());

        if (targetProductIndex !== -1) {
            // Si el producto ya existe, actualizar cantidad y subtotal
            this.productList[targetProductIndex].quantity += quantity;
            this.productList[targetProductIndex].subTotal = this.productList[targetProductIndex].price * this.productList[targetProductIndex].quantity;
            this.total = this.calculateTotal();
            localStorage.setItem("cart", JSON.stringify(this));
        } else {
            // Si el producto no existe, agregarlo a la lista
            const targetProduct = createdProducts.find(product => product.name.toLowerCase() === productName.toLowerCase());

            if (targetProduct) {
                const newProduct = { ...targetProduct, quantity, subTotal: targetProduct.price * quantity };
                this.productList.push(newProduct);
                this.total = this.calculateTotal();
                localStorage.setItem("cart", JSON.stringify(this));
            } else {
                alert("No se encontró el producto");
            }
        }
    }
    //Eliminar producto y actualizar precio
    removeProduct(productName) {
        const targetProduct = this.findProduct(productName);

        //Verificar que el producto esté en el carrito
        if (targetProduct) {
            const index = this.productList.indexOf(targetProduct);
            if (index !== -1) {
                //Eliminar
                this.productList.splice(index, 1);
                //Actualizar precio
                this.total = this.calculateTotal()
                localStorage.setItem("cart", JSON.stringify(this));
            }
        } else {
            alert("No se encontró el producto");
        }
    }

    //Editar cantidad de producto
    editProductQuantity(productName, newQuantity) {
        const targetProduct = this.findProduct(productName);
        //Verificar que el producto esté en el carrito
        if (targetProduct) {
            //Actualizar cantidad
            targetProduct.quantity = newQuantity;
            targetProduct.subTotal = targetProduct.price * newQuantity;
            //Actualizar precio
            this.total = this.calculateTotal()
            localStorage.setItem("cart", JSON.stringify(this));
        } else {
            alert("No se encontró el producto");
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