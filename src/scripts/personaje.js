class Personaje {
    constructor(nombre, vida, ataque, defensa, nivel = 1, dinero = 100, imagen) {
        this.nombre = nombre;
        this.estadisticas = {
            vida,
            ataque,
            defensa
        };
        this.nivel = nivel;
        this.dinero = dinero;
        this.pociones = [];
        this.inventario = [];
        this.armaEquipada = null;
        this.imagen = imagen;
    }

    equiparArma(arma) {
        if (this.inventario.includes(arma)) {
            this.armaEquipada = arma;
        } else {
            alert("No tienes esta arma en tu inventario.");
        }
    }

    recibirDanio(danio) {
        const danioRecibido = Math.max(danio - this.estadisticas.defensa, 0);
        this.estadisticas.vida -= danioRecibido;
        if (this.estadisticas.vida <= 0) {
            alert(`${this.nombre} ha sido derrotado.`);
        }
    }

    subirDeNivel() {
        console.log(`${this.nombre} ha subido de nivel.`);
        this.nivel++;
        this.estadisticas.vida += 10;
        this.estadisticas.ataque += 2;
        this.estadisticas.defensa += 1;
    }

    agregarAlInventario(arma) {
        if (this.inventario.length < 10) { // Límite de 10 objetos en el inventario
            this.inventario.push(arma);
        } else {
            alert("El inventario está lleno.");
        }
    }

    mostrarEstadisticas() {
        console.log(`Estadísticas de ${this.nombre}:`);
        console.log(`Vida: ${this.estadisticas.vida}`);
        console.log(`Ataque: ${this.estadisticas.ataque}`);
        console.log(`Defensa: ${this.estadisticas.defensa}`);
    }
}

export default Personaje;