import Enemigo from './enemigo.js';

class Combate {
    constructor(personaje, enemigo) {
        this.personaje = personaje;
        this.enemigo = enemigo;
        this.turno = 'jugador';
    }

    iniciarCombate() {
        this.mostrarEstado();
    }

    mostrarEstado() {
        const estadoCombate = document.getElementById('estado-combate');
        estadoCombate.innerText = `
            ${this.personaje.nombre} vs ${this.enemigo.nombre}
            Vida: ${this.personaje.estadisticas.vida} - ${this.enemigo.vida}
        `;
    }

    calcularDanio(atacante, defensor) {
        const dano = atacante.ataque - defensor.defensa;
        return dano > 0 ? dano : 1; // Asegura que siempre haya un daño mínimo de 1
    }

    atacar() {
        if (this.turno !== 'jugador') return;

        const dano = this.calcularDanio(this.personaje.estadisticas, this.enemigo);
        this.enemigo.recibirDaño(dano);
        console.log(`Has atacado al enemigo y causado ${dano} de daño.`);

        if (!this.enemigo.estaVivo()) {
            alert('¡Has ganado el combate!');
            window.location.href = "lobby.html";
            return;
        }

        this.turno = 'enemigo';
        this.accionEnemigo();
    }

    defender() {
        if (this.turno !== 'jugador') return;

        const defensaTemporal = 3; // Incremento temporal de defensa
        this.personaje.estadisticas.defensa += defensaTemporal;
        console.log('Te has defendido, tu defensa ha aumentado temporalmente.');

        this.turno = 'enemigo';
        this.accionEnemigo();

        // Elimina el efecto de la defensa temporal después del ataque del enemigo
        setTimeout(() => {
            this.personaje.estadisticas.defensa -= defensaTemporal;
            console.log('La defensa temporal ha terminado.');
        }, 1000);
    }

    huir() {
        alert('Has huido del combate.');
        window.location.href = "lobby.html";
    }

    accionEnemigo() {
        if (this.turno !== 'enemigo') return;

        this.enemigo.atacar(this.personaje);

        if (this.personaje.estadisticas.vida <= 0) {
            alert('¡Has perdido el combate!');
            window.location.href = "lobby.html";
            return;
        }

        this.turno = 'jugador';
        this.mostrarEstado();
    }
}

// Inicializa el combate
const personaje = JSON.parse(localStorage.getItem('personaje'));
const enemigo = new Enemigo('Enemigo', 1, 100, 12, 8);
const combate = new Combate(personaje, enemigo);

combate.iniciarCombate();

// Asigna las funciones al objeto `window` para que sean accesibles globalmente
window.atacar = () => {
    combate.atacar();
    combate.mostrarEstado();
};

window.defender = () => {
    combate.defender();
    combate.mostrarEstado();
};

window.huir = () => {
    combate.huir();
};