class Inventario {
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.armas = [];
    }

    agregarArma(arma) {
        if (this.armas.length < this.capacidad) {
            this.armas.push(arma);
            return true;
        } else {
            alert("El inventario está lleno.");
            return false;
        }
    }

    eliminarArma(arma) {
        const index = this.armas.indexOf(arma);
        if (index > -1) {
            this.armas.splice(index, 1);
            return true;
        } else {
            alert("El arma no está en el inventario.");
            return false;
        }
    }

    equiparArma(arma) {
        if (this.armas.includes(arma)) {
            this.armaEquipada = arma;
            return true;
        } else {
            alert("No tienes esta arma en tu inventario.");
            return false;
        }
    }

    mostrarInventario() {
        return this.armas;
    }
}

// Ejemplo de uso
const inventario = new Inventario(5);
const arma1 = { nombre: "Espada", ataque: 10, precio: 100 };
const arma2 = { nombre: "Hacha", ataque: 15, precio: 150 };

inventario.agregarArma(arma1);
inventario.agregarArma(arma2);
console.log(inventario.mostrarInventario());

document.getElementById('volverAlLobby').addEventListener('click', volverAlLobby);