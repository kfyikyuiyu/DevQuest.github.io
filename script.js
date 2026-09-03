// ============================================================
//  B A S E   D E   D A T O S   (localStorage)
// ============================================================
const DB = {
    getUsuarios() {
        const data = localStorage.getItem('devquest_usuarios');
        return data ? JSON.parse(data) : {};
    },
    guardarUsuarios(usuarios) {
        localStorage.setItem('devquest_usuarios', JSON.stringify(usuarios));
    },
    getUsuario(nombre) {
        const usuarios = this.getUsuarios();
        return usuarios[nombre] || null;
    },
    setUsuario(nombre, data) {
        const usuarios = this.getUsuarios();
        usuarios[nombre] = { ...usuarios[nombre], ...data };
        this.guardarUsuarios(usuarios);
    },
    existeUsuario(nombre) {
        const usuarios = this.getUsuarios();
        return !!usuarios[nombre];
    },
    getProgreso(nombre) {
        const usuario = this.getUsuario(nombre);
        return usuario ? usuario.progreso || {} : {};
    },
    setProgreso(nombre, progreso) {
        const usuario = this.getUsuario(nombre);
        if (usuario) {
            usuario.progreso = progreso;
            this.setUsuario(nombre, usuario);
        }
    },
    getRacha(nombre) {
        const usuario = this.getUsuario(nombre);
        return usuario ? usuario.racha || 0 : 0;
    },
    setRacha(nombre, racha) {
        const usuario = this.getUsuario(nombre);
        if (usuario) {
            usuario.racha = racha;
            this.setUsuario(nombre, usuario);
        }
    },
    getSesion() {
        return localStorage.getItem('devquest_sesion') || null;
    },
    iniciarSesion(nombre) {
        localStorage.setItem('devquest_sesion', nombre);
    },
    cerrarSesion() {
        localStorage.removeItem('devquest_sesion');
    },
    haySesion() {
        return !!this.getSesion();
    },
    esPrimeraVez(nombre) {
        const usuario = this.getUsuario(nombre);
        return usuario ? !usuario.bienvenidoVisto : true;
    },
    marcarBienvenido(nombre) {
        const usuario = this.getUsuario(nombre);
        if (usuario) {
            usuario.bienvenidoVisto = true;
            this.setUsuario(nombre, usuario);
        }
    },
    // FUNCIÓN PARA BORRAR TODAS LAS CUENTAS
    borrarTodasLasCuentas() {
        localStorage.removeItem('devquest_usuarios');
        localStorage.removeItem('devquest_sesion');
        console.log('🗑️ Todas las cuentas han sido eliminadas');
    }
};

// ============================================================
//  P R E G U N T A S   A D S   (50 preguntas en español)
// ============================================================
const PREGUNTAS_ADS = [
    { pregunta: '¿Qué es un sistema informático?', opciones: ['Conjunto de hardware, software y usuarios', 'Solo hardware', 'Solo software', 'Solo usuarios'], correcta: 0 },
    { pregunta: '¿Qué es el análisis de sistemas?', opciones: ['Estudiar un sistema para entenderlo y mejorarlo', 'Crear un sistema desde cero', 'Eliminar un sistema', 'Comprar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es el diseño de sistemas?', opciones: ['Planificar la arquitectura y componentes de un sistema', 'Analizar un sistema', 'Usar un sistema', 'Eliminar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es un requerimiento funcional?', opciones: ['Describe lo que el sistema debe hacer', 'Describe cómo se ve el sistema', 'Describe el hardware', 'Describe los costos'], correcta: 0 },
    { pregunta: '¿Qué es un requerimiento no funcional?', opciones: ['Describe atributos de calidad como rendimiento y seguridad', 'Describe funciones del sistema', 'Describe la interfaz', 'Describe los datos'], correcta: 0 },
    { pregunta: '¿Qué es un diagrama de flujo de datos?', opciones: ['Representa el flujo de información en un sistema', 'Representa el hardware', 'Representa el código', 'Representa la interfaz'], correcta: 0 },
    { pregunta: '¿Qué es un caso de uso?', opciones: ['Describe una interacción entre usuario y sistema', 'Describe el hardware', 'Describe el código', 'Describe la base de datos'], correcta: 0 },
    { pregunta: '¿Qué es un actor en un diagrama de casos de uso?', opciones: ['Un usuario o entidad que interactúa con el sistema', 'Un objeto', 'Una función', 'Una variable'], correcta: 0 },
    { pregunta: '¿Qué es un diagrama de clases?', opciones: ['Representa la estructura estática de un sistema', 'Representa el flujo de datos', 'Representa la interfaz', 'Representa el hardware'], correcta: 0 },
    { pregunta: '¿Qué es un diagrama de secuencia?', opciones: ['Representa la interacción entre objetos en el tiempo', 'Representa la estructura', 'Representa el flujo de datos', 'Representa el hardware'], correcta: 0 },
    { pregunta: '¿Qué es el ciclo de vida de un sistema?', opciones: ['Etapas por las que pasa un sistema desde su concepción hasta su retiro', 'El tiempo de ejecución', 'La vida útil del hardware', 'El tiempo de desarrollo'], correcta: 0 },
    { pregunta: '¿Qué es la metodología en cascada?', opciones: ['Modelo de desarrollo secuencial por fases', 'Desarrollo ágil', 'Desarrollo iterativo', 'Sin metodología'], correcta: 0 },
    { pregunta: '¿Qué es el desarrollo ágil?', opciones: ['Metodología iterativa con entregas frecuentes', 'Desarrollo secuencial', 'Sin metodología', 'Modelo en cascada'], correcta: 0 },
    { pregunta: '¿Qué es Scrum?', opciones: ['Framework ágil para gestión de proyectos', 'Un lenguaje de programación', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es un sprint en Scrum?', opciones: ['Período de tiempo para completar un conjunto de tareas', 'Un error', 'Una reunión', 'Una documentación'], correcta: 0 },
    { pregunta: '¿Qué es un product backlog?', opciones: ['Lista de requerimientos del producto', 'Lista de errores', 'Lista de tareas técnicas', 'Lista de personas'], correcta: 0 },
    { pregunta: '¿Qué es el diseño de interfaz de usuario?', opciones: ['Diseñar la interacción entre el usuario y el sistema', 'Diseñar la base de datos', 'Diseñar el hardware', 'Diseñar la red'], correcta: 0 },
    { pregunta: '¿Qué es la usabilidad en sistemas?', opciones: ['Facilidad de uso del sistema por parte de los usuarios', 'Velocidad del sistema', 'Seguridad del sistema', 'Costo del sistema'], correcta: 0 },
    { pregunta: '¿Qué es la arquitectura de software?', opciones: ['Estructura general y organización de un sistema', 'El hardware', 'La red', 'La base de datos'], correcta: 0 },
    { pregunta: '¿Qué es un patrón de diseño?', opciones: ['Solución reutilizable para problemas comunes en diseño de software', 'Un error', 'Un lenguaje', 'Una función'], correcta: 0 },
    { pregunta: '¿Qué es un modelo de datos?', opciones: ['Representación de la estructura de los datos en un sistema', 'El hardware', 'La interfaz', 'El código'], correcta: 0 },
    { pregunta: '¿Qué es un diagrama entidad-relación?', opciones: ['Representa las entidades y relaciones en una base de datos', 'Representa el flujo de datos', 'Representa la interfaz', 'Representa el hardware'], correcta: 0 },
    { pregunta: '¿Qué es la abstracción en diseño de sistemas?', opciones: ['Simplificar un sistema enfocándose en lo esencial', 'Complicar un sistema', 'Eliminar un sistema', 'Comprar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es la modularidad en sistemas?', opciones: ['Dividir un sistema en partes independientes', 'Unir todo en un solo bloque', 'Eliminar partes', 'Comprar partes'], correcta: 0 },
    { pregunta: '¿Qué es el acoplamiento en diseño de software?', opciones: ['Grado de dependencia entre módulos', 'Grado de independencia', 'La velocidad', 'El costo'], correcta: 0 },
    { pregunta: '¿Qué es la cohesión en diseño de software?', opciones: ['Grado de relación entre elementos de un mismo módulo', 'Grado de dependencia', 'La velocidad', 'El costo'], correcta: 0 },
    { pregunta: '¿Qué es un prototipo en diseño de sistemas?', opciones: ['Versión inicial del sistema para probar conceptos', 'El sistema final', 'El hardware', 'La documentación'], correcta: 0 },
    { pregunta: '¿Qué es el análisis de viabilidad?', opciones: ['Evaluación si un sistema es posible y rentable', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es un estudio de factibilidad?', opciones: ['Análisis para determinar si un proyecto es viable', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es la documentación en sistemas?', opciones: ['Registro escrito de la información del sistema', 'El código', 'El hardware', 'La red'], correcta: 0 },
    { pregunta: '¿Qué es un diagrama de Gantt?', opciones: ['Gráfico para planificar y programar tareas', 'Diagrama de flujo', 'Diagrama de clases', 'Diagrama de secuencia'], correcta: 0 },
    { pregunta: '¿Qué es un diagrama PERT?', opciones: ['Técnica para planificar y controlar proyectos', 'Diagrama de flujo', 'Diagrama de clases', 'Diagrama de secuencia'], correcta: 0 },
    { pregunta: '¿Qué es el alcance de un proyecto?', opciones: ['Define los límites y objetivos del proyecto', 'El costo', 'El tiempo', 'El equipo'], correcta: 0 },
    { pregunta: '¿Qué es un stakeholder?', opciones: ['Persona o grupo con interés en el proyecto', 'El programador', 'El usuario', 'El gerente'], correcta: 0 },
    { pregunta: '¿Qué es un entregable en proyectos?', opciones: ['Producto o resultado que se entrega al cliente', 'Un error', 'Un documento', 'Una reunión'], correcta: 0 },
    { pregunta: '¿Qué es la gestión de riesgos?', opciones: ['Identificar y mitigar posibles problemas en un proyecto', 'Eliminar todos los riesgos', 'Ignorar los riesgos', 'Aceptar todos los riesgos'], correcta: 0 },
    { pregunta: '¿Qué es el control de calidad en sistemas?', opciones: ['Asegurar que el sistema cumpla con los estándares', 'Aumentar el costo', 'Reducir el tiempo', 'Eliminar pruebas'], correcta: 0 },
    { pregunta: '¿Qué es la migración de sistemas?', opciones: ['Proceso de trasladar un sistema a otro entorno', 'Eliminar un sistema', 'Comprar un sistema', 'Diseñar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es la interoperabilidad?', opciones: ['Capacidad de un sistema para interactuar con otros', 'Capacidad de un sistema para ser rápido', 'Capacidad de un sistema para ser seguro', 'Capacidad de un sistema para ser barato'], correcta: 0 },
    { pregunta: '¿Qué es la escalabilidad?', opciones: ['Capacidad de un sistema para crecer según la demanda', 'Capacidad de un sistema para ser rápido', 'Capacidad de un sistema para ser seguro', 'Capacidad de un sistema para ser barato'], correcta: 0 },
    { pregunta: '¿Qué es el análisis de requisitos?', opciones: ['Proceso de recopilar y entender las necesidades del usuario', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es una entrevista en análisis de sistemas?', opciones: ['Técnica para recopilar información de los usuarios', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es una encuesta en análisis de sistemas?', opciones: ['Técnica para recopilar información de un grupo grande', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es la observación en análisis de sistemas?', opciones: ['Técnica para ver cómo trabajan los usuarios actualmente', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es un análisis de brecha?', opciones: ['Comparación entre el estado actual y el deseado', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es un análisis de impacto?', opciones: ['Evaluación de los efectos de un cambio en el sistema', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es un análisis de costo-beneficio?', opciones: ['Evaluación de costos vs beneficios de un proyecto', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es un análisis FODA en sistemas?', opciones: ['Análisis de Fortalezas, Oportunidades, Debilidades y Amenazas', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es una matriz de trazabilidad?', opciones: ['Documento que relaciona requisitos con su implementación', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 },
    { pregunta: '¿Qué es un modelo de proceso?', opciones: ['Representación de las actividades y flujo de trabajo', 'Diseñar un sistema', 'Implementar un sistema', 'Probar un sistema'], correcta: 0 }
];

// ============================================================
//  P R E G U N T A S   P O R T A L E S   W E B   (50 preguntas en español)
// ============================================================
const PREGUNTAS_WEB = [
    { pregunta: '¿Qué significa HTML?', opciones: ['Lenguaje de marcado de hipertexto', 'Lenguaje de máquina de alta tecnología', 'Lenguaje de texto de alto nivel', 'Lenguaje moderno de hipertexto'], correcta: 0 },
    { pregunta: '¿Qué etiqueta HTML se usa para el título de una página?', opciones: ['<title>', '<head>', '<header>', '<h1>'], correcta: 0 },
    { pregunta: '¿Qué etiqueta HTML se usa para enlaces?', opciones: ['<a>', '<link>', '<href>', '<url>'], correcta: 0 },
    { pregunta: '¿Qué etiqueta HTML se usa para imágenes?', opciones: ['<img>', '<image>', '<src>', '<picture>'], correcta: 0 },
    { pregunta: '¿Qué etiqueta HTML se usa para listas ordenadas?', opciones: ['<ol>', '<ul>', '<li>', '<list>'], correcta: 0 },
    { pregunta: '¿Qué etiqueta HTML se usa para listas desordenadas?', opciones: ['<ul>', '<ol>', '<li>', '<list>'], correcta: 0 },
    { pregunta: '¿Qué etiqueta HTML se usa para tablas?', opciones: ['<table>', '<tab>', '<grid>', '<list>'], correcta: 0 },
    { pregunta: '¿Qué es un formulario en HTML?', opciones: ['Permite recopilar datos del usuario', 'Muestra imágenes', 'Crea enlaces', 'Define estilos'], correcta: 0 },
    { pregunta: '¿Qué atributo se usa en <a> para abrir en nueva pestaña?', opciones: ['target="_blank"', 'target="_new"', 'open="new"', 'new="true"'], correcta: 0 },
    { pregunta: '¿Qué es un div en HTML?', opciones: ['Contenedor genérico para agrupar elementos', 'Un enlace', 'Una imagen', 'Un título'], correcta: 0 },
    { pregunta: '¿Qué significa CSS?', opciones: ['Hojas de estilo en cascada', 'Hojas de estilo creativas', 'Sistema de estilo por computadora', 'Hojas de estilo con colores'], correcta: 0 },
    { pregunta: '¿Qué propiedad de CSS se usa para cambiar el color de fondo?', opciones: ['background-color', 'color', 'font-color', 'bgcolor'], correcta: 0 },
    { pregunta: '¿Qué propiedad de CSS se usa para cambiar el tamaño de fuente?', opciones: ['font-size', 'size', 'text-size', 'font'], correcta: 0 },
    { pregunta: '¿Qué es flexbox en CSS?', opciones: ['Modelo de diseño para alinear elementos', 'Un tipo de fuente', 'Un color', 'Un selector'], correcta: 0 },
    { pregunta: '¿Qué es grid en CSS?', opciones: ['Sistema de diseño en cuadrícula', 'Un tipo de fuente', 'Un color', 'Un selector'], correcta: 0 },
    { pregunta: '¿Qué es un selector en CSS?', opciones: ['Permite seleccionar elementos HTML para aplicar estilos', 'Un color', 'Una fuente', 'Un borde'], correcta: 0 },
    { pregunta: '¿Qué es una clase en CSS?', opciones: ['Selector que se aplica a múltiples elementos', 'Un identificador único', 'Un color', 'Una fuente'], correcta: 0 },
    { pregunta: '¿Qué es un id en CSS?', opciones: ['Selector único para un elemento', 'Una clase', 'Un color', 'Una fuente'], correcta: 0 },
    { pregunta: '¿Qué hace la propiedad display: flex?', opciones: ['Activa el modelo de diseño flexbox', 'Oculta el elemento', 'Muestra el elemento', 'Centra el texto'], correcta: 0 },
    { pregunta: '¿Qué hace la propiedad position: absolute?', opciones: ['Posiciona el elemento de forma absoluta', 'Lo centra', 'Lo oculta', 'Lo muestra'], correcta: 0 },
    { pregunta: '¿Qué es JavaScript?', opciones: ['Lenguaje de programación para la web', 'Un framework de CSS', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Cómo se escribe un comentario en JavaScript?', opciones: ['// o /* */', '<!-- -->', '**', '#'], correcta: 0 },
    { pregunta: '¿Qué hace console.log()?', opciones: ['Muestra un mensaje en la consola del navegador', 'Guarda datos en el servidor', 'Crea una variable', 'Detiene la ejecución'], correcta: 0 },
    { pregunta: '¿Qué tipo de dato es "true" en JavaScript?', opciones: ['Booleano', 'Cadena de texto', 'Número', 'Arreglo'], correcta: 0 },
    { pregunta: '¿Qué hace el operador "==="?', opciones: ['Compara valor y tipo', 'Compara solo el valor', 'Asigna un valor', 'Concatena cadenas'], correcta: 0 },
    { pregunta: '¿Qué es una variable en JavaScript?', opciones: ['Espacio para guardar datos', 'Un bucle', 'Una función', 'Un objeto'], correcta: 0 },
    { pregunta: '¿Qué es un arreglo en JavaScript?', opciones: ['Una lista de elementos', 'Un tipo de bucle', 'Una función', 'Un estilo de CSS'], correcta: 0 },
    { pregunta: '¿Qué es una función en JavaScript?', opciones: ['Bloque de código reutilizable', 'Una variable', 'Un bucle', 'Un objeto'], correcta: 0 },
    { pregunta: '¿Qué hace addEventListener?', opciones: ['Escucha eventos del usuario', 'Agrega un elemento HTML', 'Elimina un evento', 'Crea una variable'], correcta: 0 },
    { pregunta: '¿Qué es el DOM en JavaScript?', opciones: ['Modelo de objetos del documento', 'Modelo de datos', 'Dominio de objetos', 'Documento de memoria'], correcta: 0 },
    { pregunta: '¿Qué es un recurso multimedia?', opciones: ['Contenido como imágenes, audio y video', 'Solo texto', 'Solo código', 'Solo datos'], correcta: 0 },
    { pregunta: '¿Qué formato de imagen es mejor para la web?', opciones: ['WebP, JPEG y PNG', 'BMP y TIFF', 'PSD y AI', 'RAW y CR2'], correcta: 0 },
    { pregunta: '¿Qué formato de video se usa comúnmente en la web?', opciones: ['MP4 y WebM', 'AVI y MOV', 'MKV y FLV', 'WMV y MPEG'], correcta: 0 },
    { pregunta: '¿Qué formato de audio se usa en la web?', opciones: ['MP3, AAC y OGG', 'WAV y AIFF', 'FLAC y ALAC', 'MIDI y REX'], correcta: 0 },
    { pregunta: '¿Qué es el diseño responsivo?', opciones: ['Adapta la página a diferentes dispositivos', 'Diseño fijo', 'Diseño solo para escritorio', 'Diseño solo para móvil'], correcta: 0 },
    { pregunta: '¿Qué es la optimización de imágenes?', opciones: ['Reducir tamaño sin perder calidad', 'Aumentar tamaño', 'Cambiar formato', 'Eliminar imágenes'], correcta: 0 },
    { pregunta: '¿Qué es una CDN?', opciones: ['Red de distribución de contenido', 'Centro de datos', 'Control de dominio', 'Código de navegación'], correcta: 0 },
    { pregunta: '¿Qué es un sprite en desarrollo web?', opciones: ['Imagen que contiene múltiples iconos', 'Un video', 'Un audio', 'Un texto'], correcta: 0 },
    { pregunta: '¿Qué es un favicon?', opciones: ['Icono de la página en la pestaña del navegador', 'Un video', 'Un audio', 'Un texto'], correcta: 0 },
    { pregunta: '¿Qué es la accesibilidad web?', opciones: ['Hacer sitios usables para todas las personas', 'Hacer sitios rápidos', 'Hacer sitios bonitos', 'Hacer sitios baratos'], correcta: 0 },
    { pregunta: '¿Qué es React?', opciones: ['Biblioteca de JavaScript para interfaces de usuario', 'Un lenguaje', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es Angular?', opciones: ['Framework de desarrollo web de Google', 'Un lenguaje', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es Vue.js?', opciones: ['Framework progresivo de JavaScript', 'Un lenguaje', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es Bootstrap?', opciones: ['Framework de CSS para diseño responsivo', 'Un lenguaje', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es Node.js?', opciones: ['Entorno para ejecutar JavaScript en el servidor', 'Un framework de CSS', 'Un navegador', 'Una base de datos'], correcta: 0 },
    { pregunta: '¿Qué es npm?', opciones: ['Gestor de paquetes de Node.js', 'Un lenguaje', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es Git?', opciones: ['Sistema de control de versiones', 'Un lenguaje', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es Webpack?', opciones: ['Empaquetador de módulos de JavaScript', 'Un lenguaje', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es TypeScript?', opciones: ['Superset de JavaScript con tipos', 'Un lenguaje', 'Una base de datos', 'Un sistema operativo'], correcta: 0 },
    { pregunta: '¿Qué es un CMS?', opciones: ['Sistema de gestión de contenido', 'Un lenguaje', 'Una base de datos', 'Un sistema operativo'], correcta: 0 }
];

// ============================================================
//  P R E G U N T A S   B A S E   D E   D A T O S   (50 preguntas en español)
// ============================================================
const PREGUNTAS_BD = [
    { pregunta: '¿Qué significa SQL?', opciones: ['Lenguaje de consulta estructurada', 'Lenguaje de preguntas simple', 'Lógica de consulta de sistemas', 'Lenguaje de calidad estándar'], correcta: 0 },
    { pregunta: '¿Qué es una base de datos relacional?', opciones: ['Datos organizados en tablas con relaciones', 'Datos en un solo archivo', 'Datos sin estructura', 'Datos solo en memoria'], correcta: 0 },
    { pregunta: '¿Qué es una clave primaria?', opciones: ['Un campo que identifica de forma única cada registro', 'Un campo que puede estar vacío', 'Un campo que se repite', 'Un campo sin importancia'], correcta: 0 },
    { pregunta: '¿Qué es una clave foránea?', opciones: ['Un campo que referencia otra tabla', 'Un campo que es clave primaria', 'Un campo con valores nulos', 'Un campo sin relación'], correcta: 0 },
    { pregunta: '¿Qué comando SQL se usa para consultar datos?', opciones: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'], correcta: 0 },
    { pregunta: '¿Qué comando SQL se usa para insertar datos?', opciones: ['INSERT INTO', 'SELECT', 'UPDATE', 'DELETE'], correcta: 0 },
    { pregunta: '¿Qué comando SQL se usa para actualizar datos?', opciones: ['UPDATE', 'SELECT', 'INSERT', 'DELETE'], correcta: 0 },
    { pregunta: '¿Qué comando SQL se usa para eliminar datos?', opciones: ['DELETE FROM', 'SELECT', 'INSERT', 'UPDATE'], correcta: 0 },
    { pregunta: '¿Qué hace la cláusula WHERE en SQL?', opciones: ['Filtra los resultados', 'Ordena los resultados', 'Agrupa los resultados', 'Une tablas'], correcta: 0 },
    { pregunta: '¿Qué hace la cláusula ORDER BY en SQL?', opciones: ['Ordena los resultados', 'Filtra los resultados', 'Agrupa los resultados', 'Elimina datos'], correcta: 0 },
    { pregunta: '¿Qué hace INNER JOIN en SQL?', opciones: ['Une dos tablas con coincidencias', 'Une todas las filas de una tabla', 'Une tablas sin coincidencias', 'Elimina datos'], correcta: 0 },
    { pregunta: '¿Qué hace LEFT JOIN en SQL?', opciones: ['Muestra todos los registros de la tabla izquierda', 'Muestra solo coincidencias', 'Muestra todos los registros de la tabla derecha', 'No une tablas'], correcta: 0 },
    { pregunta: '¿Qué hace RIGHT JOIN en SQL?', opciones: ['Muestra todos los registros de la tabla derecha', 'Muestra solo coincidencias', 'Muestra todos los registros de la tabla izquierda', 'No une tablas'], correcta: 0 },
    { pregunta: '¿Qué hace FULL OUTER JOIN en SQL?', opciones: ['Muestra todos los registros de ambas tablas', 'Muestra solo coincidencias', 'Muestra solo registros únicos', 'No une tablas'], correcta: 0 },
    { pregunta: '¿Qué es una relación uno a muchos en bases de datos?', opciones: ['Un registro en una tabla se relaciona con muchos en otra', 'Un registro se relaciona con uno solo', 'Muchos se relacionan con muchos', 'No hay relación'], correcta: 0 },
    { pregunta: '¿Qué es una relación muchos a muchos en bases de datos?', opciones: ['Varios registros se relacionan con varios en otra tabla', 'Uno a uno', 'Uno a muchos', 'No hay relación'], correcta: 0 },
    { pregunta: '¿Qué es una tabla intermedia o de unión?', opciones: ['Tabla que conecta dos tablas en relación muchos a muchos', 'Tabla principal', 'Tabla sin datos', 'Tabla de respaldo'], correcta: 0 },
    { pregunta: '¿Qué es la integridad referencial?', opciones: ['Garantiza que las relaciones entre tablas sean válidas', 'Garantiza datos únicos', 'Garantiza datos nulos', 'Garantiza datos duplicados'], correcta: 0 },
    { pregunta: '¿Qué es una vista en SQL?', opciones: ['Una tabla virtual basada en una consulta', 'Una tabla física', 'Un índice', 'Un procedimiento'], correcta: 0 },
    { pregunta: '¿Qué es un índice en SQL?', opciones: ['Estructura que acelera las búsquedas', 'Una tabla', 'Una vista', 'Un procedimiento'], correcta: 0 },
    { pregunta: '¿Qué es la normalización en bases de datos?', opciones: ['Organizar datos para reducir redundancia', 'Eliminar todos los datos', 'Duplicar datos', 'Desordenar datos'], correcta: 0 },
    { pregunta: '¿Qué es la primera forma normal (1NF)?', opciones: ['Cada columna tiene valores atómicos', 'Tabla sin llave primaria', 'Datos duplicados', 'Sin estructura'], correcta: 0 },
    { pregunta: '¿Qué es la segunda forma normal (2NF)?', opciones: ['Cumple 1NF y todos los atributos dependen de la llave completa', 'Cumple 1NF', 'Sin dependencias', 'Datos duplicados'], correcta: 0 },
    { pregunta: '¿Qué es la tercera forma normal (3NF)?', opciones: ['Cumple 2NF y no hay dependencias transitivas', 'Cumple 1NF', 'Cumple 2NF', 'Sin estructura'], correcta: 0 },
    { pregunta: '¿Qué es la forma normal de Boyce-Codd (BCNF)?', opciones: ['Versión más estricta de 3NF', 'Igual que 1NF', 'Igual que 2NF', 'Sin normalización'], correcta: 0 },
    { pregunta: '¿Por qué es importante normalizar una base de datos?', opciones: ['Evita redundancia y anomalías', 'Hace los datos más grandes', 'Complica las consultas', 'No es importante'], correcta: 0 },
    { pregunta: '¿Qué hace GROUP BY en SQL?', opciones: ['Agrupa resultados según una columna', 'Ordena resultados', 'Filtra resultados', 'Elimina resultados'], correcta: 0 },
    { pregunta: '¿Qué hace HAVING en SQL?', opciones: ['Filtra grupos después de GROUP BY', 'Filtra antes de GROUP BY', 'Ordena grupos', 'Elimina grupos'], correcta: 0 },
    { pregunta: '¿Qué es una subconsulta en SQL?', opciones: ['Una consulta dentro de otra consulta', 'Una consulta simple', 'Una consulta sin resultado', 'Una consulta vacía'], correcta: 0 },
    { pregunta: '¿Qué es un procedimiento almacenado?', opciones: ['Bloque de código SQL almacenado en el servidor', 'Una consulta simple', 'Una vista', 'Un índice'], correcta: 0 },
    { pregunta: '¿Qué es un disparador (trigger) en SQL?', opciones: ['Código que se ejecuta automáticamente ante un evento', 'Una consulta', 'Una tabla', 'Un índice'], correcta: 0 },
    { pregunta: '¿Qué significa ACID en bases de datos?', opciones: ['Atomicidad, Consistencia, Aislamiento, Durabilidad', 'Acceso, Control, Integridad, Datos', 'Almacenamiento, Consulta, Índice, Datos', 'Aplicación, Conexión, Interfaz, Datos'], correcta: 0 },
    { pregunta: '¿Qué es una transacción en SQL?', opciones: ['Conjunto de operaciones que se ejecutan como una unidad', 'Una consulta simple', 'Un procedimiento', 'Una vista'], correcta: 0 },
    { pregunta: '¿Qué comandos controlan transacciones en SQL?', opciones: ['COMMIT, ROLLBACK, SAVEPOINT', 'SELECT, INSERT, UPDATE', 'CREATE, DROP, ALTER', 'GRANT, REVOKE'], correcta: 0 },
    { pregunta: '¿Qué es una base de datos NoSQL?', opciones: ['Base de datos no relacional', 'Base de datos relacional', 'Base de datos SQL', 'Base de datos tradicional'], correcta: 0 },
    { pregunta: '¿Qué tipo de base de datos NoSQL usa documentos JSON?', opciones: ['Documental (MongoDB)', 'Clave-Valor', 'Columnas', 'Grafos'], correcta: 0 },
    { pregunta: '¿Qué tipo de base de datos NoSQL usa clave-valor?', opciones: ['Redis y DynamoDB', 'MongoDB', 'Cassandra', 'Neo4j'], correcta: 0 },
    { pregunta: '¿Qué tipo de base de datos NoSQL usa columnas?', opciones: ['Cassandra y HBase', 'MongoDB', 'Redis', 'Neo4j'], correcta: 0 },
    { pregunta: '¿Qué tipo de base de datos NoSQL usa grafos?', opciones: ['Neo4j', 'MongoDB', 'Redis', 'Cassandra'], correcta: 0 },
    { pregunta: '¿Qué es MongoDB?', opciones: ['Base de datos NoSQL documental', 'Base de datos SQL', 'Base de datos relacional', 'Base de datos de grafos'], correcta: 0 },
    { pregunta: '¿Qué es Redis?', opciones: ['Base de datos NoSQL clave-valor en memoria', 'Base de datos SQL', 'Base de datos relacional', 'Base de datos documental'], correcta: 0 },
    { pregunta: '¿Qué es Cassandra?', opciones: ['Base de datos NoSQL columnar', 'Base de datos SQL', 'Base de datos relacional', 'Base de datos documental'], correcta: 0 },
    { pregunta: '¿Qué hace COUNT() en SQL?', opciones: ['Cuenta el número de registros', 'Suma valores', 'Promedia valores', 'Busca valores'], correcta: 0 },
    { pregunta: '¿Qué hace SUM() en SQL?', opciones: ['Suma los valores de una columna', 'Cuenta registros', 'Promedia valores', 'Busca valores'], correcta: 0 },
    { pregunta: '¿Qué hace AVG() en SQL?', opciones: ['Calcula el promedio de valores', 'Suma valores', 'Cuenta registros', 'Busca valores'], correcta: 0 },
    { pregunta: '¿Qué hace MAX() en SQL?', opciones: ['Devuelve el valor máximo', 'Devuelve el valor mínimo', 'Cuenta registros', 'Suma valores'], correcta: 0 },
    { pregunta: '¿Qué hace MIN() en SQL?', opciones: ['Devuelve el valor mínimo', 'Devuelve el valor máximo', 'Cuenta registros', 'Suma valores'], correcta: 0 },
    { pregunta: '¿Qué hace DISTINCT en SQL?', opciones: ['Devuelve valores únicos', 'Devuelve valores duplicados', 'Ordena valores', 'Cuenta valores'], correcta: 0 },
    { pregunta: '¿Qué hace LIKE en SQL?', opciones: ['Busca patrones en texto', 'Busca valores exactos', 'Ordena resultados', 'Agrupa resultados'], correcta: 0 },
    { pregunta: '¿Qué hace IN en SQL?', opciones: ['Verifica si un valor está en una lista', 'Verifica si un valor es nulo', 'Ordena resultados', 'Agrupa resultados'], correcta: 0 }
];

// ============================================================
//  E S T R U C T U R A   D E   C A R P E T A S   (CURSOS)
// ============================================================
const CARPETAS = [
    {
        id: 'ads',
        nombre: 'Análisis y Diseño de Sistemas Informáticos (ADS)',
        icono: '📊',
        descripcion: 'Aprende a analizar y diseñar sistemas informáticos. Diseño de interfaces gráficas, bases de datos, aplicaciones web y más.',
        ano: 'AÑO ESCOLAR 2026-2027',
        preguntas: PREGUNTAS_ADS
    },
    {
        id: 'web',
        nombre: 'Diseño de Portales Web y Recursos Multimedia',
        icono: '🌐',
        descripcion: 'Diseño y desarrollo de portales web, recursos multimedia, HTML, CSS, JavaScript, frameworks y más.',
        ano: 'AÑO ESCOLAR 2026-2027',
        preguntas: PREGUNTAS_WEB
    },
    {
        id: 'bd',
        nombre: 'Diseño y Desarrollo de Base de Datos',
        icono: '🗄️',
        descripcion: 'SQL, bases de datos relacionales, NoSQL, MongoDB, Redis, Cassandra y administración de datos.',
        ano: 'AÑO ESCOLAR 2026-2027',
        preguntas: PREGUNTAS_BD
    }
];

// ============================================================
//  E S T A D O   G L O B A L
// ============================================================
let usuarioActual = null;
let estadoPreguntas = {};
let aciertos = 0;
let fallos = 0;
let carpetaActual = null;
let preguntaActualIndex = 0;
let rachaActual = 0;
let esPrimeraVez = false;

// ============================================================
//  FUNCIONES PARA MEZCLAR OPCIONES
// ============================================================
function mezclarOpciones(pregunta) {
    const opcionesConIndice = pregunta.opciones.map((texto, idx) => ({
        texto: texto,
        indiceOriginal: idx
    }));
    
    for (let i = opcionesConIndice.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opcionesConIndice[i], opcionesConIndice[j]] = [opcionesConIndice[j], opcionesConIndice[i]];
    }
    
    const opcionesMezcladas = opcionesConIndice.map(item => item.texto);
    const nuevoIndiceCorrecto = opcionesConIndice.findIndex(item => item.indiceOriginal === pregunta.correcta);
    
    return {
        opciones: opcionesMezcladas,
        correcta: nuevoIndiceCorrecto
    };
}

function generarPreguntasMezcladas(preguntasBase) {
    return preguntasBase.map(p => {
        const mezclado = mezclarOpciones(p);
        return {
            pregunta: p.pregunta,
            opciones: mezclado.opciones,
            correcta: mezclado.correcta
        };
    });
}

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

    DB.setUsuario(usuario, {
        password: password,
        nombre: nombre,
        progreso: {},
        fechaRegistro: new Date().toISOString(),
        bienvenidoVisto: false,
        racha: 0
    });

    errorEl.style.display = 'none';
    alert('✅ ¡Usuario registrado exitosamente!');
    
    // Limpiar campos
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
    esPrimeraVez = DB.esPrimeraVez(usuario);
    
    // Limpiar campos
    document.getElementById('loginUsuario').value = '';
    document.getElementById('loginPassword').value = '';
    
    cargarApp();
}

function cerrarSesion() {
    DB.cerrarSesion();
    usuarioActual = null;
    esPrimeraVez = false;
    rachaActual = 0;
    mostrarLogin();
}

function mostrarLogin() {
    document.getElementById('pantallaLogin').style.display = 'block';
    document.getElementById('pantallaApp').style.display = 'none';
    document.getElementById('formLogin').style.display = 'block';
    document.getElementById('formRegistro').style.display = 'none';
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('regError').style.display = 'none';
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
    
    rachaActual = DB.getRacha(usuarioActual) || 0;
    actualizarRachaUI();
    
    const bienvenida = document.getElementById('bienvenida');
    if (esPrimeraVez) {
        bienvenida.style.display = 'flex';
        bienvenida.classList.add('visible');
        DB.marcarBienvenido(usuarioActual);
        setTimeout(() => { cerrarBienvenida(); }, 8000);
    } else {
        bienvenida.style.display = 'none';
        bienvenida.classList.remove('visible');
    }
    
    estadoPreguntas = {};
    CARPETAS.forEach(carpeta => {
        estadoPreguntas[carpeta.id] = {
            preguntas: generarPreguntasMezcladas(carpeta.preguntas),
            respondidas: carpeta.preguntas.map(() => false),
            acertadas: carpeta.preguntas.map(() => false),
            selecciones: carpeta.preguntas.map(() => null)
        };
    });
    
    const progreso = DB.getProgreso(usuarioActual) || {};
    CARPETAS.forEach(carpeta => {
        const key = carpeta.id;
        if (progreso[key]) {
            const data = progreso[key];
            estadoPreguntas[key].respondidas = data.respondidas || estadoPreguntas[key].respondidas;
            estadoPreguntas[key].acertadas = data.acertadas || estadoPreguntas[key].acertadas;
            estadoPreguntas[key].selecciones = data.selecciones || estadoPreguntas[key].selecciones;
        }
    });

    carpetaActual = null;
    preguntaActualIndex = 0;
    mostrarVista('carpetas');
    actualizarContadores();
}

function cerrarBienvenida() {
    const bienvenida = document.getElementById('bienvenida');
    bienvenida.style.display = 'none';
    bienvenida.classList.remove('visible');
}

function actualizarRachaUI() {
    const rachaHeader = document.getElementById('rachaHeader');
    const rachaBadge = document.getElementById('rachaBadge');
    const perfilRacha = document.getElementById('perfilRacha');
    
    rachaHeader.textContent = rachaActual;
    perfilRacha.textContent = rachaActual;
    
    if (rachaActual >= 3) {
        rachaBadge.classList.add('racha-encendida');
        rachaBadge.classList.remove('racha-activa');
        void rachaBadge.offsetWidth;
        rachaBadge.classList.add('racha-activa');
    } else {
        rachaBadge.classList.remove('racha-encendida');
        rachaBadge.classList.remove('racha-activa');
    }
    
    if (usuarioActual) {
        DB.setRacha(usuarioActual, rachaActual);
    }
}

function procesarRespuesta(esCorrecta) {
    if (esCorrecta) {
        rachaActual++;
        if (rachaActual === 3) {
            mostrarNotificacion('🔥 ¡Racha de 3! ¡Sigue así!');
        } else if (rachaActual > 3 && rachaActual % 5 === 0) {
            mostrarNotificacion('🔥 ¡Racha de ' + rachaActual + '! ¡Eres una máquina!');
        }
    } else {
        if (rachaActual >= 3) {
            mostrarNotificacion('💔 ¡Racha de ' + rachaActual + ' perdida! Vuelve a intentarlo.');
        }
        rachaActual = 0;
    }
    actualizarRachaUI();
}

function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(18,18,30,0.95);
        border: 1px solid rgba(251,191,36,0.3);
        color: #fbbf24;
        padding: 14px 28px;
        border-radius: 14px;
        font-weight: 600;
        font-size: 1.05rem;
        z-index: 9999;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        animation: fadeInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        font-family: 'Inter', sans-serif;
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transform = 'translateX(-50%) translateY(-20px)';
        notif.style.transition = 'all 0.5s ease';
        setTimeout(() => notif.remove(), 500);
    }, 3000);
}

function guardarProgreso() {
    if (!usuarioActual) return;
    const progreso = {};
    CARPETAS.forEach(carpeta => {
        const key = carpeta.id;
        const estado = estadoPreguntas[key];
        progreso[key] = {
            respondidas: estado.respondidas,
            acertadas: estado.acertadas,
            selecciones: estado.selecciones
        };
    });
    DB.setProgreso(usuarioActual, progreso);
}

function mostrarVista(vista) {
    const vCarpetas = document.getElementById('vistaCarpetas');
    const vPreguntas = document.getElementById('vistaPreguntas');
    const vPerfil = document.getElementById('pantallaPerfil');

    vCarpetas.style.display = 'none';
    vPreguntas.style.display = 'none';
    vPerfil.style.display = 'none';

    if (vista === 'carpetas') {
        vCarpetas.style.display = 'block';
        document.getElementById('breadActual').textContent = 'Cursos';
        renderizarCarpetas();
    } else if (vista === 'preguntas') {
        vPreguntas.style.display = 'block';
        const carpeta = CARPETAS.find(c => c.id === carpetaActual);
        document.getElementById('breadActual').textContent = carpeta ? carpeta.nombre : 'Preguntas';
        mostrarPreguntaActual();
    } else if (vista === 'perfil') {
        vPerfil.style.display = 'block';
        document.getElementById('breadActual').textContent = 'Perfil';
        actualizarPerfil();
    }
    actualizarContadores();
}

function actualizarContadores() {
    let totalAcertadas = 0;
    CARPETAS.forEach(carpeta => {
        const estado = estadoPreguntas[carpeta.id];
        totalAcertadas += estado.acertadas.filter(a => a === true).length;
    });
    document.getElementById('aciertosHeader').textContent = totalAcertadas;
    const totalPreguntas = CARPETAS.reduce((sum, c) => sum + c.preguntas.length, 0);
    document.getElementById('totalHeader').textContent = totalPreguntas;
    document.getElementById('totalPreguntasCarpetas').textContent = totalPreguntas;
}

function renderizarCarpetas() {
    const grid = document.getElementById('carpetasGrid');
    grid.innerHTML = '';
    
    CARPETAS.forEach(carpeta => {
        const estado = estadoPreguntas[carpeta.id];
        const total = carpeta.preguntas.length;
        const respondidas = estado.respondidas.filter(r => r === true).length;
        const porcentaje = total > 0 ? Math.round((respondidas / total) * 100) : 0;

        const card = document.createElement('div');
        card.className = 'carpeta-card fade-in';
        card.style.animationDelay = (CARPETAS.indexOf(carpeta) * 0.1) + 's';
        card.innerHTML = `
            <div class="badge-cantidad">${total}</div>
            <span class="icon">${carpeta.icono}</span>
            <div class="nombre">${carpeta.nombre}</div>
            <div class="info">${carpeta.descripcion}</div>
            <div class="ano">📅 ${carpeta.ano}</div>
            <div class="meta-info">
                <span>📝 ${respondidas} respondidas</span>
                <span>⏳ ${total - respondidas} pendientes</span>
                <span>📊 ${porcentaje}%</span>
            </div>
            <div class="progreso">
                <div class="barra" style="width:${porcentaje}%;"></div>
            </div>
            <button class="btn btn-primary btn-iniciar" style="margin-top:14px; width:100%; padding:10px; border-radius:10px; font-size:0.9rem;">
                🚀 ¡Iniciar ahora!
            </button>
        `;
        
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-iniciar')) return;
            carpetaActual = carpeta.id;
            preguntaActualIndex = 0;
            mostrarVista('preguntas');
        });
        
        const btnIniciar = card.querySelector('.btn-iniciar');
        btnIniciar.addEventListener('click', function(e) {
            e.stopPropagation();
            carpetaActual = carpeta.id;
            preguntaActualIndex = 0;
            mostrarVista('preguntas');
        });
        
        grid.appendChild(card);
    });
}

function mostrarPreguntaActual() {
    const carpeta = CARPETAS.find(c => c.id === carpetaActual);
    if (!carpeta) return;
    
    const estado = estadoPreguntas[carpeta.id];
    const data = estado.preguntas[preguntaActualIndex];
    const respondida = estado.respondidas[preguntaActualIndex];
    const acertada = estado.acertadas[preguntaActualIndex];
    const seleccion = estado.selecciones[preguntaActualIndex];
    const total = carpeta.preguntas.length;
    
    document.getElementById('preguntaNumeroActual').textContent = preguntaActualIndex + 1;
    document.getElementById('preguntaTotalActual').textContent = total;
    
    const respondidasTotal = estado.respondidas.filter(r => r === true).length;
    const acertadasTotal = estado.acertadas.filter(a => a === true).length;
    document.getElementById('preguntasAcertadas').textContent = acertadasTotal;
    document.getElementById('preguntasRespondidas').textContent = respondidasTotal;
    
    const progreso = ((preguntaActualIndex + 1) / total) * 100;
    document.getElementById('barraProgreso').style.width = progreso + '%';
    
    document.getElementById('preguntaTexto').textContent = data.pregunta;
    
    const container = document.getElementById('opcionesContainer');
    container.innerHTML = '';
    document.getElementById('feedbackContainer').innerHTML = '';
    
    const letras = ['A', 'B', 'C', 'D'];
    data.opciones.forEach(function(opt, i) {
        const div = document.createElement('div');
        div.className = 'opt';
        if (respondida) {
            div.classList.add('disabled');
            if (i === data.correcta) div.classList.add('correct');
            if (i === seleccion && i !== data.correcta) div.classList.add('incorrect');
        }
        
        const letterSpan = document.createElement('span');
        letterSpan.className = 'letter';
        letterSpan.textContent = letras[i];
        
        const textSpan = document.createElement('span');
        textSpan.textContent = opt || ('Opción ' + letras[i]);
        textSpan.style.color = '#e2e8f0';
        textSpan.style.fontWeight = '500';
        
        div.appendChild(letterSpan);
        div.appendChild(textSpan);
        
        if (!respondida) {
            div.addEventListener('click', function() {
                const esCorrecta = (i === data.correcta);
                estado.respondidas[preguntaActualIndex] = true;
                estado.selecciones[preguntaActualIndex] = i;
                estado.acertadas[preguntaActualIndex] = esCorrecta;
                
                procesarRespuesta(esCorrecta);
                guardarProgreso();
                mostrarPreguntaActual();
                actualizarContadores();
            });
        }
        container.appendChild(div);
    });
    
    if (respondida) {
        const feedback = document.getElementById('feedbackContainer');
        const fb = document.createElement('div');
        fb.className = 'feedback-text ' + (acertada ? 'ok' : 'fail');
        const correctaTexto = data.opciones[data.correcta] || 'Opción correcta';
        fb.innerHTML = acertada ?
            '✅ ¡Correcto! Bien hecho. 🎉' :
            '❌ Ups, la correcta era: "<strong>' + correctaTexto + '</strong>". ¡Sigue intentando! 💪';
        feedback.appendChild(fb);
    }
    
    document.getElementById('btnAnteriorPregunta').disabled = (preguntaActualIndex === 0);
    document.getElementById('btnSiguientePregunta').disabled = (preguntaActualIndex === total - 1);
}

function reiniciarPreguntaActual() {
    const carpeta = CARPETAS.find(c => c.id === carpetaActual);
    if (!carpeta) return;
    
    const estado = estadoPreguntas[carpeta.id];
    if (!estado.respondidas[preguntaActualIndex]) {
        mostrarNotificacion('⚠️ Esta pregunta ya está sin responder');
        return;
    }
    
    const preguntaOriginal = carpeta.preguntas[preguntaActualIndex];
    const mezclado = mezclarOpciones(preguntaOriginal);
    
    estado.preguntas[preguntaActualIndex] = {
        pregunta: preguntaOriginal.pregunta,
        opciones: mezclado.opciones,
        correcta: mezclado.correcta
    };
    
    estado.respondidas[preguntaActualIndex] = false;
    estado.acertadas[preguntaActualIndex] = false;
    estado.selecciones[preguntaActualIndex] = null;
    
    guardarProgreso();
    mostrarPreguntaActual();
    actualizarContadores();
    
    mostrarNotificacion('🔄 Pregunta reiniciada con opciones en nuevo orden. ¡Inténtalo de nuevo!');
}

function actualizarPerfil() {
    let totalRespondidas = 0;
    let totalAcertadas = 0;
    CARPETAS.forEach(carpeta => {
        const estado = estadoPreguntas[carpeta.id];
        totalRespondidas += estado.respondidas.filter(r => r === true).length;
        totalAcertadas += estado.acertadas.filter(a => a === true).length;
    });
    const fallosTotal = totalRespondidas - totalAcertadas;

    document.getElementById('perfilAciertos').textContent = totalAcertadas;
    document.getElementById('perfilFallos').textContent = fallosTotal;

    let porcentaje = 0;
    if (totalRespondidas > 0) porcentaje = Math.round((totalAcertadas / totalRespondidas) * 100);
    document.getElementById('perfilPorcentaje').textContent = porcentaje + '%';
    document.getElementById('perfilProgreso').textContent = porcentaje + '%';

    let nivel = '⚡ Novato';
    if (porcentaje >= 80) nivel = '🌟 Experto';
    else if (porcentaje >= 60) nivel = '🚀 Intermedio';
    else if (porcentaje >= 40) nivel = '📚 Aprendiz';
    else if (totalRespondidas > 0) nivel = '💪 En camino';
    document.getElementById('perfilEstado').textContent = nivel;
}

function reiniciarTodoManual() {
    if (!confirm('¿Seguro que quieres reiniciar todo tu progreso?')) return;
    
    CARPETAS.forEach(carpeta => {
        const estado = estadoPreguntas[carpeta.id];
        estado.preguntas = generarPreguntasMezcladas(carpeta.preguntas);
        estado.respondidas = carpeta.preguntas.map(() => false);
        estado.acertadas = carpeta.preguntas.map(() => false);
        estado.selecciones = carpeta.preguntas.map(() => null);
    });
    
    rachaActual = 0;
    guardarProgreso();
    DB.setRacha(usuarioActual, 0);
    
    carpetaActual = null;
    preguntaActualIndex = 0;
    actualizarRachaUI();
    mostrarVista('carpetas');
    actualizarContadores();
    
    mostrarNotificacion('🔄 Todo el progreso ha sido reiniciado con nuevas opciones mezcladas');
}

// ============================================================
//  F U N C I Ó N   P A R A   B O R R A R   T O D A S   L A S   C U E N T A S
// ============================================================
function borrarTodasLasCuentas() {
    if (confirm('⚠️ ¿Seguro que quieres BORRAR TODAS las cuentas y todo el progreso? Esta acción NO se puede deshacer.')) {
        DB.borrarTodasLasCuentas();
        alert('🗑️ Todas las cuentas han sido eliminadas. Recarga la página para ver los cambios.');
        location.reload();
    }
}

// ============================================================
//  E V E N T O S
// ============================================================
document.getElementById('btnLogin').addEventListener('click', iniciarSesion);
document.getElementById('btnRegistro').addEventListener('click', registrarUsuario);
document.getElementById('btnMostrarRegistro').addEventListener('click', mostrarRegistro);
document.getElementById('btnMostrarLogin').addEventListener('click', mostrarLogin);

document.getElementById('btnCerrarSesion').addEventListener('click', cerrarSesion);
document.getElementById('cerrarBienvenida').addEventListener('click', cerrarBienvenida);
document.getElementById('btnReiniciarPregunta').addEventListener('click', reiniciarPreguntaActual);

document.getElementById('breadInicio').addEventListener('click', function() {
    carpetaActual = null;
    preguntaActualIndex = 0;
    mostrarVista('carpetas');
});

document.getElementById('btnIrPerfil').addEventListener('click', function() { mostrarVista('perfil'); });
document.getElementById('btnVolverPerfil').addEventListener('click', function() { mostrarVista('carpetas'); });
document.getElementById('btnVolverCarpetas').addEventListener('click', function() { mostrarVista('carpetas'); });
document.getElementById('reiniciarDesdePerfil').addEventListener('click', reiniciarTodoManual);

document.getElementById('btnAnteriorPregunta').addEventListener('click', function() {
    if (preguntaActualIndex > 0) {
        preguntaActualIndex--;
        mostrarPreguntaActual();
        actualizarContadores();
    }
});

document.getElementById('btnSiguientePregunta').addEventListener('click', function() {
    const carpeta = CARPETAS.find(c => c.id === carpetaActual);
    if (!carpeta) return;
    const total = carpeta.preguntas.length;
    if (preguntaActualIndex < total - 1) {
        preguntaActualIndex++;
        mostrarPreguntaActual();
        actualizarContadores();
    } else {
        alert('🎉 ¡Felicidades! Has completado todas las preguntas de esta materia.');
    }
});

// Enter para login
document.getElementById('loginPassword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') iniciarSesion();
});
document.getElementById('loginUsuario').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') iniciarSesion();
});
document.getElementById('regPassword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') registrarUsuario();
});

// ============================================================
//  C O N S O L A   P A R A   B O R R A R   C U E N T A S
// ============================================================
console.log('🔧 Para BORRAR TODAS LAS CUENTAS, escribe en la consola:');
console.log('   borrarTodasLasCuentas()');
console.log('');
console.log('📊 Para ver los usuarios registrados:');
console.log('   DB.getUsuarios()');

// ============================================================
//  I N I C I O
// ============================================================
if (DB.haySesion()) {
    usuarioActual = DB.getSesion();
    esPrimeraVez = DB.esPrimeraVez(usuarioActual);
    cargarApp();
} else {
    mostrarLogin();
}

console.log('✅ DevQuest - Login Persistente cargado correctamente');
var totalPreguntas = CARPETAS.reduce(function(sum, c) { return sum + c.preguntas.length; }, 0);
console.log('📚 Total de preguntas: ' + totalPreguntas);
console.log('👤 Las cuentas se guardan en localStorage');