class Combate {
    constructor(personaje, enemigo) {
        this.personaje = personaje;
        this.enemigo = enemigo;
        this.turno = 'jugador'; 
    }

    iniciarCombate() {
        while (this.personaje.vida > 0 && this.enemigo.vida > 0) {
            this.realizarTurno();
        }
        console.log('Combate finalizado.');
        this.finalizarCombate();
    }

    realizarTurno() {
        if (this.turno === 'jugador') {
            this.mostrarEstado();
            const accion = this.seleccionarAccion(); 
            this.ejecutarAccion(accion);
            this.turno = 'enemigo';
        } else {
            this.accionEnemigo();
            this.turno = 'jugador';
        }
    }

    mostrarEstado() {
        console.log(`Estado del combate:`);
        console.log(`Vida del jugador: ${this.personaje.vida}`);
        console.log(`Vida del enemigo: ${this.enemigo.vida}`);
    }
    //PROGRAMAR ESTO
    seleccionarAccion() {
        return 'atacar';
    }

    ejecutarAccion(accion) {
        switch (accion) {
            case 'atacar':
                this.atacar(this.enemigo);
                break;
            case 'defender':
                this.defender();
                break;
            case 'huir':
                this.huir();
                break;
            default:
                console.log('Acción no válida');
        }
    }

    atacar(enemigo) {
        const dano = this.calcularDanio(this.personaje, enemigo);
        enemigo.vida -= dano;
        console.log(`El jugador ataca y causa ${dano} de daño.`);
    }

    calcularDanio(atacante, defensor) {
        const dano = atacante.ataque - defensor.defensa;
        return dano > 0 ? dano : 0; // Asegura que el daño no sea negativo
    }

    //PROGRAMAR ESTO
    defender() {
        console.log('El jugador se defiende.');
    }

    huir() {
        console.log('El jugador ha huido del combate.');
    }

    accionEnemigo() {
        const dano = this.calcularDanio(this.enemigo, this.personaje);
        this.personaje.vida -= dano;
        console.log(`El enemigo ataca y causa ${dano} de daño.`);
    }

    finalizarCombate() {
        if (this.personaje.vida <= 0) {
            alert('El jugador ha sido derrotado.');
        } else if (this.enemigo.vida <= 0) {
            alert('El enemigo ha sido derrotado. ¡Victoria!');
            console.log('El jugador ha ganado la batalla.' + this.personaje);
            debugger;
            this.personaje.subirDeNivel();
        }
    }
}
// Exportar la clase para su uso en otros módulos
export default Combate;