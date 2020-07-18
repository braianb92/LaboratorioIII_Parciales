var Entity;
(function (Entity) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, marca, modelo, precio) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        return Vehiculo;
    }());
    Entity.Vehiculo = Vehiculo;
})(Entity || (Entity = {}));
