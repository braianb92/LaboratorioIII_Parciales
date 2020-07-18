var HtmlComponents;
(function (HtmlComponents) {
    var Tabla = /** @class */ (function () {
        function Tabla(tableId) {
            this.IdTable = tableId;
            this.Table = document.getElementById(this.IdTable);
            this.TableData = [];
            this.TableHeaders = [];
        }
        //Aplica clase CSS a la tabla.
        Tabla.prototype.setTableClass = function (cssClass) {
            this.Table.className = cssClass;
        };
        //Retorna los headers.
        Tabla.prototype.getTableHeader = function () {
            return this.PropertyNames;
        };
        //Retorna los datos de la tabla en un array.
        Tabla.prototype.getTableData = function () {
            return this.TableData;
        };
        //Setea un AddEventListner a cada fila.
        Tabla.prototype.setAddEventListener = function (type, foo) {
            var rows = this.getTablaBodyRows();
            rows.forEach(function (row) {
                row.addEventListener(type, foo);
            });
        };
        Tabla.prototype.getTablaBodyRows = function () {
            var tableBodyRows = [];
            this.Tbody.childNodes.forEach(function (tr) {
                tableBodyRows.push(tr);
            });
            return tableBodyRows;
        };
        //Agrega un elemento a la tabla
        Tabla.prototype.addToTable = function (data) {
            this.createTableDataRow(data);
        };
        //Elimina elemento de la tabla y actualiza
        Tabla.prototype.removeFromTable = function (data) {
            var propNames = Object.getOwnPropertyNames(data);
            var newData = this.TableData.filter(function (element) {
                for (var i = 0; i < propNames.length; i++) {
                    if (element[propNames[i]] != data[propNames[i]]) {
                        return element;
                    }
                }
            });
            this.TableData = newData;
            this.updateTable(this.TableData);
        };
        Tabla.prototype.removeFromId = function (elementId) {
            var newData = this.TableData.filter(function (element) {
                return element.id != elementId;
            });
            this.TableData = newData;
            this.updateTable(this.TableData);
        };
        //Reemplaza los datos de la tabla con los nuevos pasados por parametro.
        Tabla.prototype.updateTable = function (data) {
            this.Tbody.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                var row = document.createElement('tr');
                var propNames = Object.getOwnPropertyNames(data[i]);
                for (var j = 0; j < propNames.length; j++) {
                    var td = document.createElement('td');
                    td.setAttribute('name', propNames[j].toLowerCase());
                    //Agrego el valor del objeto
                    td.appendChild(document.createTextNode(data[i][propNames[j]]));
                    row.appendChild(td);
                }
                row.appendChild(this.createActionButton(data[i]));
                this.Tbody.appendChild(row);
            }
        };
        //Tabla dinamica que arma la cabecera y los datos. No muestra valor ID.
        Tabla.prototype.createTable = function (data, customHeaders) {
            this.Thead = document.createElement('thead');
            this.Thead.setAttribute('id', this.IdTable + 'Thead');
            this.Tbody = document.createElement('tbody');
            this.Tbody.setAttribute('id', this.IdTable + 'Tbody');
            this.Table.appendChild(this.Thead);
            //Tomo las propiedades del primer objeto que llega como parametro o los headers que le pasemos.
            //Seran usadas como los Headers de cada columna.
            (customHeaders === undefined) ? this.PropertyNames = Object.getOwnPropertyNames(data[0]) : this.PropertyNames = customHeaders;
            //Creacion del header.
            this.createTableHeaders(this.PropertyNames);
            //Creacion de grilla de datos.
            for (var i = 0; i < data.length; i++) {
                this.createTableDataRow(data[i]);
            }
            this.Table.appendChild(this.Tbody);
        };
        //Crea la fila para los Headers.
        Tabla.prototype.createTableHeaders = function (headerNames) {
            var _this = this;
            var headerRow = document.createElement('tr');
            headerNames.forEach(function (hName) {
                var th = document.createElement('th');
                th.setAttribute('id', 'tr' + hName);
                th.appendChild(document.createTextNode(_this.capitalize(hName)));
                _this.TableHeaders.push(th);
                headerRow.appendChild(th);
            });
            this.Thead.appendChild(headerRow);
        };
        //Crea una row y los td segun el dato pasado por parametro.
        Tabla.prototype.createTableDataRow = function (object) {
            var row = document.createElement('tr');
            var propNames = Object.getOwnPropertyNames(object);
            for (var i = 0; i < propNames.length; i++) {
                var td = document.createElement('td');
                td.setAttribute('name', 'td' + propNames[i].toLowerCase());
                //Agrego el valor del objeto
                td.appendChild(document.createTextNode(object[propNames[i]]));
                row.appendChild(td);
            }
            //Agrega boton de accion
            row.appendChild(this.createActionButton(object));
            this.TableData.push(object);
            this.Tbody.appendChild(row);
        };
        //Boton que remueve un elemento de la tabla.
        Tabla.prototype.createActionButton = function (object) {
            var actionButtonTD = document.createElement('td');
            var removeButton = document.createElement('button');
            removeButton.innerText = 'Eliminar';
            removeButton.setAttribute('id', object.id);
            removeButton.className = 'redButton';
            actionButtonTD.appendChild(removeButton);
            return actionButtonTD;
        };
        Tabla.prototype.capitalize = function (word) {
            return word[0].toUpperCase() + word.slice(1);
        };
        ;
        return Tabla;
    }());
    HtmlComponents.Tabla = Tabla;
})(HtmlComponents || (HtmlComponents = {}));
