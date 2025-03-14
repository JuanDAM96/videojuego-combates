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

    comprarArma(index) {
        const arma = this.armasDisponibles[index];
        if (this.jugador.dinero >= arma.precio) {
            this.jugador.dinero -= arma.precio;
            this.jugador.inventario.agregarArma(arma);
            alert(`Has comprado ${arma.nombre}. Te quedan ${this.jugador.dinero} monedas.`);
        } else {
            alert('No tienes suficiente dinero para comprar esta arma.');
        }
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
tienda.agregarArma({ nombre: 'Espada', precio: 50 });
tienda.agregarArma({ nombre: 'Hacha', precio: 75 });
tienda.mostrarArmas();