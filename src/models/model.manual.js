import mongoose from 'mongoose';

// define el esquema para los documentos PDF
const pdfSchema = new mongoose.Schema({
  nombre: String,
  folio: Number,
  area: String,
  vigencia: String,
  date:{
    type: String,
    default: () => new Date().toISOString().substr(0, 10)
  },
  archivo: Buffer},{
    timestamps:true
  }
);

// exporta el modelo para los documentos PDF
export default mongoose.model('PDF', pdfSchema);
