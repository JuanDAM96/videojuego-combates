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
    const armas = [
        { nombre: 'Espada', ataque: 10, precio: 100, imagen: '../../multimedia/images/espada.jpg' },
        { nombre: 'Hacha', ataque: 15, precio: 150, imagen: '../../multimedia/images/hacha.jpg' },
        { nombre: 'Lanza', ataque: 12, precio: 120, imagen: '../../multimedia/images/lanza.png' }
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
    
    function volverAlLobby() {
        window.location.href = "lobby.html"; // Redirige al jugador al lobby
    }
}