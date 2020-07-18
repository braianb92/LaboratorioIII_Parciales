namespace HtmlComponents{
    export class Formulario{

        public Id:string;
        public Form:any;
    
        public DivBotones:any;
        public DivInputs:any;
        public DivRadios:any;
    
        public FormButtons:any[];
        public FormLabels:any[]
        public FormInputs:any[];
        public FormRadioInputs:any[]
        public FormCloseButton:any;
    
        private CssClass:string;
        private Labels:string[];
        private Types:string[];
        private ButtonNames:string[];
        private ButtonIds:string[];
    
        constructor(id:string){
            this.Id = id;
            this.Form = document.getElementById(this.Id);
            this.FormLabels = [];
            this.FormButtons = [];
            this.FormInputs = [];
            this.FormRadioInputs = [];
        }
    
        //Funcion que cerrara el formulario.
        public closeForm(){           
            this.Form.hidden = true;
            this.Form.removeAttribute('class');
        }
    
        //Muestra el Formulario
        public showForm(){
            this.Form.hidden = false;
            this.Form.className = this.CssClass;
        }
    
        //Setea la clase CSS del Formulario
        public setFormClass(cssClass:string){
            this.Form.className = cssClass;
        }
    
        //Aplica una clase CSS a todos los botones.
        public setFormButtonsClass(cssClass:string){
            this.FormButtons.forEach(element => {
                element.className = cssClass;
            });
        }
    
        //Aplica una clase CSS a todos los labels.
        public setFormLabelsClass(cssClass:string){
            this.FormLabels.forEach(element => {
                element.className = cssClass;
            });
        }
    
        //Aplica una clase CSS a todos los Inputs.
        public setFormInputsClass(cssClass:string){
            this.FormInputs.forEach(element => {
                element.className = cssClass;
            });
        }
    
        //Aplica una clase CSS a todos los radios.
        public setFormRadiosClass(cssClass:string){
            this.FormRadioInputs.forEach(element => {
                element.className = cssClass;
            });
        }
    
        //Aplica una clase CSS al div contenedor de Radios.
        public setFormCloseButton(cssClass:string){
            this.FormCloseButton.className = cssClass;
        }
    
        //Aplica una clase CSS al div contenedor de botones.
        public setDivButtonsClass(cssClass:string){
            this.DivBotones.className = cssClass;
        }
    
        //Aplica una clase CSS al div contenedor de Inputs.
        public setDivInputsClass(cssClass:string){
            this.DivInputs.className = cssClass;
        }
    
        //Aplica una clase CSS al div contenedor de Radios.
        public setDivRadiosClass(cssClass:string){
            this.DivRadios.className = cssClass;
        }
    
        //Setea los labels de los inputs
        private setLabels(jsonInputs){
            this.Labels =  Object.getOwnPropertyNames(jsonInputs);
        }
    
        //Setea los tipos de los inputs
        private setTypes(jsonInputs){
            this.Types = Object.keys(jsonInputs).map(key => jsonInputs[key]);
        }
    
        //Setea los nombres de los botones
        private setButtonNames(jsonButtons){
            this.ButtonNames = Object.getOwnPropertyNames(jsonButtons);
        }
    
        //Setea los ids de los botones
        private setButtonIds(jsonButtons){
            this.ButtonIds = Object.keys(jsonButtons).map(key => jsonButtons[key]);
        }
    
        //Chequea si el valor pasado por parametro hace referencia a un id.
        private isIdField(string:any){
            return (string.toLowerCase() === 'id')? true:false;
        }
    
        //Metodo principal que crea el formulario.
        //Recibe json de inputs, json de botones y clase CSS de formulario general.
        public createForm(jsonInputs,jsonButtons,cssClass){
    
            this.CssClass = cssClass;
            //Aplico clase CSS
            this.Form.className = cssClass;
    
            //Seteo los Labels y Tipos recibidos en JSON para los inputs y labels requeridos.
            this.setLabels(jsonInputs);
            this.setTypes(jsonInputs);
    
            //Seteo los datos recibidos en JSON para los botones.
            this.setButtonNames(jsonButtons);
            this.setButtonIds(jsonButtons);
    
            //Setea DIV que apadrinara los botones del formulario.
            this.DivBotones = document.createElement('div');
            this.DivBotones.setAttribute('id',this.Id+'Botones');
    
            //Setea DIV que apadrinara los inputs del formulario.
            this.DivInputs = document.createElement('div');
            this.DivInputs.setAttribute('id',this.Id+'Inputs');
    
            //Setea DIV que apadrinara los inputs de tipo radio del formulario.
            this.DivRadios = document.createElement('div');
            this.DivRadios.setAttribute('id',this.Id+'Radios');
    
            //Inputs & Labels.
            for (let i = 0; i < this.Labels.length; i++) {
                
                var label = this.createLabel(this.Labels[i]);
                var input = this.createInput(this.Labels[i],this.Types[i]);
                this.appendInputElement(input,label);        
            }
    
            //Botones
            for (let i = 0; i < this.ButtonNames.length; i++) {
    
                var button = this.createButton(this.ButtonNames[i],this.ButtonIds[i]);
                (button['name'] === 'closeForm')? this.Form.appendChild(button) : this.DivBotones.appendChild(button);          
            }
    
            this.Form.appendChild(this.DivBotones);
        }
    
        //Crea el boton y lo agrega al array correspondiente.
        private createButton(buttonName:string,buttonId:string){
            //Creo el boton y le asigno el texto en su interior.
            var button = document.createElement('button');
            var text = document.createTextNode(buttonName);
            button.appendChild(text);
    
            //Aplica atributos de id,name.
            button.setAttribute('name',buttonName);
            button.setAttribute('id',buttonId);
            this.DivBotones.appendChild(button);
    
            //Si el nombre del boton es x,close,cerrar se tomara al boton como el deseado para cerrar el formulario.
            if(button['name'].toLowerCase() === 'x' || button['name'].toLowerCase() === 'close' || button['name'].toLowerCase() === 'cerrar'){
                button.setAttribute('name','closeForm');
            }
    
            //Lo agrego a la lista de Botones.
            if(button['name'] === 'closeForm'){
                this.FormCloseButton = button; 
                this.FormCloseButton.onclick = this.closeForm;
            }
            else{
                this.FormButtons.push(button);
            }
    
            return button;
        }

        //Crea un label y lo agrega al array.
        private createLabel(label:string){
                //Crea un label. 
                var lbl = document.createElement('label');
                // lbl.hidden = this.isIdField(label);
                lbl.appendChild(document.createTextNode(label));
    
                //Lo agrego a la lista de Labels.
                this.FormLabels.push(lbl);
    
                return lbl;
        }
    
        public setSelectOptions(idSelect:string,optionValues:string[]){
            let select = document.getElementById(idSelect);

            optionValues.forEach(value => {
                var optionHTML = document.createElement('option');
                optionHTML.setAttribute('value',value);
                optionHTML.appendChild(document.createTextNode(value));
                select.appendChild(optionHTML);
    });
        }

        //Crea un input y lo agrega al array.
        private createInput(label:string,type:string){
            //Crea un input debajo del label. Si es id queda desabilitado.  
            var input = (type != 'select')? document.createElement('input') : document.createElement('select');
            input.disabled = this.isIdField(label);
    
            //Si es de tipo radio crea el 'radioGroup'.
            var inputName = (type === 'radio')? 'radioGroup' : label.toLowerCase();
    
            //Aplica atributos id,name y define el tipo del input.
            input.setAttribute('id',this.Id+label.toLowerCase());
            input.setAttribute('name',inputName);
            input.setAttribute('type',type);
    
            //Lo agrego a la lista de Inputs.
            (input['type'] === 'radio')?this.FormRadioInputs.push(input) : this.FormInputs.push(input);
    
            return input;
        }
    
        //Agrega un elemento input al div correspondiente y al form.
        private appendInputElement(input:any,label:any){    
            //Los inputs radio seran hijos del div de radios con sus respectivos labels.
            if(input['type'] === 'radio'){
                this.DivRadios.appendChild(label);
                this.DivRadios.appendChild(input);
                this.Form.appendChild(this.DivRadios);
            }
            //Los inputs seran hijos del div de Inputs con sus respectivos labels.
            else{
                this.DivInputs.appendChild(label);
                this.DivInputs.appendChild(input);
                this.Form.appendChild(this.DivInputs);
            }
        }
    }
    
    
}
