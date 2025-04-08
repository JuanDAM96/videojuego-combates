class Tienda {
    constructor(jugador) {
        this.jugador = jugador;
        this.armasDisponibles = [];
    }

    agregarArma(arma) {
        this.armasDisponibles.push(arma);
    }

    mostrarArmas() {
        const listaArmas = document.getElementById('lista-armas');
        listaArmas.innerHTML = '';

        this.armasDisponibles.forEach((arma, index) => {
            const item = document.createElement('li');
            item.textContent = `${arma.nombre} - Precio: ${arma.precio} monedas`;
            const botonCompra = document.createElement('button');
            botonCompra.textContent = 'Comprar';
            botonCompra.onclick = () => this.comprarArma(index);
            item.appendChild(botonCompra);
            listaArmas.appendChild(item);
        });
    }

}

// Ejemplo de uso
const jugador = {
    dinero: 100,
    inventario: {
        armas: [],
        agregarArma(arma) {
            this.armas.push(arma);
        }
    }
};

const tienda = new Tienda(jugador);

if (window.location.pathname.endsWith('tienda.html')) {
    const personaje = JSON.parse(localStorage.getItem('personaje'));

    // Lista de armas disponibles
    const armas = [
        { nombre: 'Espada', ataque: 10, precio: 100, imagen: '../../multimedia/images/espada.jpg' },
        { nombre: 'Hacha', ataque: 15, precio: 150, imagen: '../../multimedia/images/hacha.jpg' },
        { nombre: 'Lanza', ataque: 12, precio: 120, imagen: '../../multimedia/images/lanza.png' }
    ];

    // Lista de pociones disponibles
    const pociones = [
        { nombre: 'Poción de Curación', cura: 40, precio: 50, imagen: '../../multimedia/images/pocion_vida.jpg' }
    ];

    // Mostrar armas en la tienda
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

    // Mostrar pociones en la tienda
    const listaPociones = document.getElementById('lista-pociones');
    pociones.forEach(pocion => {
        const div = document.createElement('div');
        div.className = 'pocion-item'; // Clase para aplicar estilos
        div.innerHTML = `
            <img src="${pocion.imagen}" alt="${pocion.nombre}" class="pocion-imagen">
            <p class="pocion-nombre">${pocion.nombre}</p>
            <p class="pocion-detalles">Cura: ${pocion.cura} - Precio: ${pocion.precio} monedas</p>
            <label for="cantidad-${pocion.nombre}" class="pocion-cantidad-label">Cantidad:</label>
            <input type="number" id="cantidad-${pocion.nombre}" min="1" value="1" class="pocion-cantidad-input">
        `;
        const botonComprar = document.createElement('button');
        botonComprar.innerText = 'Comprar';
        botonComprar.className = 'boton-comprar'; // Clase para aplicar estilos
        botonComprar.onclick = () => {
            const cantidad = parseInt(document.getElementById(`cantidad-${pocion.nombre}`).value, 10);
            comprarPocion(pocion, cantidad);
        };
        div.appendChild(botonComprar);
        listaPociones.appendChild(div);
    });

    // Mostrar dinero del jugador
    const dineroJugadorDiv = document.createElement('div');
    dineroJugadorDiv.className = 'dinero-jugador';
    dineroJugadorDiv.innerHTML = `
        <p>Dinero disponible: <span id="dinero-jugador">${personaje.dinero}</span> monedas</p>
    `;
    document.body.insertBefore(dineroJugadorDiv, document.body.firstChild);

    const dineroJugador = document.getElementById('dinero-jugador');
    dineroJugador.innerText = personaje.dinero;

    // Función para comprar armas
    function comprarArma(arma) {
        if (personaje.dinero >= arma.precio) {
            personaje.dinero -= arma.precio;
            personaje.inventario.push(arma);
            localStorage.setItem('personaje', JSON.stringify(personaje));
            dineroJugador.innerText = personaje.dinero; // Actualizar el dinero mostrado
            alert(`Has comprado ${arma.nombre}`);
        } else {
            alert('No tienes suficiente dinero.');
        }
    }

    // Función para comprar pociones
    function comprarPocion(pocion, cantidad) {
        const costoTotal = pocion.precio * cantidad;

        if (personaje.dinero >= costoTotal) {
            personaje.dinero -= costoTotal;

            if (!personaje.pociones) personaje.pociones = [];
            for (let i = 0; i < cantidad; i++) {
                personaje.pociones.push(pocion);
            }

            localStorage.setItem('personaje', JSON.stringify(personaje));
            dineroJugador.innerText = personaje.dinero; // Actualizar el dinero mostrado
            alert(`Has comprado ${cantidad} ${pocion.nombre}(s).`);
        } else {
            alert('No tienes suficiente dinero.');
        }
    }

    function volverAlLobby() {
        window.location.href = "lobby.html"; // Redirige al jugador al lobby
    }
}