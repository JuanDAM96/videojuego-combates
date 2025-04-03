class Inventario {
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.armas = [];
    }

    agregarArma(arma) {
        if (this.armas.length < this.capacidad) {
            this.armas.push(arma);
            return true; // Arma agregada exitosamente
        }
        return false; // No se pudo agregar el arma, inventario lleno
    }

    equiparArma(arma) {
        if (this.armas.includes(arma)) {
            this.armaEquipada = arma;
            return true; // Arma equipada exitosamente
        }
        return false; // El arma no está en el inventario
    }

    mostrarInventario() {
        return this.armas; // Devuelve la lista de armas en el inventario
    }
}

if (window.location.pathname.endsWith('inventario.html')) {
    const personaje = JSON.parse(localStorage.getItem('personaje'));
    const inventario = new Inventario(5); // Crea una instancia de Inventario
    personaje.inventario.forEach(arma => inventario.agregarArma(arma)); // Agrega las armas del personaje al inventario

    const listaInventario = document.getElementById('lista-inventario');
    inventario.mostrarInventario().forEach(arma => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${arma.imagen}" alt="${arma.nombre}" style="width: 100px; height: 100px;">
            <p>${arma.nombre} - Ataque: ${arma.ataque}</p>
        `;
        const botonEquipar = document.createElement('button');
        botonEquipar.innerText = 'Equipar';
        botonEquipar.onclick = () => {
            const exito = inventario.equiparArma(arma);
            if (exito) {
                personaje.armaEquipada = arma; // Actualiza el arma equipada del personaje
                localStorage.setItem('personaje', JSON.stringify(personaje)); // Guarda los cambios en localStorage
                alert(`Has equipado el arma: ${arma.nombre}`);
            } else {
                alert('No se pudo equipar el arma.');
            }
        };
        div.appendChild(botonEquipar);
        listaInventario.appendChild(div);
    });
}