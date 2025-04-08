let claseSeleccionada = null;

function seleccionarClase(clase) {
    const clases = {
        guerrero: {
            vida: 120,
            ataque: 12,
            defensa: 14,
            imagen: "../../multimedia/images/guerrero.jpg"
        },
        mago: {
            vida: 80,
            ataque: 20,
            defensa: 5,
            imagen: "../../multimedia/images/mago.jpg"
        },
        arquero: {
            vida: 100,
            ataque: 15,
            defensa: 10,
            imagen: "../../multimedia/images/arquero.jpg"
        }
    };

    claseSeleccionada = clases[clase];
    alert(`Has seleccionado la clase: ${clase.charAt(0).toUpperCase() + clase.slice(1)}`);
}

document.getElementById('form-personaje').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;

    if (!claseSeleccionada) {
        alert("Debes seleccionar una clase antes de continuar.");
        return;
    }

    // Crear la espada rota
    const espadaRota = {
        nombre: "Espada Rota",
        ataque: 7,
        imagen: "../../multimedia/images/espada_rota.jpg"
    };

    // Crear el personaje con la clase seleccionada
    const personaje = {
        nombre,
        estadisticas: {
            vida: claseSeleccionada.vida,
            ataque: claseSeleccionada.ataque,
            defensa: claseSeleccionada.defensa
        },
        nivel: 1,
        dinero: 100,
        pociones: [],
        inventario: [espadaRota],
        armaEquipada: espadaRota,
        imagen: claseSeleccionada.imagen // Guardar la imagen de la clase seleccionada
    };

    // Guarda el personaje en localStorage
    localStorage.setItem('personaje', JSON.stringify(personaje));

    // Redirige al lobby
    window.location.href = "lobby.html";
});

function volverAlMenuPrincipal() {
    window.location.href = "../../index.html"; // Redirige al menú principal
}