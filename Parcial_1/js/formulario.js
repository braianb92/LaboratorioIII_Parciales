//Formulario Dinamico
//El parametro formularioId debe existir en el HTML.
//Tanto los inputs como los botones por parametro deberan ser un objeto JSON.
//Los inputs seran representados como {nombre:tipo}. Los botones como {texto:id}.
//Todos los inputs tendran su respectivo label.
//El formulario NO ADMITE mas de un grupo de radio buttons.Todos tendran el nombre de radioGroup.
//El formulario creara un DIV en el cual se crearan los botones pasados por parametro.
//El formulario creara un DIV para los labels con los inputs y un DIV aparte para los radio buttons.
//Los divs creados por el fomulario tendran por id el id del formulario + el nombre del div. Ejemplo: div de inputs tendra por id {id de formulario}+Inputs.
//Si recibe un boton con el nombre de X,Close,Cerrar, automaticamente lo reconocera como boton de salida del form y le asignara la funcion de cerrarFormulario.
function crearFormulario(formularioId,jsonInputs,jsonButtons,hidden = false){
    //Recupera formulario.
    var formulario = document.getElementById(formularioId);

    //Crea DIV que apadrinara los botones del formulario.
    var divBotones = document.createElement('div');
    divBotones.setAttribute('id',formularioId+'Botones');

    //Crea DIV que apadrinara los inputs del formulario.
    var divInputs = document.createElement('div');
    divInputs.setAttribute('id',formularioId+'Inputs');

    //Crea DIV que apadrinara los inputs de tipo radio del formulario.
    var divRadios = document.createElement('div');
    divRadios.setAttribute('id',formularioId+'Radios');

    //Muestra/Oculta el formulario segun parametro.
    formulario.hidden = hidden;

    //Recupero los datos recibidos en JSON para los inputs y labels requeridos.
    var labels = Object.getOwnPropertyNames(jsonInputs);
    var types = Object.values(jsonInputs);
    
    //Seccion de Inputs y Labels.
    for (let i = 0; i < labels.length; i++) {

        //Crea un label. Si es Id no se mostrara.
        var label = document.createElement('label');
        label.hidden = (labels[i].toLowerCase() === 'id')? true:false;
        label.appendChild(document.createTextNode(labels[i]));
        
        //Crea un input debajo del label. Si es id no se muestra.  
        var input = (types[i] != 'select')? document.createElement('input') : document.createElement('select');
        input.disabled = (types[i] === 'select')? true:false;
        input.hidden = (labels[i].toLowerCase() === 'id')? true:false;

        //Si es de tipo radio crea el 'radioGroup'.
        var inputName = (types[i] === 'radio')? 'radioGroup' : labels[i].toLowerCase();

        //Aplica atributos id,name y define el tipo del input.
        input.setAttribute('id',labels[i].toLowerCase());
        input.setAttribute('name',inputName);
        input.setAttribute('type',types[i]);

        //Los inputs radio seran hijos del div de radios con sus respectivos labels.
        if(input['type'] === 'radio'){
            divRadios.appendChild(label);
            divRadios.appendChild(input);
            formulario.appendChild(divRadios);
        }
        else{
            label.className = 'formLabel';
            divInputs.appendChild(label);
            divInputs.appendChild(input);
            formulario.appendChild(divInputs);
        }
        
    }

    //Recupero los datos recibidos en JSON para los botones.
    var btnNames = Object.getOwnPropertyNames(jsonButtons);
    var btnIds = Object.values(jsonButtons);

    //Seccion de botones.
    for (let i = 0; i < btnNames.length; i++) {
        //Creo el boton y le asigno el texto en su interior.
        var button = document.createElement('button');
        var text = document.createTextNode(btnNames[i]);
        button.appendChild(text);

        //Aplica atributos de id,name.
        button.setAttribute('name',btnNames[i]);
        button.setAttribute('id',btnIds[i]);
        divBotones.appendChild(button);

        //Si el nombre del boton es x,close,cerrar se tomara al boton como el deseado para cerrar el formulario.
        //Aplicara clase standard 'cerrar', y llevara por nombre 'closeForm'.
        if(button['name'].toLowerCase() === 'x' || button['name'].toLowerCase() === 'close' || button['name'].toLowerCase() === 'cerrar'){
            button.className = 'closeButton';
            button.onclick = function(){cerrarFormulario(formularioId)};
            button.setAttribute('name','closeForm');
            formulario.appendChild(button);
        }
        else{
            divBotones.appendChild(button);
        }

    }

    formulario.appendChild(divBotones);

    //Seteo la validacion de todos los inputs del formulario.
    validar(formularioId);
}

//Funcion que obtiene los inputs de un formulario. Radios excluidos.
function obtenerInputs(formularioId){
    var divInputs = document.getElementById(formularioId+'Inputs');  
    var inputs = [];

    if(divInputs.hasChildNodes)
    {
        divInputs.childNodes.forEach(element => {
            if(element['tagName'].toLowerCase() === 'input' && element['type'] != 'radio'){
                inputs.push(element);
            } 
        });
    }
    
    return inputs;
}

//Funcion que obtiene los radio buttons de un formulario.
function obtenerRadios(formularioId){
    var divRadios = document.getElementById(formularioId+'Radios');
    
    var radios = [];

    if(divRadios.hasChildNodes)
    {
        divRadios.childNodes.forEach(element => {
            if(element['type'] == 'radio'){
                radios.push(element);
            }  
        });
    }

    return radios;
}

//Funcion que obtiene los inputs de un formulario. Radios excluidos.
function obtenerSelects(formularioId){
    var divInputs = document.getElementById(formularioId+'Inputs');  
    var selects = [];

    if(divInputs.hasChildNodes)
    {
        divInputs.childNodes.forEach(element => {
            if(element['tagName'].toLowerCase() === 'select'){
                selects.push(element);
            } 
        });
    }
    
    return selects;
}

//Funcion que mostrara el formulario.
//Recibe id del formulario a mostrar, la clase a aplicarle y la clase que se aplicara a cada boton.
//Se asignaran clases de tipo 'responsive' a cada div. Ver /css/custom.css
function mostrarFormulario(formularioId,formularioClass,btnUpdateClass,btbDeleteClass){
    var formulario = document.getElementById(formularioId);
    var divInputs = document.getElementById(formularioId+'Inputs');
    var divBotones = document.getElementById(formularioId+'Botones');
    var divRadios = document.getElementById(formularioId+'Radios');

    formulario.className = formularioClass;
    divInputs.className = 'inputsGroup';
    divRadios.className = 'radioGroup';
    divBotones.className = 'botonesGroup';

    
    if(divBotones.hasChildNodes){
        divBotones.childNodes.forEach(element => {
            element.className = (element['id'] === 'btnUpdate')? btnUpdateClass:btbDeleteClass;
        });
    }
    
    formulario.hidden = false;
}

//Funcion que cerrara el formulario.
function cerrarFormulario(formularioId){
    var formulario = document.getElementById(formularioId);

    formulario.hidden = true;
    formulario.removeAttribute('class');
}

//Funcion que aplica validacion de inputs en propiedad 'onchange'-
function validar(formularioId){
    var inputs = obtenerInputs(formularioId);

    inputs.forEach(element => {
        
        if(element['type'] === 'text'){
            
            element.onchange = function(){
                element.className = (element.value.length < 6)? 'error':'';
            };
        }
        else if(element['type'] === 'number'){

            element.onchange = function(){
                element.className = (element.value >= 0)? 'error':'';
            };
        }
        else if(element['type'] === 'date'){
            element.onchange = function(){
 
                element.className = (Date.parse(element.value) > Date.now())? 'error':'';
            };
        }
    });
}

export {mostrarFormulario,cerrarFormulario,crearFormulario,obtenerInputs,obtenerRadios,obtenerSelects};
