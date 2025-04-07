class Personaje {
    constructor(nombre, puntosEstadisticas = { vida: 100, ataque: 10, defensa: 5 }, nivel = 1, dinero = 0) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.dinero = dinero;
        this.inventario = [];
        this.estadisticas = {
            vida: puntosEstadisticas.vida,
            ataque: puntosEstadisticas.ataque,
            defensa: puntosEstadisticas.defensa,
        };
        this.armaEquipada = espadaRota;
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