//Funcion para cargar los productos
export async function obtenerProductos() {
    const response = await fetch('../data/productos.json');
    if (!response.ok) {
        throw new Error('Error al cargar los productos');
    }
    return response.json();
}