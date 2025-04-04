function continuarPartida() {
    const personaje = localStorage.getItem('personaje');
    if (personaje) {
        window.location.href = "src/pantallas/lobby.html";
    } else {
        alert("No hay partida guardada.");
    }
}

function nuevaPartida() {
    window.location.href = "src/pantallas/creador-personaje.html";
}

function eliminarDatos() {
    localStorage.removeItem('personaje');
    alert("Datos eliminados.");
}

function repositorio() {
    window.location.href = "https://github.com/JuanDAM96/videojuego-combates";
}

document.addEventListener('DOMContentLoaded', function() {
    const formPersonaje = document.getElementById('form-personaje');
    if (formPersonaje) {
        formPersonaje.addEventListener('submit', function(event) {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const estadisticas = document.getElementById('estadisticas').value;
            const espadaRota = { nombre: 'Espada Rota', ataque: 7, imagen: '../../multimedia/images/espada_rota.jpg' }; // Arma inicial
            const personaje = {
                nombre,
                nivel: 1,
                dinero: 100,
                inventario: [espadaRota],
                armaEquipada: espadaRota,
                estadisticas,
                vida: 100,
                defensa: 5
            };
            localStorage.setItem('personaje', JSON.stringify(personaje));
            window.location.href = "lobby.html";
        });
    }

    if (window.location.pathname.endsWith('lobby.html')) {
        const personaje = JSON.parse(localStorage.getItem('personaje'));
        if (personaje) {
            document.getElementById('estado-personaje').innerText = `
                Nombre: ${personaje.nombre}
                Nivel: ${personaje.nivel}
                Dinero: ${personaje.dinero}
                Estadísticas: ${personaje.estadisticas}
            `;
        } else {
            alert("No hay personaje creado.");
            window.location.href = "/index.html";
        }
    }
});

function irATienda() {
    window.location.href = "tienda.html";
}

function gestionarInventario() {
    window.location.href = "inventario.html";
}

function entrarEnCombate() {
    window.location.href = "combate.html";
}

function volverAlLobby() {
    window.location.href = "lobby.html";
}

function volverAlMenuPrincipal() {
    window.location.href = "../../index.html";
}