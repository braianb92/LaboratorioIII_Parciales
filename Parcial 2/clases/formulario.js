var HtmlComponents;
(function (HtmlComponents) {
    var Formulario = /** @class */ (function () {
        function Formulario(id) {
            this.Id = id;
            this.Form = document.getElementById(this.Id);
            this.FormLabels = [];
            this.FormButtons = [];
            this.FormInputs = [];
            this.FormRadioInputs = [];
        }
        //Funcion que cerrara el formulario.
        Formulario.prototype.closeForm = function () {
            this.Form.hidden = true;
            this.Form.removeAttribute('class');
        };
        //Muestra el Formulario
        Formulario.prototype.showForm = function () {
            this.Form.hidden = false;
            this.Form.className = this.CssClass;
        };
        //Setea la clase CSS del Formulario
        Formulario.prototype.setFormClass = function (cssClass) {
            this.Form.className = cssClass;
        };
        //Aplica una clase CSS a todos los botones.
        Formulario.prototype.setFormButtonsClass = function (cssClass) {
            this.FormButtons.forEach(function (element) {
                element.className = cssClass;
            });
        };
        //Aplica una clase CSS a todos los labels.
        Formulario.prototype.setFormLabelsClass = function (cssClass) {
            this.FormLabels.forEach(function (element) {
                element.className = cssClass;
            });
        };
        //Aplica una clase CSS a todos los Inputs.
        Formulario.prototype.setFormInputsClass = function (cssClass) {
            this.FormInputs.forEach(function (element) {
                element.className = cssClass;
            });
        };
        //Aplica una clase CSS a todos los radios.
        Formulario.prototype.setFormRadiosClass = function (cssClass) {
            this.FormRadioInputs.forEach(function (element) {
                element.className = cssClass;
            });
        };
        //Aplica una clase CSS al div contenedor de Radios.
        Formulario.prototype.setFormCloseButton = function (cssClass) {
            this.FormCloseButton.className = cssClass;
        };
        //Aplica una clase CSS al div contenedor de botones.
        Formulario.prototype.setDivButtonsClass = function (cssClass) {
            this.DivBotones.className = cssClass;
        };
        //Aplica una clase CSS al div contenedor de Inputs.
        Formulario.prototype.setDivInputsClass = function (cssClass) {
            this.DivInputs.className = cssClass;
        };
        //Aplica una clase CSS al div contenedor de Radios.
        Formulario.prototype.setDivRadiosClass = function (cssClass) {
            this.DivRadios.className = cssClass;
        };
        //Setea los labels de los inputs
        Formulario.prototype.setLabels = function (jsonInputs) {
            this.Labels = Object.getOwnPropertyNames(jsonInputs);
        };
        //Setea los tipos de los inputs
        Formulario.prototype.setTypes = function (jsonInputs) {
            this.Types = Object.keys(jsonInputs).map(function (key) { return jsonInputs[key]; });
        };
        //Setea los nombres de los botones
        Formulario.prototype.setButtonNames = function (jsonButtons) {
            this.ButtonNames = Object.getOwnPropertyNames(jsonButtons);
        };
        //Setea los ids de los botones
        Formulario.prototype.setButtonIds = function (jsonButtons) {
            this.ButtonIds = Object.keys(jsonButtons).map(function (key) { return jsonButtons[key]; });
        };
        //Chequea si el valor pasado por parametro hace referencia a un id.
        Formulario.prototype.isIdField = function (string) {
            return (string.toLowerCase() === 'id') ? true : false;
        };
        //Metodo principal que crea el formulario.
        //Recibe json de inputs, json de botones y clase CSS de formulario general.
        Formulario.prototype.createForm = function (jsonInputs, jsonButtons, cssClass) {
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
            this.DivBotones.setAttribute('id', this.Id + 'Botones');
            //Setea DIV que apadrinara los inputs del formulario.
            this.DivInputs = document.createElement('div');
            this.DivInputs.setAttribute('id', this.Id + 'Inputs');
            //Setea DIV que apadrinara los inputs de tipo radio del formulario.
            this.DivRadios = document.createElement('div');
            this.DivRadios.setAttribute('id', this.Id + 'Radios');
            //Inputs & Labels.
            for (var i = 0; i < this.Labels.length; i++) {
                var label = this.createLabel(this.Labels[i]);
                var input = this.createInput(this.Labels[i], this.Types[i]);
                this.appendInputElement(input, label);
            }
            //Botones
            for (var i = 0; i < this.ButtonNames.length; i++) {
                var button = this.createButton(this.ButtonNames[i], this.ButtonIds[i]);
                (button['name'] === 'closeForm') ? this.Form.appendChild(button) : this.DivBotones.appendChild(button);
            }
            this.Form.appendChild(this.DivBotones);
        };
        //Crea el boton y lo agrega al array correspondiente.
        Formulario.prototype.createButton = function (buttonName, buttonId) {
            //Creo el boton y le asigno el texto en su interior.
            var button = document.createElement('button');
            var text = document.createTextNode(buttonName);
            button.appendChild(text);
            //Aplica atributos de id,name.
            button.setAttribute('name', buttonName);
            button.setAttribute('id', buttonId);
            this.DivBotones.appendChild(button);
            //Si el nombre del boton es x,close,cerrar se tomara al boton como el deseado para cerrar el formulario.
            if (button['name'].toLowerCase() === 'x' || button['name'].toLowerCase() === 'close' || button['name'].toLowerCase() === 'cerrar') {
                button.setAttribute('name', 'closeForm');
            }
            //Lo agrego a la lista de Botones.
            if (button['name'] === 'closeForm') {
                this.FormCloseButton = button;
                this.FormCloseButton.onclick = this.closeForm;
            }
            else {
                this.FormButtons.push(button);
            }
            return button;
        };
        //Crea un label y lo agrega al array.
        Formulario.prototype.createLabel = function (label) {
            //Crea un label. 
            var lbl = document.createElement('label');
            // lbl.hidden = this.isIdField(label);
            lbl.appendChild(document.createTextNode(label));
            //Lo agrego a la lista de Labels.
            this.FormLabels.push(lbl);
            return lbl;
        };
        Formulario.prototype.setSelectOptions = function (idSelect, optionValues) {
            var select = document.getElementById(idSelect);
            optionValues.forEach(function (value) {
                var optionHTML = document.createElement('option');
                optionHTML.setAttribute('value', value);
                optionHTML.appendChild(document.createTextNode(value));
                select.appendChild(optionHTML);
            });
        };
        //Crea un input y lo agrega al array.
        Formulario.prototype.createInput = function (label, type) {
            //Crea un input debajo del label. Si es id queda desabilitado.  
            var input = (type != 'select') ? document.createElement('input') : document.createElement('select');
            input.disabled = this.isIdField(label);
            //Si es de tipo radio crea el 'radioGroup'.
            var inputName = (type === 'radio') ? 'radioGroup' : label.toLowerCase();
            //Aplica atributos id,name y define el tipo del input.
            input.setAttribute('id', this.Id + label.toLowerCase());
            input.setAttribute('name', inputName);
            input.setAttribute('type', type);
            //Lo agrego a la lista de Inputs.
            (input['type'] === 'radio') ? this.FormRadioInputs.push(input) : this.FormInputs.push(input);
            return input;
        };
        //Agrega un elemento input al div correspondiente y al form.
        Formulario.prototype.appendInputElement = function (input, label) {
            //Los inputs radio seran hijos del div de radios con sus respectivos labels.
            if (input['type'] === 'radio') {
                this.DivRadios.appendChild(label);
                this.DivRadios.appendChild(input);
                this.Form.appendChild(this.DivRadios);
            }
            //Los inputs seran hijos del div de Inputs con sus respectivos labels.
            else {
                this.DivInputs.appendChild(label);
                this.DivInputs.appendChild(input);
                this.Form.appendChild(this.DivInputs);
            }
        };
        return Formulario;
    }());
    HtmlComponents.Formulario = Formulario;
})(HtmlComponents || (HtmlComponents = {}));
