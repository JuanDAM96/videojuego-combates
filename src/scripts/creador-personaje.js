let puntosRestantes = 20;

function asignarPuntos(atributo, cantidad) {
    const input = document.getElementById(atributo);
    const valorActual = parseInt(input.value, 10);

    // Verifica que no se modifiquen los puntos de vida
    if (atributo === 'vida') {
        console.warn('No puedes modificar los puntos de vida.');
        return;
    }

    // Verifica que haya puntos restantes para asignar o quitar
    if (cantidad > 0 && puntosRestantes > 0) {
        input.value = valorActual + cantidad;
        puntosRestantes -= cantidad;
    } else if (cantidad < 0 && valorActual > 0) {
        input.value = valorActual + cantidad;
        puntosRestantes -= cantidad;
    }

    // Actualiza los puntos restantes en la interfaz
    document.getElementById('puntos-restantes').innerText = puntosRestantes;
}

document.getElementById('form-personaje').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const vida = 100; // Vida fija
    const ataque = parseInt(document.getElementById('ataque').value, 10);
    const defensa = parseInt(document.getElementById('defensa').value, 10);
    const imagen = document.getElementById('imagen-personaje').src;

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
        pociones: [], // Inicializar con un array vacío
        inventario: [espadaRota], // La Espada Rota está en el inventario
        armaEquipada: espadaRota, // La Espada Rota está equipada por defecto
        imagen // Imagen seleccionada
    };

    // Guarda el personaje en localStorage
    localStorage.setItem('personaje', JSON.stringify(personaje));

    // Redirige al lobby
    window.location.href = "lobby.html";
});

function volverAlMenuPrincipal() {
    window.location.href = "../../index.html"; // Redirige al menú principal
}