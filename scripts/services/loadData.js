//Funcion para cargar los productos
export async function getProducts() {
    try {
        const response = await fetch('./data/productos.json');
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en obtenerProductos:', error);
        throw error;
    }
}