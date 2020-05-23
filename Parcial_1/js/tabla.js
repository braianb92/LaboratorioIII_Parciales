import {capitalize} from './funcionesGenericas.js';

//Tabla dinamica que arma la cabecera y los datos. No muestra valor ID.
//Recibe un array de objetos json, el id del header y el id del body de la tabla.
//Recibe un string con el tipo de addEventListener y la funcion a ejecutar por el.
function tablaDinamica(objects,tablaHeaderId,tablaBodyId,addEventListener,foo){
    //Recupero el header y el body de la tabla ya posicionada en el HTML.
    var tableHeader = document.getElementById(tablaHeaderId);
    var tableBody = document.getElementById(tablaBodyId);

    //Tomo las propiedades del primer objeto que llega como parametro.
    //Seran usadas como los Headers de cada columna.
    var propiedades = Object.getOwnPropertyNames(objects[0]);

    //Creacion del header.
    var headerRow = document.createElement('tr');
    propiedades.forEach(element => {
        
        var th = document.createElement('th');
        //Si viene una propiedad id esta no sera visible.
        th.hidden = (element.toLowerCase() === 'id')? true : false;
        th.appendChild(document.createTextNode(capitalize(element)));
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    //Creacion de grilla de datos.
    for (let i = 0; i < objects.length; i++) {
        var row = document.createElement('tr');

        for (let j = 0; j < propiedades.length; j++) {
            var td = document.createElement('td');
            //Los datos id no seran visibles.
            td.hidden = (propiedades[j].toLowerCase() === 'id')? true : false;
            //Todas los TD tendran un atributo nombre que sera el mismo a la columna a la que pertenecen.
            td.setAttribute('name',propiedades[j].toLocaleLowerCase());
            td.appendChild(document.createTextNode(objects[i][propiedades[j]]));
            row.appendChild(td);
        }
        
        row.addEventListener(addEventListener,foo);
        tableBody.appendChild(row);
    } 
}

//Funcion que remueve un TD de la tabla.
//Recibe id de elemento a remover y id del body de la tabla.
function removeTD(id,tableBodyId){
    var tableBody = document.getElementById(tableBodyId);
    
    tableBody.childNodes.forEach(tr => {

        if(tr.firstChild.innerText == id){
            tr.remove();
        }
    });
}

//Funcion que actualiza un TD de la tabla.
//Recibe objeto json y id del body de la tabla.
function updateTD(json,tableBodyId){
    var tableBody = document.getElementById(tableBodyId);
    var properties = Object.getOwnPropertyNames(json);
    
    tableBody.childNodes.forEach(tr => {

        if(tr.firstChild.innerText == json.id){
           
            for (let i = 0; i < tr.childNodes.length; i++) {
                tr.childNodes[i].innerText = json[properties[i]];
            }     
        }
    });
}

export {tablaDinamica,removeTD,updateTD};