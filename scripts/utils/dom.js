//Crear nuevo elemento
export function createElement(type, classes, content) {
    const element = document.createElement(type);
    if (classes) element.className = classes;
    if (content) element.innerText = content;
    return element;
}

//Vaciar elemento existente
export function emptyElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}