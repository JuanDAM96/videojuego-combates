import Enemigo from './enemigo.js';

class Combate {
    constructor(personaje) {
        this.personaje = personaje;
        this.enemigos = Enemigo.crearEnemigos(); // Cargar enemigos desde la clase Enemigo
        this.escenarios = [
            { nombre: 'Bosque Encantado', imagen: '../../multimedia/images/bosque.jpg', tipo: 'bosque' },
            { nombre: 'Desierto Árido', imagen: '../../multimedia/images/desierto.jpg', tipo: 'desierto' },
            { nombre: 'Castillo Oscuro', imagen: '../../multimedia/images/castillo.jpg', tipo: 'castillo' }
        ];
        this.turno = 'jugador';

        // Cargar progreso desde localStorage o inicializarlo
        this.progreso = JSON.parse(localStorage.getItem('progreso')) || { bosque: false, desierto: false, castillo: false };
    }

    iniciarCombate() {
        // Determinar el escenario según el progreso
        if (!this.progreso.bosque) {
            this.escenario = this.escenarios.find(e => e.tipo === 'bosque');
            this.enemigo = this.enemigos[0]; // Criatura Mágica
        } else if (!this.progreso.desierto) {
            this.escenario = this.escenarios.find(e => e.tipo === 'desierto');
            this.enemigo = this.enemigos[1]; // Guerrero del Desierto
        } else if (!this.progreso.castillo) {
            this.escenario = this.escenarios.find(e => e.tipo === 'castillo');
            this.enemigo = this.enemigos[2]; // Jefe Oscuro
        } else {
            alert('¡Has completado todos los escenarios!');
            window.location.href = "lobby.html";
            return;
        }

        // Mostrar el escenario
        const body = document.querySelector('body');
        body.style.backgroundImage = `url(${this.escenario.imagen})`;
        body.style.backgroundSize = 'cover';

        // Mostrar imágenes del personaje y del enemigo
        const imagenPersonaje = document.getElementById('imagen-personaje');
        const imagenEnemigo = document.getElementById('imagen-enemigo');

        if (imagenPersonaje) {
            imagenPersonaje.src = this.personaje.imagen || '../../multimedia/images/personaje.jpg';
        } else {
            console.error("Elemento 'imagen-personaje' no encontrado.");
        }

        if (imagenEnemigo) {
            imagenEnemigo.src = this.enemigo.imagen;
        } else {
            console.error("Elemento 'imagen-enemigo' no encontrado.");
        }

        // Mostrar estado inicial
        this.mostrarEstado();
    }

    mostrarEstado() {
        const estadoCombate = document.getElementById('estado-combate');
        estadoCombate.innerText = `
            Escenario: ${this.escenario.nombre}
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
            this.ganarCombate();
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

    ganarCombate() {
        // Marcar el escenario actual como completado
        if (this.escenario.tipo === 'bosque') {
            this.progreso.bosque = true;
        } else if (this.escenario.tipo === 'desierto') {
            this.progreso.desierto = true;
        } else if (this.escenario.tipo === 'castillo') {
            this.progreso.castillo = true;
        }

        // Incrementar el oro del jugador
        const personaje = JSON.parse(localStorage.getItem('personaje'));
        personaje.dinero += 100; // Añadir 100 de oro
        localStorage.setItem('personaje', JSON.stringify(personaje)); // Guardar el nuevo estado del jugador

        // Guardar el progreso en localStorage
        localStorage.setItem('progreso', JSON.stringify(this.progreso));

        alert(`¡Has ganado el combate en el ${this.escenario.nombre} y obtuviste 100 de oro!`);
        window.location.href = "lobby.html";
    }
}

// Inicializa el combate
const personaje = JSON.parse(localStorage.getItem('personaje'));
const combate = new Combate(personaje);

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

export default Combate;