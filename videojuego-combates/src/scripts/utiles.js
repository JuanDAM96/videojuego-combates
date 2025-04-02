function calcularDaño(ataque, arma, defensa) {
    const daño = (ataque + arma) - (defensa / 2);
    return Math.max(daño, 0); // Asegura que el daño no sea negativo
}

function guardarDatos(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function cargarDatos(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
