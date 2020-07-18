var MisFunciones;
(function (MisFunciones) {
    var tablaVehiculo;
    var listaVehiculos;
    window.onload = function () {
        listaVehiculos = [{ 'id': 1, 'marca': 'Audi', 'modelo': 'A7', 'precio': 100000, 'cantidadPuertas': 5 }, { 'id': 2, 'marca': 'Dodge', 'modelo': 'RAM', 'precio': 900000, 'cuatroXcuatro': '4x4' }];
        inicializarTabla(listaVehiculos);
        var filtroTipo = document.getElementById('filtroTipo');
        filtroTipo.onchange = filtrarTabla;
        var checkId = document.getElementById('checkid');
        var checkMarca = document.getElementById('checkmarca');
        var checkModelo = document.getElementById('checkmodelo');
        var checkPrecio = document.getElementById('checkprecio');
        var checkTipo = document.getElementById('checktipo');
        checkId.onchange = filtroCheckbox;
        checkMarca.onchange = filtroCheckbox;
        checkModelo.onchange = filtroCheckbox;
        checkPrecio.onchange = filtroCheckbox;
        checkTipo.onchange = filtroCheckbox;
    };
    function inicializarTabla(data) {
        tablaVehiculo = new HtmlComponents.Tabla('tablaVehiculo');
        var listaVehiculos = (data === undefined) ? [] : data;
        tablaVehiculo.createTable(listaVehiculos, ['Id', 'Marca', 'Modelo', 'Precio', 'Tipo', 'Accion']);
        tablaVehiculo.setTableClass('tabla');
        filtrarTabla();
        setRemoveButton();
    }
    function setRemoveButton() {
        var datos = tablaVehiculo.getTableData();
        var _loop_1 = function (i) {
            var buttonId = datos[i]['id'];
            var button = document.getElementById(buttonId);
            button.onclick = function () {
                tablaVehiculo.removeFromId(datos[i]['id']);
                filtrarTabla();
            };
        };
        for (var i = 0; i < datos.length; i++) {
            _loop_1(i);
        }
    }
    function filtroCheckbox() {
        var idsTd = document.getElementsByName('id');
        var marcasTd = document.getElementsByName('marca');
        var modelosTd = document.getElementsByName('modelo');
        var preciosTd = document.getElementsByName('precio');
        var tiposTd = document.getElementsByName('tipo');
        var id = document.getElementById('checkid');
        var marca = document.getElementById('checkmarca');
        var modelo = document.getElementById('checkmodelo');
        var precio = document.getElementById('checkprecio');
        var tipo = document.getElementById('checktipo');
        var columnaId = document.getElementById('trId');
        var colMarca = document.getElementById('trMarca');
        var colModelo = document.getElementById('trModelo');
        var colPrecio = document.getElementById('trPrecio');
        var colTipo = document.getElementById('trTipo');
        columnaId.hidden = !id.checked;
        colMarca.hidden = !marca.checked;
        colModelo.hidden = !modelo.checked;
        colPrecio.hidden = !precio.checked;
        colTipo.hidden = !tipo.checked;
        idsTd.forEach(function (element) {
            element.hidden = !id.checked;
        });
        marcasTd.forEach(function (element) {
            element.hidden = !marca.checked;
        });
        modelosTd.forEach(function (element) {
            element.hidden = !modelo.checked;
        });
        preciosTd.forEach(function (element) {
            element.hidden = !precio.checked;
        });
        tiposTd.forEach(function (element) {
            element.hidden = !tipo.checked;
        });
    }
    function filtrarTabla() {
        var filtroTipo = document.getElementById('filtroTipo').value;
        var promedio = document.getElementById('promedioPrecio');
        listaVehiculos = tablaVehiculo.getTableData();
        if (filtroTipo === 'Auto') {
            var autos = listaVehiculos.filter(function (vehiculo) { return vehiculo['cantidadPuertas']; });
            tablaVehiculo.updateTable(autos);
            var precioTotal = autos.reduce(function (valorInicial, auto) {
                return valorInicial += auto.precio;
            }, 0);
            promedio.value = precioTotal / autos.length;
        }
        else if (filtroTipo === 'Camioneta') {
            var camionetas = listaVehiculos.filter(function (vehiculo) { return vehiculo['cuatroXcuatro']; });
            tablaVehiculo.updateTable(camionetas);
            var precioTotal = camionetas.reduce(function (valorInicial, camioneta) {
                return valorInicial += camioneta.precio;
            }, 0);
            promedio.value = precioTotal / camionetas.length;
        }
        else {
            tablaVehiculo.updateTable(listaVehiculos);
            var precioTotal = listaVehiculos.reduce(function (valorInicial, vehiculo) {
                return valorInicial += vehiculo.precio;
            }, 0);
            promedio.value = precioTotal / listaVehiculos.length;
        }
    }
    var FormularioVehiculo = /** @class */ (function () {
        function FormularioVehiculo() {
        }
        FormularioVehiculo.formularioVehiculo = function () {
            var formId = 'formVehiculo';
            var formularioVehiculo = new HtmlComponents.Formulario(formId);
            var formInputs = { 'Id': 'number', 'Marca': 'text', 'Modelo': 'text', 'Precio': 'number', 'Tipo': 'select' };
            var formButtons = { 'Agregar': formId + 'btnAgregar', 'X': 'closeFormVehiculo' };
            formularioVehiculo.createForm(formInputs, formButtons, 'centro formulario');
            formularioVehiculo.setSelectOptions(formId + 'tipo', ['Auto', 'Camioneta']);
            formularioVehiculo.setDivButtonsClass('botonesGroup');
            formularioVehiculo.setFormButtonsClass('blueButton');
            formularioVehiculo.setDivInputsClass('inputsGroup');
            formularioVehiculo.setDivRadiosClass('radioGroup');
            formularioVehiculo.setFormCloseButton('closeButton');
            formularioVehiculo.setFormLabelsClass('formLabel');
            //Muestra formulario
            var btnAdd = document.getElementById('btnAddVehiculo');
            btnAdd.onclick = function () {
                formularioVehiculo.showForm();
            };
            //Boton cerrar el formulario
            var closeButton = document.getElementById('closeFormVehiculo');
            closeButton.onclick = function () {
                formularioVehiculo.closeForm();
            };
            //Agrega un Vehiculo a la tabla
            var btnAgregar = document.getElementById(formId + 'btnAgregar');
            btnAgregar.onclick = function () {
                var datos = tablaVehiculo.getTableData();
                var id = datos.reduce(function (valorInicial, vehiculo) {
                    return valorInicial = vehiculo.id + 1;
                }, 1);
                var marca = document.getElementById(formId + 'marca').value;
                var modelo = document.getElementById(formId + 'modelo').value;
                var precio = document.getElementById(formId + 'precio').value;
                var tipo = document.getElementById(formId + 'tipo').value;
                if (tipo === 'Auto') {
                    var auto = new Entity.Auto(id, marca, modelo, precio, 5);
                    tablaVehiculo.addToTable(auto);
                }
                else if (tipo === 'Camioneta') {
                    var camioneta = new Entity.Camioneta(id, marca, modelo, precio, '4x4');
                    tablaVehiculo.addToTable(camioneta);
                }
                filtrarTabla();
            };
        };
        return FormularioVehiculo;
    }());
    MisFunciones.FormularioVehiculo = FormularioVehiculo;
})(MisFunciones || (MisFunciones = {}));
