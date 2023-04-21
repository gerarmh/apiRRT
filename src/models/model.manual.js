import mongoose from 'mongoose';

// define el esquema para los documentos PDF
const pdfSchema = new mongoose.Schema({
  nombre: String,
  folio: Number,
  area: String,
  vigencia: String,
  archivo: Buffer},{
    timestamps:true,
    versionKey:false
  }
);

// exporta el modelo para los documentos PDF
export default mongoose.model('PDF', pdfSchema);
