//Crear nuevo elemento
export function createElement(type, classes) {
    const element = document.createElement(type);
    if (classes) element.className = classes;
    return element;
}

//Vaciar elemento existente
export function emptyElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}