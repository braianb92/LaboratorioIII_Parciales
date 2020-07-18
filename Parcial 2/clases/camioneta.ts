namespace Entity{
    
    export class Camioneta extends Vehiculo{
    
        public cuatroXcuatro:string;

        constructor(id:number,marca:string,modelo:string,precio:number,cuatroXcuatro:string){
            super(id,marca,modelo,precio);
            this.cuatroXcuatro = cuatroXcuatro;
        }

    
    }
}
