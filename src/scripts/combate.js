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

        // Actualizar el nombre del escenario
        const escenarioNombre = document.getElementById('escenario-nombre');
        if (!escenarioNombre) {
            const escenarioElement = document.createElement('p');
            escenarioElement.id = 'escenario-nombre';
            estadoCombate.appendChild(escenarioElement);
        }
        document.getElementById('escenario-nombre').innerText = `Escenario: ${this.escenario.nombre}`;

        // Actualizar las estadísticas del personaje
        const personajeStats = document.getElementById('personaje-stats');
        if (!personajeStats) {
            const personajeElement = document.createElement('p');
            personajeElement.id = 'personaje-stats';
            estadoCombate.appendChild(personajeElement);
        }
        document.getElementById('personaje-stats').innerText = `${this.personaje.nombre} - Vida: ${this.personaje.estadisticas.vida}`;

        // Actualizar las estadísticas del enemigo
        const enemigoStats = document.getElementById('enemigo-stats');
        if (!enemigoStats) {
            const enemigoElement = document.createElement('p');
            enemigoElement.id = 'enemigo-stats';
            estadoCombate.appendChild(enemigoElement);
        }
        document.getElementById('enemigo-stats').innerText = `${this.enemigo.nombre} - Vida: ${this.enemigo.vida}`;

        // Actualizar la cantidad de pociones
        const pocionesStats = document.getElementById('pociones-stats');
        if (!pocionesStats) {
            const pocionesElement = document.createElement('p');
            pocionesElement.id = 'pociones-stats';
            estadoCombate.appendChild(pocionesElement);
        }
        const cantidadPociones = this.personaje.pociones ? this.personaje.pociones.length : 0;
        document.getElementById('pociones-stats').innerText = `Pociones: ${cantidadPociones}`;
    }

    calcularDanio(atacante, defensor) {
        const danoBase = atacante.ataque - defensor.defensa;
        const danoFinal = danoBase > 0 ? danoBase : Math.floor(atacante.ataque * 0.2); // Daño mínimo basado en el 20% del ataque del atacante
        return danoFinal;
    }

    atacar() {
        if (this.turno !== 'jugador') return;

        const dano = this.calcularDanio(this.personaje.estadisticas, this.enemigo);
        this.enemigo.recibirDaño(dano);

        if (!this.enemigo.estaVivo()) {
            this.ganarCombate();
            return;
        }

        this.turno = 'enemigo';
        this.accionEnemigo();
    }

    defender() {
        if (this.turno !== 'jugador') return;
    
        const defensaTemporal = 5; // Incremento temporal de defensa
        this.personaje.estadisticas.defensa += defensaTemporal;
        console.log(`${this.personaje.nombre} se ha puesto en modo de defensa. La defensa aumentará durante 2 ataques enemigos.`);
    
        // Establecer un contador de ataques enemigos
        this.defensaActiva = 2;
    
        // Cambiar el turno al enemigo
        this.turno = 'enemigo';
        this.accionEnemigo();
    }

    huir() {
        alert('Has huido del combate.');
        window.location.href = "lobby.html";
    }

    usarPocion() {
        if (!this.personaje.pociones || this.personaje.pociones.length === 0) {
            alert('No tienes pociones disponibles.');
            return;
        }

        const pocion = this.personaje.pociones.pop();
        this.personaje.estadisticas.vida = Math.min(this.personaje.estadisticas.vida + pocion.cura, 100);
        alert(`Has usado una poción. Vida actual: ${this.personaje.estadisticas.vida}`);
        this.mostrarEstado();
    }

    accionEnemigo() {
        if (this.turno !== 'enemigo') return;
    
        this.enemigo.atacar(this.personaje);
    
        // Reducir el contador de defensa activa si está activo
        if (this.defensaActiva > 0) {
            this.defensaActiva--;
            console.log(`Ataque enemigo recibido. Defensa activa restante: ${this.defensaActiva} ataques.`);
            if (this.defensaActiva === 0) {
                this.personaje.estadisticas.defensa -= 5; // Eliminar el incremento de defensa
                console.log('El efecto de defensa ha terminado.');
            }
        }
    
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

        // Subir de nivel al personaje
        personaje.nivel++;
        personaje.estadisticas.vida += 10; // Incrementar vida al subir de nivel
        personaje.estadisticas.ataque += 2; // Incrementar ataque al subir de nivel
        personaje.estadisticas.defensa += 1; // Incrementar defensa al subir de nivel

        // Guardar el nuevo estado del personaje
        localStorage.setItem('personaje', JSON.stringify(personaje));

        // Guardar el progreso en localStorage
        localStorage.setItem('progreso', JSON.stringify(this.progreso));

        // Verificar si se han completado todos los escenarios
        if (this.progreso.bosque && this.progreso.desierto && this.progreso.castillo) {
            alert('¡Has completado todos los escenarios! Felicidades, has ganado el juego.');
            window.location.href = "victoria.html"; // Redirigir a la pantalla de victoria
        } else {
            alert(`¡Has ganado el combate en el ${this.escenario.nombre}, subiste al nivel ${personaje.nivel} y obtuviste 100 de oro!`);
            window.location.href = "lobby.html"; // Redirigir al lobby
        }
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

window.usarPocion = () => {
    combate.usarPocion();
};

export default Combate;