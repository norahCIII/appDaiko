/*
    =========================================================================
    Software: form-emerge.js
    Description: Módulo para crear formularios emergentes con JavaScript
    Contact: http://www.wextensible.com
    Copyright (c) 2010, Andrés de la Paz

    Necesita el estilo de base.css, componente form-emerge (antes en form-emerge.css)

    La documentación de la clase la puede consultar en
    http://www.wextensible.com/como-se-hace/emergente-javascript/documentacion-clase.html
    Nota: esa documentación no recoge modificaciones posteriores. El código actualizado
    lo puede encontrar en una página del sitio que contenga formularios emergentes. Como
    está minificado, puede usar el botón CÓDIGO de la barra de botones de la página
    para ver el código fuente.

    Mayo 2020: Reemplazados DIV botones maximizar y cerrar por BUTTON. Reemplazamos INPUT aceptar, 
    cancelar y aplicar por BUTTON. Adaptamos parámetros de funciones

    Agosto 2015: Agregado nuevo argumento botonMaximizar. Si se pasa nulo o false se ignora. En
    otro caso se agrega un botón para maximizar-minimizar las dimensiones del emergente. 

    Julio 2015:
    1) En el método abrir() se pasan argumentos izquierda y arriba. Pasando ahora los valores
      "center" centrará el formulario horizontal y verticalmente en pantalla respectivamente.
    2) En el constructor al final se agrega el html generado a un elemento que se pasa en el
      argumento dondePonerForm. El uso de la concatenación con innerHTML puede dar problemas
      en ciertos casos. Ver comentarios en esa parte del código.
    3) He cambiado un new Array() por el literal []
    4) He agregado un cache de max a los bucles for

    Noviembre 2013:
    1) Agregamos argumento ajustarAncho al constructor, un booleano que
      ajustará el ancho del formulario al ancho de la ventana y así no agranda el
      body lo que resulta beneficioso especialmente en móviles.
    2) También se agrega una variable global del closure llamada bodyWidth que almacena el
      ancho del body en el método abrir() y cuando redimensionamos la ventana si ese ancho
      cambia cerrará todos los formularios abiertos, pues si no se hace la posición no se
      mantiene y el formulario se traslada de sitio.

    Octubre 2013: Eliminada definitivamente la función estiloNoCss(). Ahora uso
    vpForCss para gestionar si un elemento soporta "opacity" y "user-select".

    Septiembre 2013: Actualizado con Touch Events para móviles y otras mejoras en la
    barra de cabecera, botón cerrar y manejo de los métodos moverTodo() y moverMarco().

    Noviembre 2012: Se oculta este módulo en el espacio de nombres. Devolvemos el constructor
    que será llamado con Wextensible.FormEmerge(), ver el inicio de este módulo

    Septiembre 2010: Las propiedades "opacity" y "user-select" no son aún estándar
    en CSS 2.1. Cómo las tenía incluidas en form-emerge.css, ahora las quitamos para
    poder  validar el documento. Se aplican con el módulo general.js, función
    estiloNoCss(), incrustándose dinámicamente en los elementos "Pantalla",
    "Marco" y "Barra" al crear un formulario emergente.

    ==========================================================================
*/

//forzar ES6 (existe form-emerge-old.js sin modificaciones para el no soporte)
((...args)=>true);

//Asignación inicial a un objeto literal vacío o a si mismo
//si ya fue creado previamente.
var Wextensible = Wextensible || {};
//Envolvemos el módulo en el espacio de nombres
Wextensible.FORM_EMERGE_JS = function(){
//El constructor es una propiedad del Wextensible
Wextensible.FormEmerge = (function(){


// CONSTANTES Y GLOBALES -----------------------------------------------------

//Un acortador para el módulo general. Si se referencia
//en este módulo quedará en el closure
var wxG = Wextensible.general;


/* Constantes para prefijos de los identificadores (atributos id) y también las
 * clases (atributos class) de los elementos creados dinámicamente en un formulario
 * emergente. La finalidad es que no interaccionen con otras posibles referencias
 * del documento que por alguna casualidad tengan el mismo identificado o
 * nombre de clase respectivamente.
 */
var PID = "IDPRE";
var PCL = "CLPRE";


/* Constante para limitar el número máximo de pestañas. Si se declaran más
 * que estas, sólo se crearan este número.
 */
var MAX_TABS = 20;



/* Una variable globlal para almacenar referencias en un array a los formularios que
 * se vayan creando. Estas referencias son al objeto, es decir, a las instancias de
 * la clase formEmerge. No son referencias al elemento <form> que se crea dinámicamente
 * con cada instancia de formEmerge. Así con var x = forms[n] podemos acceder al
 * objeto formulario enésimo. Luego podemos aplicar el método form() de la clase
 * formEmerge y así con x.form() tenemos la referencia al elemento <form>.
 */
var forms = [];


/* Variable global para controlar el número de formularios abiertos. Se usa para
 * el caso en que usemos una pantalla de transparencia sobre la que se abren
 * los formularios emergentes cerrar esa pantalla cuando no queden formularios
 * abiertos. Antes la tenía como var formsAbiertos quedando en el closure pero
 * con paleta-color.js se aplicaba herencia y no accede a este closure. Ahora
 * la pasó a general.js
 */
var formsAbiertos = 0;


/* Esta función global nos permite cerrar todos los formularios en cualquier caso.
 * Se usa principalmente con el método abrir(), pues con pantalla sólo se permite
 * tener un formulario abierto y con esta función se cierran todos los abiertos.
 */
function cerrarFormularios() {
    try {
        for (var i=0, maxi=forms.length; i<maxi; i++){
            var n = forms[i].nombre;
            var m = forms[i].abierto;
            if (forms[i].abierto) {
                //Anulamos el evento cerrar por si estuviera activado
                var temp = forms[i].eventoCerrar;
                forms[i].eventoCerrar = false;
                forms[i].cerrar();
                //Reactivamos el evento cerrar
                forms[i].eventoCerrar = temp;
                //Cerramos el marco si estuviera abierto
                var marco = forms[i].form("marco");
                if (marco != null) marco.style.display = "none";
            }
        }
        formsAbiertos = 0;
        //Cerramos la pantalla si estuviera abierta
        var pantalla = document.getElementById(PID + "pantalla");
        if (pantalla != null) pantalla.style.display = "none";
    } catch (e) {
        alert("Error al cerrar todos los formularios (" + e.message + ")");
    }
}


/* Devuelve una referencia a un nombre de formulario. Esta referencia es al objeto
 * instanciado de la clase formEmerge, no del <form> que cada formulario emergente
 * contiene.
 * - nombreForm: string con el nombre del formulario para abrir.
 */
function formRef(nombreForm) {
    try {
        for (var i=0, maxi=forms.length; i<maxi; i++) {
            if (forms[i].nombre == nombreForm) return forms[i];
        }
        return null;
    } catch(e) {
        return null;
    }
}

/* En el método abrir() guardamos el ancho del body para cuando redimensionemos la ventana
 * consultar si ha variado el ancho y cerrar los formularios abiertos (ver manejador evento
 * window.onresize al final de este módulo)
 */
var bodyWidth = 0;


/* CONSTRUCTOR DEL FORMULARIO EMERGENTE -----------------------------------------------------
 * Crea clases de formularios, independientemente de cualquier otro módulo, por lo que es un
 * objeto reutilizable para otros propósitos. Se ha de acompañar de 'form-emerge.css' que es
 * la hoja de estilo CSS 2.1.
 * - nombreForm: string con el nombre del formulario
 * - cadenaTitulo: string con el título que irá en la barra superior
 * - conPantalla: booleano para abrir o no sobre un pantalla de transparencia
 * - conBotones: entero [0-3] para ningún boton, aceptar, aceptar/cancelar o
 *   aceptar/cancelar/aplicar.
 * - moverForm: "todo" (por defecto), "nada", "marco"
 * - accionEnvio: Si se pasa este argumento, construye el formulario para envío de datos
 *   al servidor, poniendo el botón aceptar como "submit" y el aplicar como "reset".
 *   Este argumento se pone en el action, mientras que el method será el siguiente:
 * - metodoEnvio: para el method del <form>. Si no se pasa se usa "post"
 * - dondePonerForm: string con ID de un elemento para crear el formulario. Si no se
 *   pasa se pone en el body del documento, dentro de un elemento DIV ID="htmldin" que,
 *   si no existe, se creará. Ahí se pondrán todos las construcciones, cada una a su
 *   vez dentro de otro DIV. Si se pasa un ID en el argumento se incluirá en ese elemento
 *   pero DEBE ESTAR VACÍO para evitar usar la concatenación de innerHTML que puede dar
 *   problemas (actualización de Julio 2015).
 * - ajustarAncho: booleano para ajustar el ancho del formulario al ancho del body
 *   aplicándose cuando se abre el formulario.
 * - botonMaximizar: (actual.Agosto 2015) Booleano, con true se agrega junto al botón de cerrar otro
 *   para maximizar y minimizar el tamaño del emergente. Si no se pasa o nulo o false se ignora.
 */
var tempConstructor = function(nombreForm, cadenaTitulo, conPantalla, conBotones, moverForm, accionEnvio, metodoEnvio, dondePonerForm, ajustarAncho, botonMaximizar) {
    //ahora se pueden pasar argumentos como new FormEmerge("nombreEmerge", {cadenaTitulo:"abc", ajustarAncho:true})
    if (typeof arguments[1]==="object" && arguments[1]!==null){
        ({cadenaTitulo="",
        conPantalla=false,
        conBotones=0,
        moverForm="todo",
        accionEnvio="",
        metodoEnvio="post",
        dondePonerForm="",
        ajustarAncho=false,
        botonMaximizar=false} = arguments[1]);
    }


    //Para tener disponibles las variables en el exterior
    this.PID = PID;
    this.PCL = PCL;

    /* PROPIEDADES .......................................................................
     * Las propiedades son generalmente privadas en el sentido de que no es necesario
     * acceder directamente para modificarlas. Si acaso para consultarlas como con
     * la propiedad botonPulsado para saber si se ha pulsado ese botón.
     * La mayor parte se modifica directamente a través de los métodos, pero vea
     * la documentación al respecto.
     */

    /* Almacena el nombre del formulario
     * Es una propiedad obligatoria y si está vacio el argumento no se crea el
     * formulario.
     */
    this.nombre = "";
    try {
        if ((nombreForm != null)&&(nombreForm != "")){
            if (formRef(nombreForm) != null) {
                alert("Ya ha sido creado el formulario '" + nombreForm + "'");
                return;
            } else {
                this.nombre = nombreForm;
            }
        } else {
            alert("El nombre del formulario es obligatorio");
            return;
        }
    } catch(e) {
        alert("Error al comprobar nombre para nuevo formulario " + nombreForm);
        return;
    }


    /* Almacena el título.
     * Por defecto es el mismo que el nombre.
     */
    this.titulo = nombreForm;
    if ((cadenaTitulo != null)&&(cadenaTitulo != "")) this.titulo = cadenaTitulo;


    //Todo el HTML a generar lo vamos almacenando aquí para luego generarlo dinámicamente
    //todo al mismo tiempo
    var htmlGen = "";

    /* Almacena si tiene pantalla
     * NOTA: el objeto pantalla es un <div> genérico para todas las instancias, por lo
     * tanto no se puede aplicar el método this.form() para obtener una referencia sino
     * cogerla directamente con document.getElementById(PID + "pantalla").
     * Con un click en la pantalla se cierran todos los formularios y se desactiva
     * la pantalla.
     */
    this.pantalla = conPantalla;

    if (conPantalla) {
        var pant = document.getElementById(PID + "pantalla");
        if (pant==null) {
            var sty = 'style="';
            var prefOpacity = wxG.vpForCss["opacity"];
            if (prefOpacity) {
                sty += wxG.descambiaGuiones(prefOpacity) + ": 0.6; ";
            } else {
                //para ie8
                sty += "filter: alpha(opacity=60); ";
            }
            htmlGen += '<div id="' + PID  + 'pantalla" '+ sty  + '" ' +
            'onclick="' + this.nombre + '.cerrarFormulario()">&nbsp;</div>';
        }
    }


    /* Número de botones a presentar.
     * Botones: 0 sin botones, 1 aceptar, 2 aceptar y cancelar,
     * 3 aceptar, cancelar y aplicar
     */
    this.botones = conBotones;

    /* Este es el identificador ID al objeto respuesta que trae y devuelve los valores.
     * Se trata de una cadena String que inicialmente se construye en base al nombre
     * de cada formulario, aunque puede ser referenciado desde fuera a otro elemento.
     * NOTA: El método this.form() no se puede aplicar a este id porque aquí va ya
     * con los prefijos debido a que luego podemos referenciar desde fuera otro
     * id y no necesariamente deberá llevar los prefijos. Entonces hay que coger
     * la referencia directamente con document.getElementById(this.idObjetoRespuesta)
     * El OBJETO RESPUESTA se construye inicialmente de forma automática para cada
     * formulario. En este caso se trata de un <input> tipo hidden, con un id
     * que se establece en this.idObjetoRespuesta.
     */
    this.idObjetoRespuesta =  PID + this.nombre + "objetoRespuesta";
    try {
        htmlGen +=  "<input type='hidden' id='" + this.idObjetoRespuesta + "' value='' />";
    } catch(e) {
        alert("Error al establecer objeto respuesta para " + this.form + ": " + e.message);
    }


    /* Esto es un string para almacenar temporalmente el valor del objeto respuesta.
     * Dentro del formulario podemos trabajar con this.respuesta y si al final se
     * pulsa aceptar pondremos esa respuesta en el objeto respuesta.
     * Con el resto de botones no se actualiza.
     */
    this.respuesta = "";
    //Ver método this.dotarRespuesta()
    this.operacionRespuesta = null;


    /* Estos son los eventos. Si tienen true se ejecutará las funcione anónima
     * correspondiente.
     */
    this.eventoAbrir = false;
    this.eventoAceptar = false;
    this.eventoCancelar = false;
    this.eventoAplicar = false;
    this.eventoCerrar = false;

    /* Ponemos una función anónima que luego podrá ser sobreescrita externamente.
     * Hay un función para cada evento.
     */
    this.ejecutaEventoAbrir = function(){};
    this.ejecutaEventoAceptar = function(){};
    this.ejecutaEventoCancelar = function(){};
    this.ejecutaEventoAplicar = function(){};
    this.ejecutaEventoCerrar = function(){};


    /* Cuando pulsamos un botón pone "aceptar", "cancelar", "aplicar" o "cerrar" según
     * cual sea el botón pulsado.
     */
    this.botonPulsado = "";

    /* Indica si el formulario está abierto
      */
    this.abierto = false;


    /* Número total de pestañas en la estructura interna de pestañas
     */
    this.totalTabs = 0;
    /* Pestaña activa */
    this.numTab = -1;
    /* Evento al activar pestaña */
    this.eventoPestanya = false;
    this.ejecutaEventoPestanya = function(){};

    /* Para mover el formulario. Con el valor "nada" para no mover, "todo" mover
     * todo el formulario "marco" para mover un marco. Por defecto tiene el valor
     * "todo". Si no se pasa o se pasa una cadena vacía se aplica este argumento
     * por defecto.
     */
    this.mover = "todo";
    if (moverForm == "nada") {
        this.mover = "nada";
    } else if (moverForm == "marco") {
        this.mover = "marco";
    } else {
        this.mover = "todo";
    }
    this.iniciaMover = false;
    this.xMover = 0;
    this.yMover = 0;
    if (this.mover == "marco") {
        var sty = 'style="';
        var prefOpacity = wxG.vpForCss["opacity"];
        if (prefOpacity) {
            sty += wxG.descambiaGuiones(prefOpacity) + ": 0.6; ";
        } else {
            //para ie8
            sty += "filter: alpha(opacity=60); ";
        }
        htmlGen += '<div id="' + PID + this.nombre + 'marco" ' +
        'unselectable="on" class="' + PCL + 'marco" ' +
        sty + wxG.descambiaGuiones(wxG.vpForCss["user-select"]) + ': none;" ';
        if (wxG.touch){
            htmlGen += 'ontouchstart="' + this.nombre + '.moverMarco(event)" ' +
            'ontouchmove="' + this.nombre + '.moverMarco(event)" ' +
            'ontouchend="' + this.nombre + '.moverMarco(event)" ' +
            'ontouchleave="' + this.nombre + '.moverMarco(event)" ';
        }
        if (wxG.mouse){
            htmlGen += 'onmouseup="' + this.nombre + '.moverMarco(event)" ' +
            'onmousemove="' + this.nombre + '.moverMarco(event)" ' +
            'onmouseout="' + this.nombre + '.moverMarco(event)" ' +
            'onmouseleave="' + this.nombre + '.moverMarco(event)" ';
        }
        htmlGen += '></div>';
    }

    /* Para usar el formulario para enviar datos al servidor.
     * La propiedad this.paraEnvio será true si accionEnvio tiene un string
     * Si el método no es "get" o "post" se queda como "post"
     */
    this.paraEnvio = false;
    this.accionEnvio = "";
    this.metodoEnvio = "post";
    if ((accionEnvio != null)&&(accionEnvio != "")){
        this.paraEnvio = true;
        this.accionEnvio = accionEnvio;
        if ((metodoEnvio != null)&&(metodoEnvio != "")&&
            ((metodoEnvio.toLowerCase()=="get")||(metodoEnvio.toLowerCase()=="post"))){
            this.metodoEnvio = metodoEnvio;
        }
    }


    /* Esta propiedad tiene el id de un elemento de bloque donde construir el
     * formulario. Si está vacío se construirá en el body del documento.
     */
    this.idDondeForm = "";
    if ((dondePonerForm != null)&&(dondePonerForm !="")){
        this.idDondeForm = dondePonerForm;
    }

    /* La base del z-index para el form
     */
    this.zIndexBase = 10000000;

    /* Para cuando abrimos y el ancho es mayor que el del dispositivo fuerza el ancho
     * del emergente para que no sea mayor. Para que se ejecute es necesario indicar
     * el argumento ancho en el método abrir.
     */
    this.ajustarAncho = ajustarAncho;

    this.botonMaximizar = botonMaximizar;
    this.dataMax = {max: false, tabdiv: false, wmin: 0, hmin: 0, wmax: 0, hmax: 0, left: 0, top: 0};

    /* La variable global forms es un array de referencias a las instancias de esta
     * clase formEmerge que se van creando. Con push() metemos una nueva referencia en
     * ese array.
     */
    this.indiceForm = forms.length;
    forms.push(this);

    //Referenciamos forms para usar desde el exterior
    this.forms = forms;


    /* Crea un elemento <form> en HTML de forma dinámica y lo rellena con resto de
     * controles para su gestión, con la siguiente estructura básica:
     * · Un <div> con la barra de título y el botón de cerrar.
     * · Un <div> para almacenar todo el interior del formulario.
     * · Un <fieldset> para los botones.
     */
    try {
        var thtml = "";
        // El <form> para todo el formulario
        thtml += '<form id="' + PID + this.nombre + '" unselectable="on" ';
        if (this.paraEnvio) {
            thtml += 'action="' + this.accionEnvio + '" ' +
            'method="' + this.metodoEnvio + '" ';
        }
        if (this.mover == "todo"){
            //Con mover todo el form se desplaza a medida que movemos el ratón por el mismo
            if (wxG.touch){
                thtml += 'ontouchmove="' + this.nombre + '.moverTodo(1, event)" ';
                //'ontouchstart = "' + this.nombre + '.moverTodo(1, event)" ' +
                thtml += 'ontouchleave="' + this.nombre + '.moverTodo(2, event)" ';
            }
            if (wxG.mouse){
                thtml += 'onmousemove="' + this.nombre + '.moverTodo(1, event)" ' +
                'onmouseout="' + this.nombre + '.moverTodo(2, event)" ' +
                'onmouseleave="' + this.nombre + '.moverTodo(2, event)" ';
            }
        }
        //Al hacer click en cualquier parte del formulario lo traemos al frente
        if (wxG.touch){
            thtml += 'ontouchend="' + this.nombre + '.traerAlFrente(event)" ';
        }
        if(wxG.mouse){
            thtml += 'onmouseup="' + this.nombre + '.traerAlFrente()" ';
        }
        thtml += 'class="' + PCL + 'form-emerge" style="z-index: ' + this.zIndexBase + '; ' +
        wxG.descambiaGuiones(wxG.vpForCss['user-select']) + ': none; ">';
        // La barra superiorcontendrá un span para el título a la izquierda, con otro span flotado a la derecha para el botón cerrar
        thtml += '<div id="' + PID + this.nombre + 'Barra" unselectable="on" ' +
        'class="' + PCL + 'form-emerge-cabeza" ' +
        'style="' + wxG.descambiaGuiones(wxG.vpForCss['user-select']) + ': none;">';
        thtml += '<button type="button" class="' + PCL + 'form-emerge-boton-cerrar" unselectable="on" ' +
        'id="' + PID + this.nombre + 'Boton-cerrar" ' +
        'style="' + wxG.descambiaGuiones(wxG.vpForCss['user-select']) + ': none;" ' +
        'onclick="' + this.nombre + '.cerrar()" ' +
        '>&times;</button>';
        //Botón maximizar
        if (this.botonMaximizar){
            thtml += '<button type="button" class="' + PCL + 'form-emerge-boton-maximizar" unselectable="on" ' +
            'id="' + PID + this.nombre + 'Boton-maximizar" ' +
            'style="' + wxG.descambiaGuiones(wxG.vpForCss['user-select']) + ': none;" ' +
            'onclick="' + this.nombre + '.maximizar()" ' +
            '><span>&nbsp;&nbsp;&nbsp;&nbsp;</span></button>';
        }
        //El título es otro DIV que quedará a la izquierda
        thtml += '<div id="' + PID + this.nombre + 'Titulo" unselectable="on" ' +
        'style="' + wxG.descambiaGuiones(wxG.vpForCss['user-select']) + ': none; ';
        if (this.mover == "nada") thtml += 'cursor: no-drop; ';
        thtml += '" class="' + PCL + 'form-emerge-titulo" ';
        //Al hacer click en cualquier parte del formulario lo traemos al frente
        if (wxG.touch){
            thtml += 'ontouchend="' + this.nombre + '.traerAlFrente(event)" ';
        }
        if(wxG.mouse){
            thtml += 'onclick="' + this.nombre + '.traerAlFrente()" ';
        }
        if (this.mover != "nada"){
            thtml += 'style = "cursor: move" ';
            if (this.mover == "todo"){
                if (wxG.touch){
                    thtml += 'ontouchstart="' + this.nombre + '.moverTodo(0, event)" ';
                    //thtml += 'ontouchend = "' + this.nombre + '.moverTodo(2, event)" ';
                }
                if (wxG.mouse){
                    thtml += 'onmousedown="' + this.nombre + '.moverTodo(0, event)" ' +
                    'onmouseup="' + this.nombre + '.moverTodo(2, event)" ';
                }
            } else {
                if (wxG.touch){
                    thtml += 'ontouchstart="' + this.nombre + '.moverMarco(event)" ';
                }
                if (wxG.mouse){
                    thtml += 'onmousedown="' + this.nombre + '.moverMarco(event)" ' +
                    'onmouseup="' + this.nombre + '.moverMarco(event)" ';
                }
            }
        }
        thtml += '>' + this.titulo + '</div></div>';
        //El bloque del interior es un div
        thtml += '<div id="' + PID + this.nombre + 'Interior" ';
        if (wxG.touch){
            //También aquí en móviles podemos traer al frente
            thtml += 'ontouchend="' + this.nombre + '.traerAlFrente(event)" ';
        }
        //Le ponemos un valor data-font-size para el método dimensionar()
        thtml += 'class="' + PCL + 'form-emerge-interior" ' +
        'data-font-size="1" ';
        if (this.ajustarAncho){
            //Ponemos un max-width para que no supere el body
            thtml += 'style="max-width: ' + (document.body.offsetWidth-16) + 'px; "';
        }
        thtml += '></div>';
        //Los botones del pie si se incluyen en un fieldset
        if (this.botones > 0){ //botón aceptar
            thtml +=  '<fieldset id="' + PID + this.nombre + 'Botones" unselectable="on" ' +
            'style="' + wxG.descambiaGuiones(wxG.vpForCss['user-select']) + ': none;" ';
            if (wxG.touch){
                //También aquí en móviles podemos traer al frente
                thtml += 'ontouchend="' + this.nombre + '.traerAlFrente(event)" ';
            }
            thtml += 'class="' + PCL + 'form-emerge-botones">' +
            '<button id="' + PID + this.nombre + 'BotonAceptar" ';
            if (this.paraEnvio){
                thtml += 'type="submit" value="enviar" ';
            } else {
                thtml += 'type="button" ';
            }
            thtml += 'onclick = "' + this.nombre + '.aceptar()">Aceptar</button>';
            if (this.botones > 1){//botones aceptar y cancelar
                thtml += '<button type="button" id="' + PID + this.nombre + 'BotonCancelar" ' +
                ' onclick="' + this.nombre + '.cancelar()" />Cancelar</button>';
            }
            if (this.botones > 2) {
                //botones aceptar, cancelar y aplicar
                thtml += '<button id="' + PID + this.nombre + 'BotonAplicar" ';
                if (this.paraEnvio){
                    thtml += 'type="reset" value="borrar" ';
                } else {
                    thtml += 'type="button" ';
                }
                thtml += 'onclick="' + this.nombre + '.aplicar()">Aplicar</button>';
            }
            thtml += '</fieldset>';
        }

        //Dimensionar el form. Por defecto estos botones siempre serán agregados. Pueden ocultarse
        //en el estilo del elemento DIV (en form-emerge.CSS)
        thtml += '<div  id="' + PID + this.nombre + 'Dimensionar" ';
        if (wxG.touch){
            //También aquí en móviles podemos traer al frente
            thtml += 'onclick="' + this.nombre + '.traerAlFrente(event)" ';
        }
        thtml += 'class = "' + PCL + 'form-emerge-dimensionar">' +
        '<input type="button" onclick="' + this.nombre + '.dimensionar(1)" value="+" />' +
        '<input type="button" onclick="' + this.nombre + '.dimensionar(-1)" value="-" />' +
        '</div>';

        thtml += '</form>';
        htmlGen += thtml;
        if (this.idDondeForm == ""){
            var htmlDin = document.getElementById("htmldin");
            if (!htmlDin) {
                htmlDin = document.createElement("div");
                htmlDin.id = "htmldin";
                document.body.appendChild(htmlDin);
            }
            //Actualización Julio 2015: Antes hacía htmlDin.innerHTML += htmlGen con lo que todos los emergentes
            //se agregaban en el mismo contenedor. Pero concatenar innerHTML puede tener problemas si hay elementos
            //o eventos que se agregaron posteriormente. Especialmente los eventos agregados con addEventListener
            //no se copian al concatenar. Ahora creamos un DIV para cada emergente y los metemos con un DocumentFragment
            //usando appendChild.
            var frag = document.createDocumentFragment();
            var div = document.createElement("div");
            div.innerHTML = htmlGen;
            frag.appendChild(div);
            htmlDin.appendChild(frag);
        } else {
            var elemento = document.getElementById(this.idDondeForm);
            if (elemento) {
                //Si se especifica un lugar se sobreescribirá el innerHTML (nunca concatenamos)
                if (elemento.innerHTML != "") {
                    alert("Error al crear dinámicamente el nuevo formulario " + this.nombre +
                            ": el elemento '" + this.idDondeForm + "' para ubicar " +
                            "el formulario debe estar vacío.");
                } else {
                    elemento.innerHTML = htmlGen;
                }
            } else {
                alert("Error al crear dinámicamente el nuevo formulario " + this.nombre +
                        ": no existe el elemento '" + this.idDondeForm + "' para ubicar " +
                        "el formulario.");
                return;
            }
        }
    } catch(e){
        alert("Error al crear dinámicamente el nuevo formulario " + this.nombre + ": " + e.message);
    }
};// cierra el constructor

//INCORPORAMOS LOS MÉTODOS AL PROTOTIPO


/* MÉTODOS PÚBLICOS .......................................................................
 * Métodos a usar externamente
 */


/* Devuelve una referencia del formulario, es decir, del elemento <form> que engloba a
 * todo el formulario construido dinámicamente. Para obtener una referencia a la instancia
 * creada de esta clase formEmerge, debe usarse la función global formRef() o bien acceder
 * al array forms.
 * - idElementoSinPrefijo: string con el atributo 'id' del elemento que queremos
 *   referenciar SIN PASAR EL PREFIJO PID+NOMBRE y siempre que omitirPrefijo sea false o bien
 *   nulo (argumento opcional que cuando no se pasa será nulo).
 *   Si no se pasa el argumento obtenemos una referencia al propio elemento <form>.
 * - omitirPrefijo: un booleano. Si no se pasa o es false se agreaga el prefijo. En otro
 *   caso se obtiene el elemento con el id tal como se pasa.
 */
tempConstructor.prototype.form = function (idElementoSinPrefijo, omitirPrefijo) {
    try {
        if (idElementoSinPrefijo == null) { //Referencia el elemento <form>
            return document.getElementById(PID + this.nombre);
        } else { //Referencia el elemento directamente
            if ((omitirPrefijo == null) || (!omitirPrefijo)){
                return document.getElementById(PID + this.nombre + idElementoSinPrefijo) ;
            } else {
                return document.getElementById(idElementoSinPrefijo);
            }
        }
    } catch(e) {
        return null;
     }
};


/* Introduce html en el interior, sin preservar lo que haya.
 * - html: string que representa un literal HTML para construir dinámicamente en el interior
 *   del emergente.
 */
tempConstructor.prototype.nuevoInterior = function (html) {
    try {
        var inter = this.form("Interior");
        inter.innerHTML = html;
    } catch (e) {
        alert("Error con nuevo interior para " + this.nombre + ": " + e.message);
    }
};

/* Introduce html en el interior, preservando lo que haya.
 * - html: string que representa un literal HTML para construir dinámicamente en el interior
 *   del emergente.
 * - antesDespues: string con los valores "antes" o "despues" para anexar más interior
 *   al que ya existe.
 */
tempConstructor.prototype.anexaInterior = function (html, antesDespues) {
    try {
        var inter = this.form("Interior");
        var ad = "despues";
        if ((antesDespues == null)||(antesDespues == "")) {
            ad = "despues";
        } else if ((antesDespues == "antes")||(antesDespues == "despues")){
            ad = antesDespues;
        }
        if (ad == "antes"){
            inter.innerHTML = html + inter.innerHTML;
        } else {
            inter.innerHTML = inter.innerHTML + html;
        }
    } catch (e) {
        alert("Error al anexar interior para " + this.nombre + ": " + e.message);
    }
 };



/* Crea pestañas en el interior del emergente.
 * - arrayNombres: un array de string que pueden ser literales HTML para poner como
 *   títulos en las pestañas.
 * - arrayHtmls: un array también string literal HTML para el interior de cada contenido
 *   para cada pestaña. Deben coincidir en número ambos arrays.
 * - ancho, alto: strings para pasar el ancho y alto como estilo CSS, p.e., "20em"
 * - antesDespues: anexa las pestañas antes o después del contenido interior que pueda
 *   ya existir.
 */
tempConstructor.prototype.creaTabs = function (arrayNombres, arrayHtmls, ancho,
        alto, antesDespues) {
   try {
       //Gestionamos los argumento ancho y alto para construir un style que luego
       //incorporaremos en los bloques interiores de las pestañas.
       var anchoAltoTabdiv = "";
       if ((ancho != null)&&(ancho != "")){
            anchoAltoTabdiv = "width: " + ancho + ";";
       }
       if ((alto != null)&&(alto != "")){
           anchoAltoTabdiv += "height: " + alto + ";";
       }
       if (anchoAltoTabdiv != "") anchoAltoTabdiv = "style = '" + anchoAltoTabdiv + "' ";
       //Actualizamos la proiedad totalTabs, número de pestañas
       this.totalTabs = arrayNombres.length;
       //Controlamos el número máximo de pestañas permitidas.
       //Sólo se crearan MAX_TABS pestañas y el resto se ignora.
       if (this.totalTabs > MAX_TABS) this.totalTabs = MAX_TABS;
       //Debe tener al menos una pestaña
       if (this.totalTabs < 1) {
           alert("Error en el número de pestañas de " + this.nombre);
       } else {
           //Si los dos arrays no son de la misma longitud solo tendremos un problema
           //cuando el arrayHtmls tenga menos elementos, pues si tiene más no se
           //van a poner sino el mismo número de items que el primer arrayNombres
           if (arrayHtmls.length < this.totalTabs) {
               for (var i = arrayHtmls.length, maxi=this.totalTabs; i<maxi; i++){
                   arrayHtmls[i] = "&nbsp";
               }
           }
           //La estructura de pestañas es una tabla, donde la primera fila
           //contiene una celda para cada pestaña...
           var thtml = "<div id='" + PID + this.nombre + "ContieneTabs'>" +
           "<table class = '" + PCL + "form-emerge-tabs'><tr>";
           for (var i=0, maxi=this.totalTabs; i<maxi; i++){
               thtml += "<th class = '" + PCL + "form-emerge-tabcks'>&nbsp;</th>" +
               "<th id = '" + PID + this.nombre + "Tabck" + i + "' " +
               "class = '" + PCL + "form-emerge-tabck' " +
               "onclick = '" + this.nombre + ".activaTab(this)'>";
               thtml += arrayNombres[i] + "</th>";
           }
           thtml += "</tr>";
           //...y luego una segunda fila con una única celda que abarca todas
           //las columnas para incluir los contenidos.
           thtml += "<tr><td colspan='" + (2*this.totalTabs) + "' >";
           for (var i=0, maxi=this.totalTabs; i<maxi; i++){
               thtml +=  "<div id = '" + PID + this.nombre + "Tabdiv" + i + "' " +
               "class='" + PCL + "form-emerge-tabdiv' " + anchoAltoTabdiv + ">" +
               arrayHtmls[i] + "</div>";
           }
           thtml +=  "</td></tr></table></div>";
           //Por defecto se anexa antes del contenido actual
           var ad = "antes";
           if ((antesDespues != null)&&(antesDespues != "")) ad = antesDespues;
           this.anexaInterior(thtml, ad);
           //Activamos la primera pestaña
           this.activaTab(0);
       }
   } catch (e) {
       alert("Error al crear pestañas para " + this.nombre + ": " + e.message);
   }

};

/* ABRE EL FORMULARIO en una posición dada del cuerpo de la página y
 * le pone el título que se pase modificando el dado en el constructor.
 * Argumentos:
 * - interior: string para el interior, que puede ser HTML.
 * - izquierda: número entero en píxeles para el punto izquierda del formulario
 *              Si es "center" se centrará horizontalmente en pantalla.
 * - arriba: número entero en píxeles para el punto arriba del formulario
 *              Si es "center" se centrará verticalmente en pantalla.
 * - titulo: string, aunque el título del formulario se suministra al crearlo, aquí
 *   podemos modificarlo. Si se pasa "" no se modifica.
 * - alto, ancho: string que representa el estilo como "5em", "100px", etc.
 * - sobresale: valores del estilo overflow, como "hidden", "scroll", "auto", etc.
 * - foco: una referencia a un control de formulario o elemento que pueda recibir el
 *   foco. Puede ser un entero para la matriz de controles de <form>, un string
 *   para el 'id' del elemento o una referencia específica a un elemento HTML.
 * Los argumentos todos son opcionales, si alguno no se suministra antes que
 * otro que si se pasa, debe ponerse "" (o null) con lo que será ignorado.
 */
tempConstructor.prototype.abrir = function (interior, titulo, izquierda, arriba, ancho, alto, sobresale, foco) {
    try {
        if (typeof arguments[0]==="object" && arguments[0]!==null){
            //Usamos null como valores por defecto para no modificar el código siguiente
            ({interior=null, titulo=null, izquierda=null, arriba=null, ancho=null, alto=null, sobresale=null, foco=null} = arguments[0]);
        }
        this.iniciaMover = false;
        this.xMover = 0;
        this.yMover = 0;
        this.botonPulsado = "";
        //Si es un formulario con pantalla se cierran todos los emergentes abiertos
        if (this.pantalla) {
            cerrarFormularios();
            document.getElementById(PID + "pantalla").style.display = "block";
        }
        //Ponemos el titulo
        if ((titulo != null)&&(titulo != "")) {
            if (titulo != ""){
                this.titulo = titulo;
                wxG.setInnerText(this.form("Titulo"), titulo);
            }
        }
        //Ponemos el interior
        var elemInter = this.form("Interior");
        if ((interior != null)&&(interior != "")) this.nuevoInterior(interior.toString());
        //Necesitamos mostrar el formulario antes de aplicar medidas y posiciones
        //para consultarlas y modificarlas en su caso
        this.form().style.display = "block";
        //Ponemos el alto
        if ((alto != null)&&(alto != "")) elemInter.style.height = alto;
        //Ponemos el ancho
        var anchoBody = 9999999;
        if ((ancho != null)&&(ancho != "")) {
            if (this.ajustarAncho){
                //Cada vez que se abre el emergente hay que consultar el ancho de pantalla por
                //si se ha redimensionado
                anchoBody = document.body.offsetWidth-16;
                try { //ie8 no soporta maxWidth/Height
                    elemInter.style.maxWidth = anchoBody + "px";
                }catch(e){}
            }
            elemInter.style.width = ancho;
        }
        //Ponemos sobresale
        if (sobresale) elemInter.style.overflow = sobresale;
        //El form por defecto se alinea a la izquierda. Cambiando esta propiedad a "right" se
        //alinea por la derecha para evitar que se salga de la ventana.
        this.form().style.left = 0;
        if ((izquierda != null)&&(izquierda != "")){
            //Con el valor "center" se centra en pantalla horizontalmente  ---> EN REVISIÓN
            if (izquierda == "center"){
                izquierda = parseInt((document.body.offsetWidth - this.form().offsetWidth) / 2, 10);
            }
            if (isNaN(izquierda)) izquierda = 0;
            //Controla que no se salga por la derecha de la ventana.
            //El ancho con this.form().offsetWidth del formulario no queda establecido
            //hasta que se construye dinámicamente. Por lo tanto todo esto
            //tiene que ir al final de este método
            var derechaBody = document.body.offsetWidth;
            var derechaForm = izquierda + this.form().offsetWidth;
            if (derechaForm > derechaBody) izquierda = izquierda - (derechaForm - derechaBody);
            this.form().style.left = izquierda + "px";
        }
        //Ponemos arriba inicialmente a cero
        this.form().style.top = 0;
        if ((arriba != null)&&(arriba != "")) {
            //Con el valor "center" se centra en pantalla verticalmente ---> EN REVISIÓN
            if (arriba == "center"){
                var bst = 0;
                if (document.body.scrollTop){
                    bst = document.body.scrollTop;
                } else if (document.documentElement.scrollTop){
                    bst = document.documentElement.scrollTop;
                }
                arriba = parseInt((window.innerHeight - this.form().offsetHeight)/2, 10) + bst;
            }
            if (isNaN(arriba)) arriba = 0;
            var abajoBody = document.body.offsetHeight;
            var abajoForm = arriba + this.form().offsetHeight;
            if (abajoForm > abajoBody) arriba = arriba - (abajoForm - abajoBody);
            if (arriba<0) arriba = 0;
            this.form().style.top = arriba + "px";
        }
        //Guardamos el ancho del body para cuando redimensionemos la ventana consultar
        //si ha variado el ancho y cerrar los formularios abiertos (ver manejador evento
        //window.onresize al final de este módulo)
        bodyWidth = document.body.clientWidth;
        //Ponemos el valor del objeto respuesta en la respuesta
        var objetoRespuesta = document.getElementById(this.idObjetoRespuesta);
        if (objetoRespuesta){
            if (objetoRespuesta.hasAttribute("value")){
                this.respuesta = objetoRespuesta.value;
            } else {
                this.respuesta = wxG.getInnerText(objetoRespuesta);
            }
        }
        //Actualizamos datos para maximizar
        if (this.botonMaximizar){
            //Vemos si hay tabDivs para buscar los tamaños max y min
            var wmin=0, hmin=0, fw = 0.9, fh = 0.8;
            if (this.totalTabs > 0){
                this.dataMax.tabdiv = true;
                for (var i=0, maxi=this.totalTabs; i<maxi; i++) {
                    var tabdiv = this.form("Tabdiv" + i);
                    wmin = Math.max(wmin, tabdiv.offsetWidth);
                    hmin = Math.max(hmin, tabdiv.offsetHeight);
                }
                //Si hay tabs las dimensiones deberían venir en los tabDiv, en todo caso aseguramos
                this.form("Interior").style.width = "auto";
                this.form("Interior").style.height = "auto";
            } else {
                this.dataMax.tabdiv = false;
                wmin = this.form("Interior").offsetWidth;
                hmin = this.form("Interior").offsetHeight;
            }
            //Hay que quitar límites por si se han puesto más arriba en ajustarAncho para que 
            //no impida maximizar
            try { //ie8 no soporta maxWidth/Height
                if (!this.ajustarAncho || wmin<anchoBody) this.form("Interior").style.maxWidth = "none";
                this.form("Interior").style.maxHeight = "none";
            } catch(e) {}
            this.dataMax.wmin = wmin;
            this.dataMax.hmin = hmin;
            //clientWidth es para ie8
            this.dataMax.wmax = Math.round((window.innerWidth||document.documentElement.clientWidth) * fw, 0);
            this.dataMax.hmax = Math.round((window.innerHeight||document.documentElement.clientHeight) * fh, 0);
            this.dataMax.max = false;
        }
        //Actualizamos formularios abiertos
        this.abierto = true;
        formsAbiertos++;
        this.traerAlFrente();
        if (this.eventoAbrir) this.ejecutaEventoAbrir();
        //Ponemos el foco. Si es "none" no cambiamos foco
        if (foco!=="none"){
            let elementoFoco = null;
            if (foco!==null){
                let tipo = typeof foco;
                if (tipo==="number"){
                    //A partir de mayo 2020 convertimos en button los botones maximizar y cerrar que ocupan posiciones 0 y 1 en la matriz de campos del formulario. 
                    //Por lo tanto cuando enviemos un número de campo consideramos que hay que sumar 2 o bien 1 si botón maximizar no existe
                    let offset = this.form("Boton-maximizar") ? 2 : 1;
                    elementoFoco = this.form()[foco+offset];
                } else if (tipo==="object"){
                    elementoFoco = foco;
                } else if (tipo==="string"){
                    elementoFoco = this.form(foco, true);
                }
            }
            if (!elementoFoco){
                let grupoBotones = this.form("Botones");
                if (grupoBotones && wxG.estiloActual(grupoBotones, "display")!=="none"){
                    let botonAceptar = this.form("BotonAceptar");
                    let botonCancelar = this.form("BotonCancelar");
                    if (botonCancelar && wxG.estiloActual(botonCancelar, "display")!=="none") {
                        elementoFoco = botonCancelar;
                    } else if (botonAceptar && wxG.estiloActual(botonAceptar, "display")!=="none") {
                        elementoFoco = botonAceptar;
                    }
                }
            }
            if (!elementoFoco) elementoFoco = this.form("Boton-cerrar");
            elementoFoco.focus();
        }
    } catch(e){
       alert("Error al abrir " + this.nombre + ": " + e.message);
    }
};


/* MÉTODOS PRIVADOS ...............................................................
 * Métodos que generalmente no es necesario usar externamente y son para la gestión
 * interna de la clase.
 */


/* Activa y desactiva la pestaña visible.
 * Este método es usado por la estructura interna de pestañas para activar el
 * contenido de cada una.
 * - unTab: un número de pestaña según se crearon con el orden de los arrays
 *   en los argumentos de creaTabs() o bien una referencia explícita a un
 *   elemento para activa la pestaña correspondiente.
 */
tempConstructor.prototype.activaTab = function (unTab) {
    try {
        //Los elementos div de todas las pestañas están todos juntos en una
        //única celda de la segunda fila de la tabla de estructura de pestañas.
        //Hemos de buscar la seleccionada, ponerle display block y al resto
        //ponerle display none.
        this.numTab = 0;
        if (typeof(unTab) == "object") {
            var cad = unTab.id;
            var idTab = cad.split("Tabck");
            this.numTab = parseInt(idTab[1]);
        } else if (typeof(unTab) == "number"){
            this.numTab = unTab;
        } else {
            this.numTab = 0;
        }
        //Las "Tabdiv" son los bloques interiores mientras que los "Tabck"
        //son las pestañas.
        var esteTabDiv = this.form("Tabdiv" + this.numTab);
        for (var i=0, maxi=this.totalTabs; i<maxi; i++) {
            var tabdiv = this.form("Tabdiv" + i);
            var tabck = this.form("Tabck" + i);
            if (tabdiv.id == esteTabDiv.id) {
                tabdiv.style.display = "block";
                tabck.style.color = "blue";
                tabck.style.backgroundColor = "rgb(230,230,205)";
                tabck.style.borderBottom = "rgb(230,230,205) solid 1px";
            } else {
                tabdiv.style.display = "none";
                tabck.style.color = "white";
                tabck.style.backgroundColor = "gray";
                tabck.style.borderBottom = "gray solid 1px";

            }
        }
        if (this.eventoPestanya) this.ejecutaEventoPestanya();
    } catch (e) {
        alert("Error al activar una pestaña de " + this.nombre + ": " + e.message);
    }

};



//Se usa en aceptar y aplicar para operar la respuesta
tempConstructor.prototype.dotarRespuesta = function() {
    var valorAnterior, resultado, attrValue=false;
    var objetoRespuesta = document.getElementById(this.idObjetoRespuesta);
    try {
        attrValue = objetoRespuesta.hasAttribute("value");
    } catch(e) {
        attrValue = false;
    }
    if (attrValue){
        valorAnterior = objetoRespuesta.value;
    } else {
        valorAnterior = wxG.getInnerText(objetoRespuesta);
    }
    if (this.operacionRespuesta!==null) {
        //Si la operación es un string se concatena. Si todo son números se suman.
        resultado = valorAnterior + this.operacionRespuesta + this.respuesta;
    } else {
        resultado = this.respuesta;
    }
    if (attrValue){
        objetoRespuesta.value = resultado;
    } else {
        wxG.setInnerText(objetoRespuesta, resultado);
    }
};

/* Gestiona el evento del botón 'aceptar'.
 * Pone this.respuesta en this.objetoRespuesta.value, cierra el formulario y ejecuta
 * el evento correspondiente si estuviera activado. También pone botonPulsado = "aceptar".
 * En estos eventos de los botones hay que volver a refrescar el objeto respuesta
 * pues aunque no se pierde la referencia si es verdad que no se puede aplicar estilo.
 */
tempConstructor.prototype.aceptar = function () {
    try {
        this.botonPulsado = "aceptar";
        this.form().style.zIndex = this.zIndexBase;
        this.form().style.display = "none";
        if (this.eventoAceptar) this.ejecutaEventoAceptar();
        this.dotarRespuesta();
        if (formsAbiertos>0) formsAbiertos--;
        if ((this.pantalla)&&(formsAbiertos == 0)) {
            document.getElementById(PID + "pantalla").style.display = "none";
        }
        if (this.botonMaximizar && this.dataMax.max) this.maximizar();
        this.abierto = false;
    } catch(e) {
        alert(this.nombre + ", error método aceptar(): " + e.name + ", " + e.message);
        this.botonPulsado = "";
    }
};

/* Gestiona el evento del botón 'aplicar'.
 * Lo mismo que aceptar pero no cierra el formulario y pone botonPulsado = "aplicar".
 */
tempConstructor.prototype.aplicar = function () {
    try {
        this.botonPulsado = "aplicar";
        if (this.eventoAplicar) this.ejecutaEventoAplicar();
        this.dotarRespuesta();
    } catch(e) {
        alert(this.nombre + ", error método aplicar(): " + e.name + ", " + e.message);
        this.botonPulsado = "";
    }
};


/* Gestiona el evento del botón 'cancelar'
 * Cierra el formulario sin poner la respuesta en el objetoRespuesta.
 * Pone botonPulsado = "cancelar" y ejecuta evento.
 */
tempConstructor.prototype.cancelar = function () {
    this.botonPulsado = "cancelar";
    try {
        this.respuesta = "";
        this.form().style.zIndex = this.zIndexBase;
        this.form().style.display = "none";
        if (this.eventoCancelar) this.ejecutaEventoCancelar();
        //no se modifica objetoRespuesta.value
        if (formsAbiertos>0) formsAbiertos--;
        if ((this.pantalla)&&(formsAbiertos == 0)) {
            document.getElementById(PID + "pantalla").style.display = "none";
        }
        if (this.botonMaximizar && this.dataMax.max) this.maximizar();
        this.abierto = false;
    } catch(e) {
        alert(this.nombre + ", error método cancelar(): " + e.name + ", " + e.message);
    }

};


/* Gestiona el evento del botón 'cerrar'.
 * Hace lo mismo que el botón cancelar.
 */
tempConstructor.prototype.cerrar = function () {
    this.botonPulsado = "cerrar";
    try {
        this.respuesta = "";
        this.form().style.display = "none";
        this.form().style.zIndex = this.zIndexBase;
        if (this.eventoCerrar) this.ejecutaEventoCerrar();
        //no se modifica objetoRespuesta.value
        if (formsAbiertos>0) formsAbiertos--;
        if ((this.pantalla)&&(formsAbiertos == 0)) {
            document.getElementById(PID + "pantalla").style.display = "none";
        }
        if (this.botonMaximizar && this.dataMax.max) this.maximizar();
        this.abierto = false;
    } catch(e) {
       alert(this.nombre + ", error método cerrar(): " + e.name + ", " + e.message);
    }

};


//Maximizar tamaño del emergente
tempConstructor.prototype.maximizar = function () {
    try {
        if (this.botonMaximizar) {
            var w=0, h=0, left=0, top=0;
            if (this.dataMax.max){
                this.dataMax.max = false;
                //minimizamos
                w = this.dataMax.wmin;
                h = this.dataMax.hmin;
                //reponemos posicion minimizada
                left = this.dataMax.left;
                top = this.dataMax.top;
            } else {
                this.dataMax.max = true;
                //maximizmos
                w = this.dataMax.wmax;
                h = this.dataMax.hmax;
                //guardamos posición minimizada
                this.dataMax.left = this.form().offsetLeft;
                this.dataMax.top = this.form().offsetTop - document.body.scrollTop - document.documentElement.scrollTop;
            }
            if (this.dataMax.tabdiv){
                for (var i=0, maxi=this.totalTabs; i<maxi; i++) {
                    var tabdiv = this.form("Tabdiv" + i);
                    tabdiv.style.width = w + "px";
                    tabdiv.style.height = h + "px";
                }
            } else {
                this.form("Interior").style.width = (w+2) + "px";
                this.form("Interior").style.height = (h+2) + "px";
            }
            this.form().style.left = left + "px";
            this.form().style.top = (top + document.body.scrollTop + document.documentElement.scrollTop) + "px";
        }
    } catch(e) {
       alert(this.nombre + ", error método maximizar(): " + e.name + ", " + e.message);
    }
};


/* Mueve el formulario completamente.
 * Este método mueve el formulario por la pantalla cuando el usuario pulsa en la barra
 * del título y la arrastra.
 * Se basa en tres eventos que hay en el <form> creado para cada emergente:
 * "onmousemove = '" + this.nombre + ".mover(1, event)' "
 * "onmouseout = '" + this.nombre + ".mover(1, event)' "
 * "onmouseleave = '" + this.nombre + ".mover(2, event)' "
 * y en estos eventos de la barra superior:
 * "onmousedown = '" + this.nombre + ".mover(0, event)' "
 * "onmouseup = '" + this.nombre + ".mover(2, event)' "
 * Los argumentos son:
 * - modo: es un entero 0, 1 o 2 para controlar lo que hace el puntero.
 * - evento: el evento producido.
 */
tempConstructor.prototype.moverTodo = function (modo, evento) {
    try {
        var evt = window.event || evento;
        var touch = (evt.type.indexOf("touch")>-1);
        var tev;
        if (touch){
            tev = evt.changedTouches[0];
        } else {
            tev = evt;
        }
        switch (modo) {
            //Iniciamos el movimiento, lo que se produce cuando pinchamos sobre
            //la barra superior
            case 0 : {
                if (evt.preventDefault) {
                    evt.stopPropagation();
                    evt.preventDefault();
                }
                this.xMover = tev.clientX;
                this.yMover = tev.clientY;
                this.iniciaMover = true;
                break;
            }
            //Movemos el formulario
            case 1 : {
                if (this.iniciaMover) {
                    if (evt.preventDefault) {
                        evt.stopPropagation();
                        evt.preventDefault();
                    }
                    var diferx = tev.clientX - this.xMover;
                    var difery = tev.clientY - this.yMover;
                    var izq = this.form().offsetLeft + diferx;
                    var sup = this.form().offsetTop + difery;
                    this.form().style.left = izq  + "px";
                    this.form().style.top = sup + "px";
                    this.xMover = tev.clientX;
                    this.yMover = tev.clientY;
                }
                break;
            }
            //Paramos el movimiento del formulario
            case 2 : {
                if (wxG.touch && evt.preventDefault) {
                    evt.stopPropagation();
                    evt.preventDefault();
                }
                this.iniciaMover = false;
            }
        }
    } catch(e) {
        //no sacamos nigún mensaje
    }
};



/* Mueve el formulario mediante un marco.
 * Método alternativo a mover todo el formulario.
 * Se trata de mover un marco o rectángulo del mismo tamaño que el formulario y
 * cuando se finaliza el movimiento, poner en ese sitio el propio formulario.
 * - elemento: en las declaraciones de eventos pasamos 'this' para referinos
 *   al elemento que causó el evento, pues puede interferir con el propio
 *   'this' del objeto.
 * - evento: el evento traído como argumento mediante el objeto event.
 */
tempConstructor.prototype.moverMarco = function (event){
    try {
        var evt = event || window.event;
        if (evt.preventDefault) {
            evt.stopPropagation();
            evt.preventDefault();
        }
        var touch = (evt.type.indexOf("touch")>-1);
        var tev;
        if (touch){
            tev = evt.changedTouches[0];
        } else {
            tev = evt;
        }
        var elemento = tev.target || tev.srcElement;
        var marco = this.form("marco");
        var classTag = elemento.className;
        //IE8,9 sólo soporta scrollLeft, Top.
        var wsx = window.scrollX || document.documentElement.scrollLeft;
        var wsy = window.scrollY || document.documentElement.scrollTop;
        //Se inicia el movimiento al detectar onmousedown en la barra o en el título
        if ((evt.type == "mousedown")||(evt.type == "touchstart")){
            if (classTag == (PCL + "form-emerge-titulo")){
                marco.style.left =   (this.form().offsetLeft - wsx) + "px"; ;
                marco.style.top = (this.form().offsetTop - wsy) + "px";
                marco.style.width = this.form().offsetWidth + "px";
                marco.style.height = this.form().offsetHeight + "px";
                marco.style.display = "block";
                this.xMover = tev.clientX;
                this.yMover = tev.clientY;
                this.iniciaMover = true;
            }
        //Movemos el marco cuando el ratón se mueve por el propio marco, un div
        } else if ((evt.type == "mousemove")||(evt.type == "touchmove")) {
            //Para evitar este efecto, sólo se mueve si ha habido un onmousedown anterior
            if (this.iniciaMover) {
                var izq = marco.offsetLeft + tev.clientX - this.xMover;
                var sup = marco.offsetTop + tev.clientY - this.yMover;
                marco.style.left = izq + "px";
                marco.style.top = sup + "px";
                this.xMover = tev.clientX;
                this.yMover = tev.clientY;
            }
        //Cuando en el marco (un div) levantamos el ratón finalizamos el movimiento.
        //Por si nos salimos del marco, también finalizamos. Para IE se usa onmouseout y también
        //onmouseleave pero en Firefox no se usa sino el primero.
        } else if ((evt.type == "mouseup")||(evt.type == "mouseout")||(evt.type == "mouseleave")||
                (evt.type == "touchend")||(evt.type == "touchleave")) {
            if (this.iniciaMover){
                this.iniciaMover = false;
                this.form().style.left =  (marco.offsetLeft + wsx) + "px";
                this.form().style.top =  (marco.offsetTop + wsy) + "px";
                marco.style.display = "none";
            }
        }
    } catch(e) {
        //no sacamos nigún mensaje pero desactivamos el marco
        this.form("marco").style.display = "none";
    }
};


/* Trae al frente el formulario sobre el que se hace click.
 * Se ejecuta al hacer click en la barra de cabecera y también
 * al final del método abrir().
 */
tempConstructor.prototype.traerAlFrente = function (event) {
    try {
        //Este método viene de eventos mousedown, up, move y touchstart, end y move.
        //Pero también viene sin eventos, desde el método abrir con traerAlFrente().
        //Hay que detectar si no está definido entonces viene sin eventos.
        var evt = event || window.event;
        var touch = false, tev;
        if (evt != undefined) {
            touch = (evt.type.indexOf("touch")>-1);
            if (touch){
                tev = evt.changedTouches[0];
            } else {
                tev = evt;
            }
        }
        //Sólo traemos al frente si hay más de un formulario abierto
        if (formsAbiertos>1){
            //Vuelve a poner estilo z-index al zIndexBase del objeto y luego
            //al actual le suma 100000 para traerlo al frente
            for (var i=0, maxi=forms.length; i<maxi; i++) {
                var zi = forms[i].zIndexBase;
                var nombre = forms[i].nombre;
                if (forms[i].nombre == this.nombre) zi += 100000;
                if (forms[i].form()){
                    forms[i].form().style.zIndex = zi;
                }
            }
        }
        //Para móviles con mover todo si hacemos un touchend sobre la barra del
        //título primero viene aquí a traer al frente y luego lo enviamos a moverTodo()
        if (touch && (evt.type == "touchend") &&
            (this.mover=="todo") && (tev.target.id) &&
            (tev.target.id==(PID + this.nombre + "Titulo"))) {
            this.moverTodo(2, event);
        }
    } catch (e) {
        alert("Error al traer al frente " + this.nombre + ": " + e.message);
    }
};


/* Al actuar sobre los dos botones inferiores variamos el font-size del DIV
 * que contiene el cuerpo interior del formulario adaptándose, pero se debe
 * aplicar el método abrir() pasando en argumento ancho en em's para que se
 * ajuste.
 */
tempConstructor.prototype.dimensionar = function(masMenos) {
    try {
        //En lugar de recuperar el valor del estilo font-size lo hacemos de
        //un atributo data-font-size que inicialmente tiene valor 1, valor
        //relativo en em's
        var fs = parseFloat(this.form("Interior").getAttribute("data-font-size"));
        fs = fs + masMenos * 0.2;
        //0.4em serán 6px
        if (fs<0.4) fs = 0.4;
        //2em serán 32px
        if (fs>2) fs = 2;
        this.form("Interior").setAttribute("data-font-size", fs);
        this.form("Interior").style.fontSize = fs + "em";
    } catch(e) {}
};


/* Cierra todos los formularios accediendo al método en el closure
 */
tempConstructor.prototype.cerrarFormulario = function(){
    cerrarFormularios();
};

/* Obtener los prefijos (son variables locales y no pueden
 * verse ni modificarse desde fuera). Con esto las vemos.
 */
tempConstructor.prototype.getPID = function(){
    return PID;
};
tempConstructor.prototype.getPCL = function(){
    return PCL;
};

//Prefijamos user-select y opacity para IE8 (ver pantalla)
wxG.prefijarCss(["user-select", "opacity"]);

//Si redimensionamos la ventana, los formularios abiertos se cierran
//pues se cambian de posición y resulta desconcertante pues no sabemos
//si están o no abiertos al trasladarse lejos de su posición. Sólo es
//necesario actuar sobre el ancho de la ventana. En el método abrir()
//hemos guardado bodyWidth con el tamaño de la ventana en ese momento.
window.onresize = function(){
    if (formsAbiertos>0){
        if (document.body.clientWidth != bodyWidth){
            for (var i=0, maxi=forms.length; i<maxi; i++){
                if (forms[i].abierto) forms[i].cerrar();
            }
        }
    }
};

//RETORNAMOS EL CONSTRUCTOR
return tempConstructor;
})(); //cierra el módulo

}; //cierra el Wextensible

