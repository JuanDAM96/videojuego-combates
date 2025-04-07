let puntosRestantes = 20;

function asignarPuntos(estadistica, cantidad) {
    const input = document.getElementById(estadistica);
    const valorActual = parseInt(input.value, 10);
    const nuevoValor = valorActual + cantidad;

    if (nuevoValor >= 0 && puntosRestantes - cantidad >= 0) {
        input.value = nuevoValor;
        puntosRestantes -= cantidad;
        document.getElementById('puntos-restantes').innerText = puntosRestantes;
    } else {
        alert("No puedes asignar más puntos.");
    }
}

document.getElementById('form-personaje').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const vida = 100; // Vida fija
    const ataque = parseInt(document.getElementById('ataque').value, 10);
    const defensa = parseInt(document.getElementById('defensa').value, 10);

    if (puntosRestantes > 0) {
        alert("Debes asignar todos los puntos antes de continuar.");
        return;
    }

    // Crear la espada rota
    const espadaRota = {
        nombre: "Espada Rota",
        ataque: 7,
        imagen: "../../multimedia/images/espada_rota.jpg"
    };

    // Crear el personaje con la espada rota en el inventario
    const personaje = {
        nombre,
        estadisticas: { vida, ataque, defensa },
        nivel: 1,
        dinero: 100,
        inventario: [espadaRota], // La Espada Rota está en el inventario
        armaEquipada: espadaRota // La Espada Rota está equipada por defecto
    };

    // Guarda el personaje en localStorage
    localStorage.setItem('personaje', JSON.stringify(personaje));

    // Muestra las estadísticas formateadas
    const estadisticasTexto = `
        Nombre: ${personaje.nombre}
        Vida: ${personaje.estadisticas.vida}
        Ataque: ${personaje.estadisticas.ataque}
        Defensa: ${personaje.estadisticas.defensa}
    `;
    alert(`Personaje creado con éxito:\n${estadisticasTexto}`);

    // Redirige al lobby
    window.location.href = "lobby.html";
});

function volverAlMenuPrincipal() {
    window.location.href = "../../index.html"; // Redirige al menú principal
}