import manual from "../models/model.manual";
const PDFDocument = require('pdfkit');
//import PDF from'../models/model.manual';

exports.uploadPDF = async (req, res) => {
  const nombre = req.body.nombre;
  const folio = req.body.folio;
  const area = req.body.area;
  const archivo = req.body.buffer;
  console.log(req.body.nombre);

  const doc = new PDFDocument();

  doc.text(`nombre: ${nombre}`);
  doc.text(`folio: ${folio}`);
  doc.text(`area: ${area}`);

  const buffer = await new Promise((resolve, reject) => {
    const chunks = [];
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.end();
  });

  const pdf = new manual({
    nombre: nombre,
    folio: folio,
    area: area,
    archivo: buffer,
  });

  await pdf.save();
  console.log();

  res.send('El archivo PDF se ha guardado correctamente en la base de datos.');
};

//export const createmanual = async (req, res) => {
//  const { Name, Area, Folio, ImgUrl } = req.body;
//
//  const newprocedimiento = manual({ Name, Area, Folio, ImgUrl });
//
//  console.log(req.body);
//
//  const manualsave = await newprocedimiento.save();
//
//  res.status(201).json(manualsave);
//};
export const getmanuals = async (req, res) => {
  const manuals = await manual.find();

  res.json(manuals);
};
export const getmanualById = async (req, res) => {
  const manuals = await manual.findOne({Folio:req.params.Folio});
  res.status(200).json(manuals);
};

export const updatemanualById = async (req, res) => {
  const Updatedmanual = await manual.findByIdAndUpdate(
    req.params.manualId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(Updatedmanual);
};
export const deletemanualById = async (req, res) => {
  const { manualId } = req.params;

  await manual.findByIdAndDelete(manualId);

  // code 200 is ok too
  res.status(200).json();
};

export const getmanualbyOCR = async (req, res) => {};
