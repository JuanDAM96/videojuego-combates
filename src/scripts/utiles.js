function guardarDatos(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function cargarDatos(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
