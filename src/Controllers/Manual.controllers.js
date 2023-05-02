import manual from "../models/model.manual";
const fs = require("fs");

exports.uploadPDF = async (req, res) => {
  const nombre = req.body.nombre;
  const folio = req.body.folio;
  const area = req.body.area;
  const vigencia = req.body.vigencia;
  const date = req.body.date;
  const archivo = req.file;
  const archivoPath = archivo.path;
  const pdfDoc = fs.readFileSync(archivoPath);



  const pdf = new manual({
    nombre: nombre,
    folio: folio,
    area: area,
    vigencia: vigencia,
    date: date,
    archivo: pdfDoc,
  });

  await pdf.save();

    // Eliminar archivo de la ruta después de guardarlo en la base de datos
    fs.unlink(archivoPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`El archivo ${archivoPath} ha sido eliminado correctamente`);
    });
  
  console.log();

  res.send("El archivo PDF se ha guardado correctamente en la base de datos.");
};

export const getmanuals = async (req, res) => {
  const manuals = await manual.find();

  res.json(manuals);
};
export const getmanualById = async (req, res) => {
  const manuals = await manual.findOne({ _id: req.params.manualId });
  res.status(200).json(manuals);
};

export const updatemanualById = async (req, res) => {
  const id = req.params.manualId;
  console.log(id)

  try {
    const Updatedmanual = await manual.findByIdAndUpdate(id, {vigencia: "obsoleto"}, {new: true});
      res.status(200).json(Updatedmanual);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Ha ocurrido un error al actualizar'});
  }

};


export const deletemanualById = async (req, res) => {
  const { manualId } = req.params;

  await manual.findByIdAndDelete(manualId);

  // code 200 is ok too
  res.status(200).json();
};

export const getmanualbyOCR = async (req, res) => {};
