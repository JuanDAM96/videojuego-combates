document.addEventListener("DOMContentLoaded", function () {
    const personaje = JSON.parse(localStorage.getItem("personaje"));

    if (personaje) {
        // Actualizar la imagen del personaje
        document.getElementById("imagen-personaje-lobby").src = personaje.imagen || "../../multimedia/images/personaje.jpg";

        // Actualizar los datos del personaje
        document.getElementById("nombre-personaje").innerText = personaje.nombre;
        document.getElementById("nivel-personaje").innerText = `Nivel: ${personaje.nivel}`;
        document.getElementById("dinero-personaje").innerText = `Dinero: ${personaje.dinero} monedas`;
        document.getElementById("vida-personaje").innerText = personaje.estadisticas.vida;
        document.getElementById("ataque-personaje").innerText = personaje.estadisticas.ataque;
        document.getElementById("defensa-personaje").innerText = personaje.estadisticas.defensa;

        // Mostrar la cantidad de pociones
        const cantidadPociones = personaje.pociones ? personaje.pociones.length : 0;
        document.getElementById("pociones-personaje").innerText = cantidadPociones;
    } else {
        alert("No hay personaje creado.");
        window.location.href = "/index.html";
    }
});

// Asignar las funciones al objeto `window` para que sean accesibles globalmente
window.irATienda = function () {
    window.location.href = "tienda.html";
};

window.gestionarInventario = function () {
    window.location.href = "inventario.html";
};

window.entrarEnCombate = function () {
    window.location.href = "combate.html";
};

window.volverAlMenuPrincipal = function () {
    window.location.href = "../../index.html";
};