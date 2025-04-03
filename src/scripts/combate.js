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

    calcularDanio(atacante, defensor) {
        const dano = atacante.ataque - defensor.defensa;
        return dano > 0 ? dano : 0; // Asegura que el daño no sea negativo
    }

    accionEnemigo() {
        const dano = this.calcularDanio(this.enemigo, this.personaje);
        this.personaje.vida -= dano;
        console.log(`El enemigo ataca y causa ${dano} de daño.`);
    }
}
if (window.location.pathname.endsWith('combate.html')) {
    const personaje = JSON.parse(localStorage.getItem('personaje'));
    const enemigo = { nombre: 'Enemigo', nivel: 1, vida: 100, ataque: 6, defensa: 5 };
    const estadoCombate = document.getElementById('estado-combate');
    estadoCombate.innerText = `
        ${personaje.nombre} vs ${enemigo.nombre}
        Vida: ${personaje.vida} - ${enemigo.vida}
    `;

    window.atacar = function() {
        enemigo.vida -= personaje.armaEquipada.ataque;
        if (enemigo.vida <= 0) {
            alert('Has ganado el combate!');
            window.location.href = "lobby.html";
        } else {
            personaje.vida -= enemigo.ataque;
            if (personaje.vida <= 0) {
                alert('Has perdido el combate!');
                window.location.href = "lobby.html";
            }
        }
        estadoCombate.innerText = `
            ${personaje.nombre} vs ${enemigo.nombre}
            Vida: ${personaje.vida} - ${enemigo.vida}
        `;
    };

    window.defender = function() {
        personaje.vida -= (enemigo.ataque - personaje.defensa);
        if (personaje.vida <= 0) {
            alert('Has perdido el combate!');
            window.location.href = "lobby.html";
        }
        estadoCombate.innerText = `
            ${personaje.nombre} vs ${enemigo.nombre}
            Vida: ${personaje.vida} - ${enemigo.vida}
        `;
    };

    window.huir = function() {
        alert('Has huido del combate!');
        window.location.href = "lobby.html";
    };
}
// Exportar la clase para su uso en otros módulos
