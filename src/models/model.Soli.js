import mongoose from 'mongoose';
const soliSchema = new mongoose.Schema({
    nombredelsolicitante: String,
    userid: String,
    folio: Number,
    area: String,
    fechadesoli:{
        type: String,
        default: () => new Date().toISOString().substr(0, 10)
      },
    fechadeefect:{
        type: String,
        default: () => new Date().toISOString().substr(0, 10)
      },
    razoncambio:String,
    Alcance:Array,
    epytit:String,
    cambiod:String,
    cambioa:String,
    capacitacion:String,
    capacitaciondesc:String,
    evaluacion:String,
    evaluaciondesc:String,
    porqueno:String,
    requericalif:String,
    nocalif:Number,
    aprre:String,
    pruebas:String,
    Responsablemod:String,
    fechaini:{
        type: String,
        default: () => new Date().toISOString().substr(0, 10)
      },
    fechater:{
        type: String,
        default: () => new Date().toISOString().substr(0, 10)
      },
      estado:Array,
      archivo:Buffer
});
  
export default mongoose.model('soli', soliSchema);
