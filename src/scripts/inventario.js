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

    eliminarArma(arma) {
        const index = this.armas.indexOf(arma);
        if (index > -1) {
            this.armas.splice(index, 1);
            return true; // Arma eliminada exitosamente
        }
        return false; // El arma no se encontró en el inventario
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

// Ejemplo de uso
const inventario = new Inventario(5);
const arma1 = { nombre: "Espada", ataque: 10, precio: 100 };
const arma2 = { nombre: "Hacha", ataque: 15, precio: 150 };

inventario.agregarArma(arma1);
inventario.agregarArma(arma2);
console.log(inventario.mostrarInventario());