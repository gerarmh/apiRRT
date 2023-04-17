import mongoose from 'mongoose';

// define el esquema para los documentos PDF
const pdfSchema = new mongoose.Schema({
  nombre: String,
  folio: Number,
  area: String,
  archivo: Buffer
});

// exporta el modelo para los documentos PDF
export default mongoose.model('PDF', pdfSchema);
