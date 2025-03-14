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

    if (window.location.pathname.endsWith('tienda.html')) {
        const armas = [
            { nombre: 'Espada', ataque: 10, precio: 100, imagen: '../../multimedia/images/espada.jpg' },
            { nombre: 'Hacha', ataque: 15, precio: 150, imagen: '../../multimedia/images/hacha.jpg' },
            { nombre: 'Lanza', ataque: 12, precio: 120, imagen: '../../multimedia/images/lanza.png' },
            { nombre: 'Espada Rota', ataque: 7, precio: 50, imagen: '../../multimedia/images/espada_rota.jpg' } // Añadimos la Espada Rota a la tienda
        ];
        const listaArmas = document.getElementById('lista-armas');
        armas.forEach(arma => {
            const div = document.createElement('div');
            div.innerHTML = `
                <img src="${arma.imagen}" alt="${arma.nombre}" style="width: 100px; height: 100px;">
                <p>${arma.nombre} - Ataque: ${arma.ataque} - Precio: ${arma.precio}</p>
            `;
            const botonComprar = document.createElement('button');
            botonComprar.innerText = 'Comprar';
            botonComprar.onclick = () => comprarArma(arma);
            div.appendChild(botonComprar);
            listaArmas.appendChild(div);
        });
    }

    if (window.location.pathname.endsWith('inventario.html')) {
        const personaje = JSON.parse(localStorage.getItem('personaje'));
        const listaInventario = document.getElementById('lista-inventario');
        personaje.inventario.forEach(arma => {
            const div = document.createElement('div');
            div.innerHTML = `
                <img src="${arma.imagen}" alt="${arma.nombre}" style="width: 100px; height: 100px;">
                <p>${arma.nombre} - Ataque: ${arma.ataque}</p>
            `;
            const botonEquipar = document.createElement('button');
            botonEquipar.innerText = 'Equipar';
            botonEquipar.onclick = () => equiparArma(arma);
            div.appendChild(botonEquipar);
            listaInventario.appendChild(div);
        });
    }

    if (window.location.pathname.endsWith('combate.html')) {
        const personaje = JSON.parse(localStorage.getItem('personaje'));
        const enemigo = { nombre: 'Enemigo', nivel: 1, vida: 100, ataque: 6, defensa: 5 };
        const estadoCombate = document.getElementById('estado-combate');
        estadoCombate.innerText = `
            ${personaje.nombre} vs ${enemigo.nombre}
            Vida: ${personaje.vida} - ${enemigo.vida}
        `;

        window.atacar = function() {
            enemigo.vida -= personaje.armaEquipada.ataque;
            if (enemigo.vida <= 0) {
                alert('Has ganado el combate!');
                window.location.href = "lobby.html";
            } else {
                personaje.vida -= enemigo.ataque;
                if (personaje.vida <= 0) {
                    alert('Has perdido el combate!');
                    window.location.href = "lobby.html";
                }
            }
            estadoCombate.innerText = `
                ${personaje.nombre} vs ${enemigo.nombre}
                Vida: ${personaje.vida} - ${enemigo.vida}
            `;
        };

        window.defender = function() {
            personaje.vida -= (enemigo.ataque - personaje.defensa);
            if (personaje.vida <= 0) {
                alert('Has perdido el combate!');
                window.location.href = "lobby.html";
            }
            estadoCombate.innerText = `
                ${personaje.nombre} vs ${enemigo.nombre}
                Vida: ${personaje.vida} - ${enemigo.vida}
            `;
        };

        window.huir = function() {
            alert('Has huido del combate!');
            window.location.href = "lobby.html";
        };
    }
});

function comprarArma(arma) {
    const personaje = JSON.parse(localStorage.getItem('personaje'));
    if (personaje.dinero >= arma.precio) {
        personaje.dinero -= arma.precio;
        personaje.inventario.push(arma);
        localStorage.setItem('personaje', JSON.stringify(personaje));
        alert(`Has comprado ${arma.nombre}`);
    } else {
        alert('No tienes suficiente dinero.');
    }
}

function equiparArma(arma) {
    const personaje = JSON.parse(localStorage.getItem('personaje'));
    personaje.armaEquipada = arma;
    localStorage.setItem('personaje', JSON.stringify(personaje));
    alert(`Has equipado ${arma.nombre}`);
}

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
    window.location.href = "/videojuego-combates/index.html";
}