import mongoose from 'mongoose';
const soliSchema = new mongoose.Schema({
    nombredelsolicitante: String,
    folio: Number,
    area: String,
    fechadesoli:Number,
    fechadeefect:Number,
    razoncambio:String,
    Alcance:String,
    epytit:String,
    cambiod:String,
    cambioa:String,
    capcitacion:String,
    evaluacion:String,
    porqueno:String,
    requericalif:String,
    nocalif:Number,
    aprre:String,
    pruebas:String,
    Responsablemod:String,
    fechaini:Number,
    fechater:Number
});
  
export default mongoose.model('soli', soliSchema);
