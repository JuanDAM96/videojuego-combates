class Arma {
    constructor(nombre, valorAtaque, precio) {
        this.nombre = nombre;
        this.valorAtaque = valorAtaque;
        this.precio = precio;
    }

    obtenerNombre() {
        return this.nombre;
    }

    obtenerValorAtaque() {
        return this.valorAtaque;
    }

    obtenerPrecio() {
        return this.precio;
    }
}