namespace HtmlComponents{

    export class Tabla{

        public IdTable:string;
        public Table:any;
        public Thead:any;
        public Tbody:any;
        public TableData:any[];

        private PropertyNames:string[];
        private TableHeaders:any[];

        constructor(tableId:string){
            this.IdTable = tableId;
            this.Table = document.getElementById(this.IdTable);
            this.TableData = [];
            this.TableHeaders = [];

        }

        //Aplica clase CSS a la tabla.
        public setTableClass(cssClass:string){
            this.Table.className = cssClass;
        }

        //Retorna los headers.
        public getTableHeader():any[]{
            return this.PropertyNames;
        }

        //Retorna los datos de la tabla en un array.
        public getTableData():any[]{
            return this.TableData;
        }

        //Setea un AddEventListner a cada fila.
        public setAddEventListener(type:string,foo:any):void{
            let rows = this.getTablaBodyRows();
            rows.forEach(row => {
                row.addEventListener(type,foo);
            });
        }

        public getTablaBodyRows(){
            let tableBodyRows = [];

            this.Tbody.childNodes.forEach(tr => {
                tableBodyRows.push(tr);
            });

            return tableBodyRows;
        }

        //Agrega un elemento a la tabla
        public addToTable(data:any){
            this.createTableDataRow(data);
        }

        //Elimina elemento de la tabla y actualiza
        public removeFromTable(data:any){
            let propNames = Object.getOwnPropertyNames(data);

            let newData = this.TableData.filter(element => {
                for (let i = 0; i < propNames.length; i++) {
                    
                    if(element[propNames[i]] != data[propNames[i]]){
                        return element;
                    }
                    
                }
            });
            
            this.TableData = newData;
            this.updateTable(this.TableData);
            
        }

        public removeFromId(elementId){

            let newData = this.TableData.filter(element => {
                return element.id != elementId;
            });
            
            this.TableData = newData;
            this.updateTable(this.TableData);
        }

        //Reemplaza los datos de la tabla con los nuevos pasados por parametro.
        public updateTable(data:any[]){
            this.Tbody.innerHTML = "";
                
            for (let i = 0; i < data.length; i++) {

                var row = document.createElement('tr');
                let propNames = Object.getOwnPropertyNames(data[i]);
                
                for (let j = 0; j < propNames.length; j++) {
                    var td = document.createElement('td');
                    td.setAttribute('name',propNames[j].toLowerCase());
                    //Agrego el valor del objeto
                    td.appendChild(document.createTextNode(data[i][propNames[j]]));
                    row.appendChild(td);
                }
                
                row.appendChild(this.createActionButton(data[i]));
                this.Tbody.appendChild(row); 
                
            }      
           
        }

        //Tabla dinamica que arma la cabecera y los datos. No muestra valor ID.
        public createTable(data:any[],customHeaders?:string[]){
            this.Thead = document.createElement('thead');
            this.Thead.setAttribute('id',this.IdTable+'Thead');

            this.Tbody = document.createElement('tbody');
            this.Tbody.setAttribute('id',this.IdTable+'Tbody');

            this.Table.appendChild(this.Thead);
            //Tomo las propiedades del primer objeto que llega como parametro o los headers que le pasemos.
            //Seran usadas como los Headers de cada columna.
            (customHeaders === undefined)?this.PropertyNames = Object.getOwnPropertyNames(data[0]):this.PropertyNames = customHeaders;

            //Creacion del header.
            this.createTableHeaders(this.PropertyNames);
        
            //Creacion de grilla de datos.
            for (let i = 0; i < data.length; i++) {

                this.createTableDataRow(data[i]);
            }

            this.Table.appendChild(this.Tbody);

        } 

        //Crea la fila para los Headers.
        private createTableHeaders(headerNames:string[]):void{
            var headerRow = document.createElement('tr');
            headerNames.forEach(hName => {
                
                var th = document.createElement('th');  
                th.setAttribute('id','tr'+hName);     
                th.appendChild(document.createTextNode(this.capitalize(hName)));
                this.TableHeaders.push(th);
                headerRow.appendChild(th);         
            });

            this.Thead.appendChild(headerRow);  
        }

        //Crea una row y los td segun el dato pasado por parametro.
        private createTableDataRow(object:any):void{

            var row = document.createElement('tr');
            
            let propNames = Object.getOwnPropertyNames(object);
            
            for (let i = 0; i < propNames.length; i++) {
                var td = document.createElement('td');     
                td.setAttribute('name','td'+propNames[i].toLowerCase());
                //Agrego el valor del objeto
                td.appendChild(document.createTextNode(object[propNames[i]]));
                row.appendChild(td);
                
            }

            //Agrega boton de accion
            row.appendChild(this.createActionButton(object));

            this.TableData.push(object);
            this.Tbody.appendChild(row);             
        }

        //Boton que remueve un elemento de la tabla.
        private createActionButton(object:any){
            let actionButtonTD = document.createElement('td');
            let removeButton = document.createElement('button');
            removeButton.innerText = 'Eliminar';
            removeButton.setAttribute('id',object.id);
            removeButton.className = 'redButton';

            actionButtonTD.appendChild(removeButton);
            return actionButtonTD;
        }

        private capitalize(word:string):string {
            return word[0].toUpperCase() + word.slice(1);
          };
    }


}