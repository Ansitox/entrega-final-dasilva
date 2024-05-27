//Guardar en Local Storage
export function saveInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

//Obtener de Local Storage
export function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}