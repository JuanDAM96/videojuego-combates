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
        div.innerHTML = `
            <img src="${pocion.imagen}" alt="${pocion.nombre}" style="width: 100px; height: 100px;">
            <p>${pocion.nombre} - Cura: ${pocion.cura} - Precio: ${pocion.precio}</p>
        `;
        const botonComprar = document.createElement('button');
        botonComprar.innerText = 'Comprar';
        botonComprar.onclick = () => comprarPocion(pocion);
        div.appendChild(botonComprar);
        listaPociones.appendChild(div);
    });

    // Función para comprar armas
    function comprarArma(arma) {
        if (personaje.dinero >= arma.precio) {
            personaje.dinero -= arma.precio;
            personaje.inventario.push(arma);
            localStorage.setItem('personaje', JSON.stringify(personaje));
            alert(`Has comprado ${arma.nombre}`);
        } else {
            alert('No tienes suficiente dinero.');
        }
    }

    // Función para comprar pociones
    function comprarPocion(pocion) {
        if (personaje.dinero >= pocion.precio) {
            personaje.dinero -= pocion.precio;
            if (!personaje.pociones) personaje.pociones = [];
            personaje.pociones.push(pocion);
            localStorage.setItem('personaje', JSON.stringify(personaje));
            alert(`Has comprado ${pocion.nombre}`);
        } else {
            alert('No tienes suficiente dinero.');
        }
    }

    function volverAlLobby() {
        window.location.href = "lobby.html"; // Redirige al jugador al lobby
    }
}