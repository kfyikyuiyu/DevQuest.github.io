// ============================================================
//  B A S E   D E   D A T O S   (localStorage)
// ============================================================

const DB = {
    // Obtener todos los usuarios
    getUsuarios() {
        const data = localStorage.getItem('devquest_usuarios');
        return data ? JSON.parse(data) : {};
    },

    // Guardar todos los usuarios
    guardarUsuarios(usuarios) {
        localStorage.setItem('devquest_usuarios', JSON.stringify(usuarios));
    },

    // Obtener un usuario específico
    getUsuario(nombre) {
        const usuarios = this.getUsuarios();
        return usuarios[nombre] || null;
    },

    // Crear o actualizar un usuario
    setUsuario(nombre, data) {
        const usuarios = this.getUsuarios();
        usuarios[nombre] = { ...usuarios[nombre], ...data };
        this.guardarUsuarios(usuarios);
    },

    // Verificar si un usuario existe
    existeUsuario(nombre) {
        const usuarios = this.getUsuarios();
        return !!usuarios[nombre];
    },

    // Obtener el progreso de un usuario
    getProgreso(nombre) {
        const usuario = this.getUsuario(nombre);
        return usuario ? usuario.progreso || {} : {};
    },

    // Guardar progreso de un usuario
    setProgreso(nombre, progreso) {
        const usuario = this.getUsuario(nombre);
        if (usuario) {
            usuario.progreso = progreso;
            this.setUsuario(nombre, usuario);
        }
    },

    // Obtener el usuario actual (sesión)
    getSesion() {
        return localStorage.getItem('devquest_sesion') || null;
    },

    // Iniciar sesión
    iniciarSesion(nombre) {
        localStorage.setItem('devquest_sesion', nombre);
    },

    // Cerrar sesión
    cerrarSesion() {
        localStorage.removeItem('devquest_sesion');
    },

    // Verificar si hay sesión activa
    haySesion() {
        return !!this.getSesion();
    }
};

// ============================================================
//  50 P R E G U N T A S   D E   P R O G R A M A C I Ó N
// ============================================================
const PREGUNTAS_BASE = [
    // ---- BÁSICO (11) ----
    { pregunta: '¿Qué significa CSS?', opciones: ['Hojas de estilo en cascada', 'Hojas de estilo creativas', 'Sistema de estilo por computadora', 'Hojas de estilo con colores'], correcta: 0 },
    { pregunta: '¿Cuál de estos NO es un lenguaje de programación?', opciones: ['Python', 'Java', 'HTML', 'C++'], correcta: 2 },
    { pregunta: '¿Cómo se escribe un comentario en JavaScript?', opciones: ['<!-- -->', '// o /* */', '**', '#'], correcta: 1 },
    { pregunta: '¿Qué significa "DOM" en programación web?', opciones: ['Modelo de objetos de datos', 'Modelo de objetos del documento', 'Dominio de objetos múltiples', 'Documento orientado a memoria'], correcta: 1 },
    { pregunta: '¿Qué hace "console.log()" en JavaScript?', opciones: ['Muestra un mensaje en la consola del navegador', 'Guarda datos en el servidor', 'Crea una variable', 'Detiene la ejecución del código'], correcta: 0 },
    { pregunta: '¿Qué propiedad de CSS se usa para cambiar el color de fondo?', opciones: ['color', 'background-color', 'font-color', 'bgcolor'], correcta: 1 },
    { pregunta: '¿Qué es una variable en programación?', opciones: ['Un espacio para guardar datos', 'Un tipo de bucle', 'Una función matemática', 'Un estilo de CSS'], correcta: 0 },
    { pregunta: '¿Cuál es la extensión de un archivo HTML?', opciones: ['.html', '.css', '.js', '.txt'], correcta: 0 },
    { pregunta: '¿Qué etiqueta HTML se usa para enlaces?', opciones: ['<a>', '<link>', '<href>', '<url>'], correcta: 0 },
    { pregunta: '¿Qué significa "API" en programación?', opciones: ['Interfaz de programación de aplicaciones', 'Aplicación de protocolo de internet', 'Archivo de programa interno', 'Asistente de programación interactivo'], correcta: 0 },
    { pregunta: '¿Qué es "AJAX"?', opciones: ['Técnica para actualizar páginas sin recargar', 'Un lenguaje de programación', 'Un tipo de base de datos', 'Un navegador web'], correcta: 0 },
    // ---- INTERMEDIO (10) ----
    { pregunta: '¿Qué tipo de dato es "true" en JavaScript?', opciones: ['String', 'Number', 'Boolean', 'Array'], correcta: 2 },
    { pregunta: '¿Qué hace el operador "===" en JavaScript?', opciones: ['Compara valor y tipo', 'Compara solo el valor', 'Asigna un valor', 'Concatena cadenas'], correcta: 0 },
    { pregunta: '¿Qué es un "array" en programación?', opciones: ['Una lista de elementos', 'Un tipo de bucle', 'Una función', 'Un estilo de CSS'], correcta: 0 },
    { pregunta: '¿Qué hace "break" en un bucle?', opciones: ['Termina el bucle', 'Pausa el bucle', 'Reinicia el bucle', 'Salta a la siguiente iteración'], correcta: 0 },
    { pregunta: '¿Cuál es el símbolo para comentarios en CSS?', opciones: ['/* */', '//', '<!-- -->', '#'], correcta: 0 },
    { pregunta: '¿Qué es un "framework" en programación?', opciones: ['Un conjunto de herramientas para desarrollar', 'Un tipo de variable', 'Un navegador web', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué significa "JSON" en programación?', opciones: ['Notación de objetos JavaScript', 'JavaScript online network', 'Javascript orientado a objetos', 'Lenguaje de consulta'], correcta: 0 },
    { pregunta: '¿Qué hace "addEventListener" en JavaScript?', opciones: ['Escucha eventos del usuario', 'Agrega un elemento HTML', 'Elimina un evento', 'Crea una variable global'], correcta: 0 },
    { pregunta: '¿Qué significa "flexbox" en CSS?', opciones: ['Un modelo de diseño para alinear elementos', 'Un tipo de fuente', 'Un navegador web', 'Un lenguaje de programación'], correcta: 0 },
    { pregunta: '¿Qué etiqueta HTML se usa para imágenes?', opciones: ['<img>', '<image>', '<src>', '<picture>'], correcta: 0 },
    // ---- AVANZADO (9) ----
    { pregunta: '¿Qué es un "callback" en JavaScript?', opciones: ['Una función que se pasa como argumento', 'Un tipo de variable', 'Un bucle infinito', 'Un error de sintaxis'], correcta: 0 },
    { pregunta: '¿Qué significa "REST" en API?', opciones: ['Transferencia de estado representacional', 'Red de servidores web', 'Registro de sistemas', 'Recurso estático'], correcta: 0 },
    { pregunta: '¿Qué hace "map()" en JavaScript?', opciones: ['Crea un nuevo array transformando los elementos', 'Ordena un array', 'Filtra elementos de un array', 'Elimina elementos duplicados'], correcta: 0 },
    { pregunta: '¿Qué es "TypeScript"?', opciones: ['Un superset de JavaScript con tipos', 'Un nuevo lenguaje de programación', 'Un framework de CSS', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es "Node.js"?', opciones: ['Un entorno para ejecutar JavaScript en el servidor', 'Un framework de CSS', 'Un navegador web', 'Una base de datos'], correcta: 0 },
    { pregunta: '¿Qué es "React"?', opciones: ['Una biblioteca de JavaScript para interfaces de usuario', 'Un lenguaje de programación', 'Un tipo de base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es "Git"?', opciones: ['Un sistema de control de versiones', 'Un lenguaje de programación', 'Un servidor web', 'Un editor de código'], correcta: 0 },
    { pregunta: '¿Qué es un "algoritmo"?', opciones: ['Un conjunto de pasos para resolver un problema', 'Un tipo de variable', 'Un error de programación', 'Un estilo de diseño'], correcta: 0 },
    { pregunta: '¿Qué hace "filter()" en JavaScript?', opciones: ['Crea un nuevo array con elementos que cumplen una condición', 'Ordena un array', 'Transforma todos los elementos', 'Elimina elementos duplicados'], correcta: 0 },
    // ---- EXPERTO (20) ----
    { pregunta: '¿Qué es "Redux"?', opciones: ['Un contenedor de estado para aplicaciones JavaScript', 'Un framework de CSS', 'Un lenguaje de programación', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es "Webpack"?', opciones: ['Un empaquetador de módulos de JavaScript', 'Un editor de código', 'Un tipo de base de datos', 'Un servidor web'], correcta: 0 },
    { pregunta: '¿Qué es "NPM"?', opciones: ['El gestor de paquetes de Node.js', 'Un lenguaje de programación', 'Un framework de CSS', 'Un navegador web'], correcta: 0 },
    { pregunta: '¿Qué es "MongoDB"?', opciones: ['Una base de datos NoSQL', 'Un lenguaje de programación', 'Un framework de CSS', 'Un servidor web'], correcta: 0 },
    { pregunta: '¿Qué es "Express.js"?', opciones: ['Un framework de Node.js para aplicaciones web', 'Un lenguaje de programación', 'Una base de datos', 'Un editor de código'], correcta: 0 },
    { pregunta: '¿Qué es "Promise" en JavaScript?', opciones: ['Un objeto que representa una operación asíncrona', 'Un tipo de bucle', 'Una variable global', 'Un error de sintaxis'], correcta: 0 },
    { pregunta: '¿Qué hace "async/await" en JavaScript?', opciones: ['Maneja operaciones asíncronas de forma síncrona', 'Crea variables globales', 'Define funciones recursivas', 'Ordena arrays'], correcta: 0 },
    { pregunta: '¿Qué es "SQL"?', opciones: ['Lenguaje de consulta estructurada', 'Un lenguaje de programación web', 'Un framework de CSS', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es "Docker"?', opciones: ['Una plataforma para contenedores de aplicaciones', 'Un lenguaje de programación', 'Un framework de CSS', 'Un servidor web'], correcta: 0 },
    { pregunta: '¿Qué es "Kubernetes"?', opciones: ['Un orquestador de contenedores', 'Un lenguaje de programación', 'Un framework de CSS', 'Una base de datos'], correcta: 0 },
    { pregunta: '¿Qué es "Angular"?', opciones: ['Un framework de desarrollo web de Google', 'Un lenguaje de programación', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es "Vue.js"?', opciones: ['Un framework progresivo de JavaScript', 'Un lenguaje de programación', 'Un tipo de base de datos', 'Un servidor web'], correcta: 0 },
    { pregunta: '¿Qué es "GraphQL"?', opciones: ['Un lenguaje de consulta para APIs', 'Un framework de CSS', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es "Firebase"?', opciones: ['Una plataforma de desarrollo de Google', 'Un lenguaje de programación', 'Un framework de CSS', 'Un servidor web'], correcta: 0 },
    { pregunta: '¿Qué es "Sass"?', opciones: ['Un preprocesador de CSS', 'Un lenguaje de programación', 'Un framework de JS', 'Una base de datos'], correcta: 0 },
    { pregunta: '¿Qué es "Bootstrap"?', opciones: ['Un framework de CSS para diseño responsive', 'Un lenguaje de programación', 'Un servidor web', 'Una base de datos'], correcta: 0 },
    { pregunta: '¿Qué es "Jest"?', opciones: ['Un framework de pruebas para JavaScript', 'Un lenguaje de programación', 'Un framework de CSS', 'Un servidor web'], correcta: 0 },
    { pregunta: '¿Qué es "WebSocket"?', opciones: ['Un protocolo de comunicación en tiempo real', 'Un lenguaje de programación', 'Un framework de CSS', 'Una base de datos'], correcta: 0 },
    { pregunta: '¿Qué es "JWT"?', opciones: ['JSON Web Token para autenticación', 'Un lenguaje de programación', 'Un framework de CSS', 'Un servidor web'], correcta: 0 },
    { pregunta: '¿Qué es "Microservicios"?', opciones: ['Una arquitectura de aplicaciones en servicios pequeños', 'Un lenguaje de programación', 'Un framework de CSS', 'Una base de datos'], correcta: 0 }
];

// ============================================================
//  E S T A D O   G L O B A L
// ============================================================
let usuarioActual = null;
let estadoPreguntas = [];
let aciertos = 0;
let fallos = 0;
let carpetaActual = null;
let preguntaActual = null;
const total = PREGUNTAS_BASE.length;

// ============================================================
//  F U N C I O N E S   D E   A U T E N T I C A C I Ó N
// ============================================================

function registrarUsuario() {
    const usuario = document.getElementById('regUsuario').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const nombre = document.getElementById('regNombre').value.trim();
    const errorEl = document.getElementById('regError');

    if (!usuario || !password || !nombre) {
        errorEl.textContent = '⚠️ Todos los campos son obligatorios';
        errorEl.style.display = 'block';
        return;
    }

    if (usuario.length < 3) {
        errorEl.textContent = '⚠️ El usuario debe tener al menos 3 caracteres';
        errorEl.style.display = 'block';
        return;
    }

    if (password.length < 4) {
        errorEl.textContent = '⚠️ La contraseña debe tener al menos 4 caracteres';
        errorEl.style.display = 'block';
        return;
    }

    if (DB.existeUsuario(usuario)) {
        errorEl.textContent = '⚠️ Este usuario ya existe. Elige otro.';
        errorEl.style.display = 'block';
        return;
    }

    // Crear usuario
    DB.setUsuario(usuario, {
        password: password,
        nombre: nombre,
        progreso: {},
        fechaRegistro: new Date().toISOString()
    });

    errorEl.style.display = 'none';
    alert('✅ ¡Usuario registrado exitosamente! Ahora inicia sesión.');
    
    // Limpiar campos y mostrar login
    document.getElementById('regUsuario').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regNombre').value = '';
    mostrarLogin();
}

function iniciarSesion() {
    const usuario = document.getElementById('loginUsuario').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const errorEl = document.getElementById('loginError');

    if (!usuario || !password) {
        errorEl.textContent = '⚠️ Ingresa usuario y contraseña';
        errorEl.style.display = 'block';
        return;
    }

    const userData = DB.getUsuario(usuario);
    if (!userData) {
        errorEl.textContent = '⚠️ Usuario no encontrado. Regístrate primero.';
        errorEl.style.display = 'block';
        return;
    }

    if (userData.password !== password) {
        errorEl.textContent = '⚠️ Contraseña incorrecta';
        errorEl.style.display = 'block';
        return;
    }

    errorEl.style.display = 'none';
    DB.iniciarSesion(usuario);
    usuarioActual = usuario;
    cargarApp();
}

function cerrarSesion() {
    DB.cerrarSesion();
    usuarioActual = null;
    mostrarLogin();
}

function mostrarLogin() {
    document.getElementById('pantallaLogin').style.display = 'block';
    document.getElementById('pantallaApp').style.display = 'none';
    document.getElementById('formLogin').style.display = 'block';
    document.getElementById('formRegistro').style.display = 'none';
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('regError').style.display = 'none';
    document.getElementById('loginUsuario').value = '';
    document.getElementById('loginPassword').value = '';
}

function mostrarRegistro() {
    document.getElementById('formLogin').style.display = 'none';
    document.getElementById('formRegistro').style.display = 'block';
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('regError').style.display = 'none';
}

function cargarApp() {
    document.getElementById('pantallaLogin').style.display = 'none';
    document.getElementById('pantallaApp').style.display = 'block';
    
    const userData = DB.getUsuario(usuarioActual);
    document.getElementById('usuarioActual').textContent = usuarioActual;
    document.getElementById('perfilNombre').textContent = usuarioActual;
    document.getElementById('perfilNombreCompleto').textContent = userData ? userData.nombre : '-';
    
    // Cargar progreso del usuario
    const progreso = DB.getProgreso(usuarioActual) || {};
    estadoPreguntas = PREGUNTAS_BASE.map((p, i) => {
        const key = `p${i}`;
        return {
            respondida: !!progreso[key],
            acertada: progreso[key] === true,
            seleccion: progreso[`${key}_sel`] || null,
            votos: Math.floor(Math.random() * 10) + 1,
            autor: ['Carlos', 'María', 'Juan', 'Ana', 'Luis', 'Elena', 'Delvi', 'Pablo', 'Sofía', 'Miguel'][Math.floor(Math.random() * 10)],
            tiempo: ['hace 2 min', 'hace 5 min', 'hace 10 min', 'hace 30 min', 'hace 1 hora', 'hace 2 horas', 'hace 3 horas', 'hace 1 día', 'hace 2 días'][Math.floor(Math.random() * 9)]
        };
    });

    aciertos = estadoPreguntas.filter(e => e.acertada).length;
    fallos = estadoPreguntas.filter(e => e.respondida && !e.acertada).length;

    carpetaActual = null;
    preguntaActual = null;
    mostrarVista('carpetas');
}

// ============================================================
//  G U A R D A R   P R O G R E S O
// ============================================================
function guardarProgreso() {
    if (!usuarioActual) return;
    const progreso = {};
    estadoPreguntas.forEach((e, i) => {
        const key = `p${i}`;
        progreso[key] = e.acertada;
        progreso[`${key}_sel`] = e.seleccion;
    });
    DB.setProgreso(usuarioActual, progreso);
}

// ============================================================
//  F U N C I O N E S   D E   V I S T A
// ============================================================
function mostrarVista(vista) {
    const vistaCarpetas = document.getElementById('vistaCarpetas');
    const vistaPreguntas = document.getElementById('vistaPreguntas');
    const vistaRespuesta = document.getElementById('vistaRespuesta');
    const pantallaPerfil = document.getElementById('pantallaPerfil');

    vistaCarpetas.style.display = 'none';
    vistaPreguntas.style.display = 'none';
    vistaRespuesta.style.display = 'none';
    pantallaPerfil.style.display = 'none';

    if (vista === 'carpetas') {
        vistaCarpetas.style.display = 'block';
        document.getElementById('breadActual').textContent = 'Carpetas';
        renderizarCarpetas();
    } else if (vista === 'preguntas') {
        vistaPreguntas.style.display = 'block';
        document.getElementById('breadActual').textContent = 'Página Web';
        renderizarPreguntas();
    } else if (vista === 'respuesta') {
        vistaRespuesta.style.display = 'block';
        document.getElementById('breadActual').textContent = 'Respondiendo...';
        renderizarPreguntaRespuesta();
    } else if (vista === 'perfil') {
        pantallaPerfil.style.display = 'block';
        document.getElementById('breadActual').textContent = 'Perfil';
        actualizarPerfil();
    }
    actualizarContadores();
}

function actualizarContadores() {
    const acertadas = estadoPreguntas.filter(e => e.acertada).length;
    const respondidas = estadoPreguntas.filter(e => e.respondida).length;
    aciertos = acertadas;
    fallos = respondidas - acertadas;
    document.getElementById('aciertosHeader').textContent = acertadas;
    document.getElementById('totalHeader').textContent = total;
    document.getElementById('totalPreguntasCarpetas').textContent = total;
}

// ============================================================
//  R E N D E R I Z A R   C A R P E T A S
// ============================================================
function renderizarCarpetas() {
    const grid = document.getElementById('carpetasGrid');
    grid.innerHTML = '';
    const respondidas = estadoPreguntas.filter(e => e.respondida).length;
    const porcentaje = total > 0 ? Math.round((respondidas / total) * 100) : 0;

    const card = document.createElement('div');
    card.className = 'carpeta-card fade-in';
    card.innerHTML = `
        <div class="badge-cantidad">${total}</div>
        <span class="icon">🌐</span>
        <div class="nombre">Página Web</div>
        <div class="info">Todas las preguntas del curso</div>
        <div class="meta-info">
            <span>📝 ${respondidas} respondidas</span>
            <span>⏳ ${total - respondidas} pendientes</span>
        </div>
        <div class="progreso">
            <div class="barra" style="width:${porcentaje}%;"></div>
        </div>
    `;
    card.addEventListener('click', () => {
        carpetaActual = 'web';
        mostrarVista('preguntas');
    });
    grid.appendChild(card);
}

// ============================================================
//  R E N D E R I Z A R   P R E G U N T A S
// ============================================================
function renderizarPreguntas() {
    document.getElementById('tituloCarpeta').textContent = '🌐 Página Web';
    const respondidas = estadoPreguntas.filter(e => e.respondida).length;
    document.getElementById('infoCarpeta').textContent = `${total} preguntas • ${respondidas} respondidas`;

    const list = document.getElementById('preguntasList');
    list.innerHTML = '';
    PREGUNTAS_BASE.forEach((p, idx) => {
        const estado = estadoPreguntas[idx];

        const item = document.createElement('div');
        item.className = 'question-item fade-in';
        item.style.animationDelay = `${idx * 0.02}s`;

        let estadoClase = 'estado-pendiente';
        let estadoTexto = 'Pendiente';
        if (estado.respondida) {
            if (estado.acertada) {
                estadoClase = 'estado-correcta';
                estadoTexto = '✅ Correcta';
            } else {
                estadoClase = 'estado-incorrecta';
                estadoTexto = '❌ Incorrecta';
            }
        }

        item.innerHTML = `
            <div class="q-left">
                <span class="num">${idx + 1}</span>
                <span class="texto">${p.pregunta}</span>
            </div>
            <div class="q-right">
                <span class="estado ${estadoClase}">${estadoTexto}</span>
            </div>
        `;

        item.addEventListener('click', () => {
            preguntaActual = idx;
            mostrarVista('respuesta');
        });

        list.appendChild(item);
    });
}

// ============================================================
//  R E N D E R I Z A R   R E S P U E S T A
// ============================================================
function renderizarPreguntaRespuesta() {
    if (preguntaActual === null) return;
    const data = PREGUNTAS_BASE[preguntaActual];
    const estado = estadoPreguntas[preguntaActual];

    document.getElementById('respuestaNumero').textContent = `Pregunta ${preguntaActual + 1} de ${total}`;
    document.getElementById('respuestaPregunta').textContent = data.pregunta;
    document.getElementById('respuestaFeedback').innerHTML = '';

    const letras = ['A', 'B', 'C', 'D'];
    const container = document.getElementById('respuestaOpciones');
    container.innerHTML = '';

    data.opciones.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'opt';
        if (estado.respondida) {
            div.classList.add('disabled');
            if (i === data.correcta) div.classList.add('correct');
            if (i === estado.seleccion && i !== data.correcta) div.classList.add('incorrect');
        }
        div.innerHTML = `
            <span class="letter">${letras[i]}</span>
            ${opt}
        `;
        if (!estado.respondida) {
            div.addEventListener('click', () => {
                const esCorrecta = (i === data.correcta);
                estado.respondida = true;
                estado.seleccion = i;
                estado.acertada = esCorrecta;
                guardarProgreso();
                renderizarPreguntaRespuesta();
                actualizarContadores();
            });
        }
        container.appendChild(div);
    });

    if (estado.respondida) {
        const feedback = document.getElementById('respuestaFeedback');
        const fb = document.createElement('div');
        fb.className = `feedback-text ${estado.acertada ? 'ok' : 'fail'}`;
        fb.innerHTML = estado.acertada ?
            '✅ ¡Correcto! Bien hecho. 🎉' :
            `❌ Ups, la correcta era: "<strong>${data.opciones[data.correcta]}</strong>". ¡Sigue intentando! 💪`;
        feedback.appendChild(fb);
    }

    document.getElementById('breadActual').textContent = `Pregunta ${preguntaActual + 1}`;
}

// ============================================================
//  P E R F I L
// ============================================================
function actualizarPerfil() {
    const respondidas = estadoPreguntas.filter(e => e.respondida).length;
    const acertadas = estadoPreguntas.filter(e => e.acertada).length;
    const fallosTotal = respondidas - acertadas;

    document.getElementById('perfilAciertos').textContent = acertadas;
    document.getElementById('perfilFallos').textContent = fallosTotal;

    let porcentaje = 0;
    if (respondidas > 0) porcentaje = Math.round((acertadas / respondidas) * 100);
    document.getElementById('perfilPorcentaje').textContent = porcentaje + '%';
    document.getElementById('perfilProgreso').textContent = porcentaje + '%';

    let nivel = '⚡ Novato';
    if (porcentaje >= 80) nivel = '🌟 Experto';
    else if (porcentaje >= 60) nivel = '🚀 Intermedio';
    else if (porcentaje >= 40) nivel = '📚 Aprendiz';
    else if (respondidas > 0) nivel = '💪 En camino';
    document.getElementById('perfilEstado').textContent = nivel;
}

// ============================================================
//  R E I N I C I A R
// ============================================================
function reiniciarTodo() {
    if (!confirm('¿Seguro que quieres reiniciar todo tu progreso?')) return;
    for (let i = 0; i < estadoPreguntas.length; i++) {
        estadoPreguntas[i].respondida = false;
        estadoPreguntas[i].acertada = false;
        estadoPreguntas[i].seleccion = null;
    }
    guardarProgreso();
    aciertos = 0;
    fallos = 0;
    carpetaActual = null;
    preguntaActual = null;
    mostrarVista('carpetas');
    actualizarContadores();
}

// ============================================================
//  E V E N T O S   Y   I N I C I O
// ============================================================

// Eventos de Login/Registro
document.getElementById('btnLogin').addEventListener('click', iniciarSesion);
document.getElementById('btnRegistro').addEventListener('click', registrarUsuario);
document.getElementById('btnMostrarRegistro').addEventListener('click', mostrarRegistro);
document.getElementById('btnMostrarLogin').addEventListener('click', mostrarLogin);

// Eventos de la App
document.getElementById('btnCerrarSesion').addEventListener('click', cerrarSesion);
document.getElementById('breadInicio').addEventListener('click', () => {
    carpetaActual = null;
    preguntaActual = null;
    mostrarVista('carpetas');
});

document.getElementById('btnIrPerfil').addEventListener('click', () => mostrarVista('perfil'));
document.getElementById('btnVolverPerfil').addEventListener('click', () => mostrarVista('carpetas'));
document.getElementById('btnVolverPreguntas').addEventListener('click', () => mostrarVista('preguntas'));
document.getElementById('reiniciarDesdePerfil').addEventListener('click', reiniciarTodo);

document.getElementById('btnSiguientePregunta').addEventListener('click', () => {
    if (preguntaActual === null) return;
    const siguiente = preguntaActual + 1;
    if (siguiente < total) {
        preguntaActual = siguiente;
        renderizarPreguntaRespuesta();
        actualizarContadores();
    } else {
        alert('🎉 ¡Felicidades! Has completado todas las preguntas.');
    }
});

// Enter para login
document.getElementById('loginPassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') iniciarSesion();
});
document.getElementById('loginUsuario').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') iniciarSesion();
});

// Enter para registro
document.getElementById('regPassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') registrarUsuario();
});

// ============================================================
//  I N I C I O   -   Verificar sesión
// ============================================================
if (DB.haySesion()) {
    usuarioActual = DB.getSesion();
    cargarApp();
} else {
    mostrarLogin();
}

console.log('✅ DevQuest con Login y BD cargado correctamente');
console.log(`📚 Total de preguntas: ${total}`);
console.log('👤 Sistema de autenticación activo');