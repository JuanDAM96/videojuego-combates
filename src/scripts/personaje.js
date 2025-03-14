class Personaje {
    constructor(nombre, nivel = 1, dinero = 0) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.dinero = dinero;
        this.inventario = [];
        this.estadisticas = {
            vida: 100,
            ataque: 10,
            defensa: 5,
        };
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
        debugger;
        console.log(`${this.nombre} ha subido de nivel.`);
        this.nivel++;
        this.estadisticas.vida += 10;
        this.estadisticas.ataque += 2;
        this.estadisticas.defensa += 1
    }

    agregarAlInventario(arma) {
        if (this.inventario.length < 10) { // Limite de 10 objetos en el inventario
            this.inventario.push(arma);
        } else {
            alert("El inventario está lleno.");
        }
    }
}