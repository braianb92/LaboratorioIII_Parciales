import {metodoGet,metodoPost} from './requests.js';
import {tablaDinamica,removeTD,updateTD} from './tabla.js';
import {mostrarFormulario, cerrarFormulario, crearFormulario,obtenerRadios,obtenerInputs,obtenerSelects} from './formulario.js';
import {showLoading,capitalize,formatDate} from './funcionesGenericas.js';

//Endpoints.
const getDatos = 'http://localhost:3000/materias ';
const updateDatos = 'http://localhost:3000/editar';
const deleteDatos = 'http://localhost:3000/eliminar';

//Formulario de grilla.
const formInputs = {'Id':'number','Nombre':'text','Cuatrimestre':'select','FechaFinal':'date','Mañana':'radio','Noche':'radio'};
const selectOptions = ['1','2','3','4'];
const formButtons = {'Modificar':'btnUpdate','Eliminar':'btnDelete','X':'closeForm'};

window.onload = function(){

    obtenerDatos();

    //Ver Documentacion.
    crearFormulario('formulario',formInputs,formButtons,true);
    setSelect(selectOptions);

    var btnUpdate = document.getElementById('btnUpdate');
    var btnDelete = document.getElementById('btnDelete');

    btnUpdate.onclick = editar;
    btnDelete.onclick = eliminar;
    
    
}

function setSelect(arrayOpt){
    var select = document.getElementById('cuatrimestre');

    arrayOpt.forEach(optionValue => {
        var optionHTML = document.createElement('option');
        optionHTML.setAttribute('value',optionValue);
        optionHTML.appendChild(document.createTextNode(optionValue));
        select.appendChild(optionHTML);
    });
}

//Peticiones GET reciben objetos.
function obtenerDatos(){
    metodoGet(getDatos,function(objects){
        //Ver Documentacion
        tablaDinamica(objects,'tHeader','tBody','dblclick',desplegarFormularioAlHacerClick);
    });   
}

//Peticiones POST reciben respuesta.
function editar(){
    var json = objectoSeleccionado('formulario');

    json.fechaFinal = formatDate(json.fechaFinal,'-','/');

    metodoPost(updateDatos,json,function(response){

        if(response['type'] === 'error'){
            alert('Error');
        }
        
        
        updateTD(json,'tBody');
        showLoading('loading',false);
    });

    cerrarFormulario('formulario');
    showLoading('loading',true);
    
}

function eliminar(){
    var json = objectoSeleccionado('formulario');

    metodoPost(deleteDatos,json,function(response){

        if(response['type'] === 'error'){
            alert('Error');
        }

        removeTD(json.id,'tBody');
        showLoading('loading',false);
    });

    cerrarFormulario('formulario');
    showLoading('loading',true);
}

function objectoSeleccionado(formularioId){
    var radios = obtenerRadios(formularioId);
    var id = document.getElementById('id');
    var nombre = document.getElementById('nombre');
    var cuatrimestre = obtenerSelects('formulario');
    var fecha = document.getElementById('fechafinal');
    
    var json = {'id':'','nombre':'','cuatrimestre':'','fechaFinal':'','turno':''};


    radios.forEach(element => {
        if(element['checked'] == true){
            json['turno'] = capitalize(element['id']);
        }
    });
    
    json.id = id.value;
    json.nombre = nombre.value;
    json.cuatrimestre = cuatrimestre[0].value;
    json.fechaFinal = fecha.value;
    return json;
    

}

//Funcion que recive evento de click
function desplegarFormularioAlHacerClick(e){

    mostrarFormulario('formulario','centro formulario','greenButton','redButton');
    
    var tr = e.target.parentNode;
    var radios = obtenerRadios('formulario');

    var id = document.getElementById('id');
    var nombre = document.getElementById('nombre');
    var cuatrimestre = obtenerSelects('formulario');
    var fecha = document.getElementById('fechafinal');

    id.value = tr.childNodes[0]['innerText'];
    nombre.value = tr.childNodes[1]['innerText'];
    cuatrimestre[0]['value'] = tr.childNodes[2]['innerText'];
    fecha.value = formatDate(tr.childNodes[3]['innerText'],'/','-');
    
    if(radios.length > 0){
        for (let k = 0; k < radios.length; k++) {
        
            if(tr.lastChild['innerText'].toLowerCase() === radios[k]['id']){
                radios[k]['checked'] = true;
            }
        }
    }
   
    
}

