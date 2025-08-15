// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Array para almacenar los nombres de los amigos
let amigos = [];
        
// Elementos del DOM
const inputAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');
const messageDiv = document.getElementById('message');
        
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}
        
// Función para agregar un amigo a la lista
function agregarAmigo() {
    const nombre = inputAmigo.value.trim();
            
    // Validar que el campo no esté vacío
    if (!nombre) {
        asignarTextoElemento('h2','Por favor, escribe un nombre');
        return;
    }
            
        // Validar que el nombre no esté repetido
        if (amigos.includes(nombre)) {
            asignarTextoElemento('h2','Este nombre ya está en la lista');
            return;
        }
            
        // Agregar el nombre al array
        amigos.push(nombre);
            
        // Actualizar la lista visual
        actualizarListaAmigos();
            
        // Limpiar el campo de entrada
        inputAmigo.value = '';
        inputAmigo.focus();
            
        // Mostrar mensaje de éxito
        asignarTextoElemento('h2',`${nombre} agregado a la lista`);
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    const nombreEliminado = amigos[index];
        amigos.splice(index, 1);
        actualizarListaAmigos();
        asignarTextoElemento('h2',`${nombreEliminado} eliminado de la lista`,);
}
        
// Función para realizar el sorteo del amigo secreto
function sortearAmigo() {
    // Validar que haya al menos 3 participantes
    if (amigos.length < 3) {
        asignarTextoElemento('h2', 'Se necesitan al menos 3 amigos para realizar el sorteo');
        return;
    }

    // Limpiar resultados anteriores
    resultado.innerHTML = '';
        
    // Crear una copia de la lista de amigos para mezclar
    let amigosAsignar = [...amigos];
        
    // Algoritmo de Fisher-Yates shuffle para mezclar la lista
    for (let i = amigosAsignar.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosAsignar[i], amigosAsignar[j]] = [amigosAsignar[j], amigosAsignar[i]];
    }

    // Corregir las asignaciones inválidas
        for (let i = 0; i < amigos.length; i++) {
            // Si un amigo se asigna a sí mismo...
            if (amigos[i] === amigosAsignar[i]) {
                // ...intercambiar con el siguiente elemento
                // Si es el último, intercambiar con el penúltimo
                const nextIndex = (i + 1) % amigos.length;
                [amigosAsignar[i], amigosAsignar[nextIndex]] = [amigosAsignar[nextIndex], amigosAsignar[i]];
            }
        }
        
    // Crear las asignaciones y mostrarlas
    const asignaciones = [];
        for (let i = 0; i < amigos.length; i++) {
            asignaciones.push({
                de: amigos[i],
                para: amigosAsignar[i]
            });
        }

            asignarTextoElemento('h2','Sorteo realizado');
            mostrarResultados(asignaciones);
}

function mostrarResultados(asignaciones) {
// 1. Crear un array de cadenas de texto con los resultados
    const mensajes = asignaciones.map(asignacion => {
        return `${asignacion.de} ➔ ${asignacion.para}`;
    });
// 2. Unir los mensajes en una sola cadena, separados por saltos de línea
    const mensajeFinal = mensajes.join('\n');
// 3. Mostrar la cadena de texto en una alerta
    alert(mensajeFinal);
// Llamar a la nueva función para reiniciar el juego
     reiniciarJuego(); 
}

// Función para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    // Limpiar lista actual
    listaAmigos.innerHTML = '';
            
    // Agregar cada amigo a la lista visual
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.className = 'friend-item';
        li.innerHTML = `
            <button class="remove-btn" onclick="eliminarAmigo(${index})">${amigo} X</button>
        `;
        listaAmigos.appendChild(li);
    });
}

// Permitir agregar con la tecla Enter
inputAmigo.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});
        
// Función para reiniciar el juego a su estado inicial
function reiniciarJuego() {
// 1. Vaciar el array de amigos
amigos = [];
// 2. Limpiar la lista visual de amigos
actualizarListaAmigos();
// 3. Limpiar el campo de entrada y el mensaje de resultado
inputAmigo.value = '';
asignarTextoElemento('h2', 'Ingresa los nombres de los amigos');
resultado.innerHTML = ''; 
}

// Inicializar la lista vacía
actualizarListaAmigos();