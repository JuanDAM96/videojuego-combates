class Enemigo {
    constructor(nombre, nivel, vida, ataque, defensa) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = defensa;
    }

    atacar(personaje) {
        const daño = this.calcularDaño();
        personaje.recibirDaño(daño);
        console.log(`${this.nombre} ataca a ${personaje.nombre} y causa ${daño} de daño.`);
    }

    calcularDaño() {
        return this.ataque - (this.defensa / 2);
    }

    recibirDaño(dano) {
        this.vida -= dano;
        if (this.vida < 0) {
            this.vida = 0;
        }
    }

    estaVivo() {
        return this.vida > 0;
    }
}