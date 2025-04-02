class Personaje {
    constructor(nombre, salud, capacidadInventario) {
        this.nombre = nombre;
        this.salud = salud;
        this.inventario = new Inventario(capacidadInventario); // Usamos la clase Inventario
    }

    // Métodos relacionados con el inventario delegan directamente a la clase Inventario
    agregarArma(arma) {
        return this.inventario.agregarArma(arma);
    }

    eliminarArma(arma) {
        return this.inventario.eliminarArma(arma);
    }

    equiparArma(arma) {
        return this.inventario.equiparArma(arma);
    }

    mostrarInventario() {
        return this.inventario.mostrarInventario();
    }
}

// Ejemplo de uso
const personaje = new Personaje("Guerrero", 100, 5);
const arma1 = { nombre: "Espada", ataque: 10, precio: 100 };
const arma2 = { nombre: "Hacha", ataque: 15, precio: 150 };

personaje.agregarArma(arma1);
personaje.agregarArma(arma2);
console.log(personaje.mostrarInventario());
personaje.equiparArma(arma1);