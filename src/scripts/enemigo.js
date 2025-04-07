class Enemigo {
    constructor(nombre, nivel, vida, ataque, defensa, imagen) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = defensa;
        this.imagen = imagen;
    }

    atacar(personaje) {
        const dano = this.calcularDanio(personaje.estadisticas.defensa);
        personaje.estadisticas.vida -= dano;
        console.log(`${this.nombre} ataca a ${personaje.nombre} y causa ${dano} de daño.`);
    }

    calcularDanio(defensaObjetivo) {
        // Genera un daño aleatorio entre el 100% y el 150% del ataque base
        const ataqueAleatorio = this.ataque * (0.8 + Math.random() * 0.3);
        const dano = Math.floor(ataqueAleatorio - defensaObjetivo);
        return dano > 0 ? dano : 1; // Asegura que siempre haya un daño mínimo de 1
    }

    recibirDaño(dano) {
        this.vida -= dano;
        if (this.vida < 0) {
            this.vida = 0;
        }
        console.log(`${this.nombre} ha recibido ${dano} de daño. Vida restante: ${this.vida}`);
    }

    estaVivo() {
        return this.vida > 0;
    }

    // Método estático para crear enemigos predefinidos
    static crearEnemigos() {
        return [
            new Enemigo('Criatura Mágica', 1, 80, 15, 5, '../../multimedia/images/enemigo_bosque.jpg'),
            new Enemigo('Guerrero del Desierto', 1, 100, 10, 8, '../../multimedia/images/enemigo_desierto.jpg'),
            new Enemigo('Jefe Oscuro', 1, 150, 15, 9, '../../multimedia/images/enemigo_castillo.jpg')
        ];
    }
}

export default Enemigo;