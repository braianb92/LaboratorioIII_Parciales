namespace MisFunciones{

    var tablaVehiculo:HtmlComponents.Tabla;
    var listaVehiculos:any[];

    window.onload = function(){

        listaVehiculos = [{'id':1,'marca':'Audi','modelo':'A7','precio':100000,'cantidadPuertas':5},{'id':2,'marca':'Dodge','modelo':'RAM','precio':900000,'cuatroXcuatro':'4x4'}]
        inicializarTabla(listaVehiculos);

        let filtroTipo = document.getElementById('filtroTipo');
        filtroTipo.onchange = filtrarTabla;

        let checkId = document.getElementById('checkid');
        let checkMarca = document.getElementById('checkmarca');
        let checkModelo = document.getElementById('checkmodelo');
        let checkPrecio = document.getElementById('checkprecio');
        let checkTipo = document.getElementById('checktipo');

        checkId.onchange = filtroCheckbox;
        checkMarca.onchange = filtroCheckbox;
        checkModelo.onchange = filtroCheckbox;
        checkPrecio.onchange = filtroCheckbox;
        checkTipo.onchange = filtroCheckbox;
        
    }

    function inicializarTabla(data?:Entity.Vehiculo[]){
        tablaVehiculo = new HtmlComponents.Tabla('tablaVehiculo');
        let listaVehiculos = (data === undefined)? []:data;
        tablaVehiculo.createTable(listaVehiculos,['Id','Marca','Modelo','Precio','Tipo','Accion']);
        tablaVehiculo.setTableClass('tabla');

        filtrarTabla();
        setRemoveButton();   
    }

    function setRemoveButton(){

        let datos = tablaVehiculo.getTableData();

        for (let i = 0; i < datos.length; i++) {
            let buttonId = datos[i]['id'];
            let button = document.getElementById(buttonId);
            button.onclick = function(){
                tablaVehiculo.removeFromId(datos[i]['id']);
                filtrarTabla();
            }
            
        }
    }

    function filtroCheckbox(){
        let idsTd = document.getElementsByName('id');
        let marcasTd = document.getElementsByName('marca');
        let modelosTd = document.getElementsByName('modelo');
        let preciosTd = document.getElementsByName('precio');
        let tiposTd = document.getElementsByName('tipo');

        let id = document.getElementById('checkid');
        let marca = document.getElementById('checkmarca');
        let modelo = document.getElementById('checkmodelo');
        let precio = document.getElementById('checkprecio');
        let tipo = document.getElementById('checktipo');
        
        let columnaId = document.getElementById('trId');
        let colMarca = document.getElementById('trMarca');
        let colModelo = document.getElementById('trModelo');
        let colPrecio = document.getElementById('trPrecio');
        let colTipo = document.getElementById('trTipo');

        columnaId.hidden = !id.checked;
        colMarca.hidden = !marca.checked;
        colModelo.hidden = !modelo.checked;
        colPrecio.hidden = !precio.checked;
        colTipo.hidden = !tipo.checked;


        idsTd.forEach(element => {
            element.hidden = !id.checked;
        });

        marcasTd.forEach(element => {
            element.hidden = !marca.checked;
        });

        modelosTd.forEach(element => {
            element.hidden = !modelo.checked;
        });

        preciosTd.forEach(element => {
            element.hidden = !precio.checked;
        });

        tiposTd.forEach(element => {
            element.hidden = !tipo.checked;
        });   
        
    }

    function filtrarTabla(){
        let filtroTipo = document.getElementById('filtroTipo').value;
        let promedio = document.getElementById('promedioPrecio');

        listaVehiculos = tablaVehiculo.getTableData();

        if(filtroTipo === 'Auto'){
            let autos = listaVehiculos.filter(vehiculo => vehiculo['cantidadPuertas']);
            tablaVehiculo.updateTable(autos)

            let precioTotal = autos.reduce(function(valorInicial,auto){
                return valorInicial+=auto.precio;
            },0);

            promedio.value = precioTotal/autos.length;
        }
        else if(filtroTipo === 'Camioneta'){
            let camionetas = listaVehiculos.filter(vehiculo => vehiculo['cuatroXcuatro']);
            tablaVehiculo.updateTable(camionetas)

            let precioTotal = camionetas.reduce(function(valorInicial,camioneta){
                
                return valorInicial+=camioneta.precio;
            },0);

            promedio.value = precioTotal/camionetas.length;
        }
        else{
            tablaVehiculo.updateTable(listaVehiculos);

            let precioTotal = listaVehiculos.reduce(function(valorInicial,vehiculo){
                return valorInicial+=vehiculo.precio;
            },0);

            promedio.value = precioTotal/listaVehiculos.length;
            
        }
    }
   
    export class FormularioVehiculo{

        public static formularioVehiculo(){

            const formId = 'formVehiculo';
            let formularioVehiculo = new HtmlComponents.Formulario(formId);
            const formInputs = {'Id':'number','Marca':'text','Modelo':'text','Precio':'number','Tipo':'select'};
            const formButtons = {'Agregar':formId+'btnAgregar','X':'closeFormVehiculo'};

            formularioVehiculo.createForm(formInputs,formButtons,'centro formulario');
            formularioVehiculo.setSelectOptions(formId+'tipo',['Auto','Camioneta']);

            formularioVehiculo.setDivButtonsClass('botonesGroup');
            formularioVehiculo.setFormButtonsClass('blueButton');
            formularioVehiculo.setDivInputsClass('inputsGroup');
            formularioVehiculo.setDivRadiosClass('radioGroup');
            formularioVehiculo.setFormCloseButton('closeButton');
            formularioVehiculo.setFormLabelsClass('formLabel');
  
            //Muestra formulario
            let btnAdd = document.getElementById('btnAddVehiculo');
            btnAdd.onclick = function(){
                formularioVehiculo.showForm();
            
            }

            //Boton cerrar el formulario
            let closeButton = document.getElementById('closeFormVehiculo');
            closeButton.onclick = function(){
                formularioVehiculo.closeForm();
            }

            //Agrega un Vehiculo a la tabla
            let btnAgregar = document.getElementById(formId+'btnAgregar');
            btnAgregar.onclick = function(){

                let datos = tablaVehiculo.getTableData();

                let id:number = datos.reduce(function(valorInicial,vehiculo){
                    return valorInicial = vehiculo.id + 1;
                },1)

                let marca:string = document.getElementById(formId+'marca').value;
                let modelo:string = document.getElementById(formId+'modelo').value;
                let precio:number = document.getElementById(formId+'precio').value;
                let tipo = document.getElementById(formId+'tipo').value;

                if(tipo === 'Auto'){
                    let auto = new Entity.Auto(id,marca,modelo,precio,5);
                    tablaVehiculo.addToTable(auto);
                }
                else if(tipo === 'Camioneta'){
                    let camioneta = new Entity.Camioneta(id,marca,modelo,precio,'4x4');
                    tablaVehiculo.addToTable(camioneta);
                }
                filtrarTabla();

            }

        }

    }
}