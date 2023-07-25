import soliM from "../models/model.soli";
import User from "../models/model.user";
import Rol from "../models/model.roles";
import { userInfo } from "os";
const fs = require("fs").promises;
const reader = require("fs");
const PDFDocument = require("pdfkit");
const PDFParser = require("pdf-parse");

exports.uploadsoli = async (req, res) => {
  try{
 
  const nombredelsolicitante = req.body.nombredelsolicitante;

  const userid = req.body.userid;
  
  const folio = req.body.folio;
  
  const area = req.body.area;

  const fechadesoli=req.body.fechadesoli;

  const fechadeefect=req.body.fechadeefect;

  const razoncambio=req.body.razoncambio;

  const Alcance=JSON.parse(req.body.Alcance);

  const epytit=JSON.parse(req.body.epytit);

  const cambiod=req.body.cambiod;

  const cambioa=req.body.cambioa;

  const capacitacion=req.body.capacitacion;

  const capacitaciondesc=req.body.capacitaciondesc;

  const evaluacion=req.body.evaluacion;

  const evaluaciondesc=req.body.evaluaciondesc;

  const porqueno=req.body.porqueno;

  const requericalif=req.body.requericalif;

  const nocalif=req.body.nocalif;

  const aprre=req.body.aprre;

  const pruebas=req.body.pruebas;

  const Responsablemod=req.body.Responsablemod;

  const fechaini=req.body.fechaini;

  const fechater=req.body.fechadeefect;

  const aprobacionsoli = false;

  const concluido = false;

  let revisoresIds = [];
  const roles = await Rol.find({name:{$in: ["Revisor", "SuperUser"]}});
  const userR = await User.find({ rol: {$in: roles}});
  userR.forEach(user => {
    revisoresIds.push(user.id);
      });

  let anexoDoc;

  if (req.file) {
    const archivoPath = req.file.path;
    anexoDoc = reader.readFileSync(archivoPath);
  }

  const soli = new soliM({
    nombredelsolicitante: nombredelsolicitante,
    userid:userid,
    folio: folio,
    area: area,
    fechadesoli:fechadesoli,
    fechadeefect:fechadeefect,
    razoncambio:razoncambio,
    Alcance:Alcance,
    epytit:epytit,
    cambiod:cambiod,
    cambioa:cambioa,
    capacitacion:capacitacion,
    capacitaciondesc:capacitaciondesc,
    evaluacion:evaluacion,
    evaluaciondesc:evaluaciondesc,
    porqueno:porqueno,
    requericalif:requericalif,
    nocalif:nocalif,
    aprre:aprre,
    pruebas:pruebas,
    Responsablemod:Responsablemod,
    fechaini:fechaini,
    fechater:fechater,
    aprobacions:aprobacionsoli,
    concluido:concluido,
    estado:revisoresIds
  });

  if (anexoDoc) {
    soli.anexo = anexoDoc;
  }

  await soli.save();

  if (req.file){
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`El archivo ${req.file.path} ha sido eliminado correctamente`);
    });
  }

  console.log();

  res.send("El archivo PDF se agrego correctamente");
  
  }catch(error){
    return res.status(401).json('No se pudo guardar el archivo')

  }

};

export const revision = async (req, res) => {
  try {
    const updatedSoli = await soliM.findOneAndUpdate(
      { _id: req.params.soliId },
      {
        $pull: { estado: req.body.userid },
        $push: { revisados: req.body.username }
      },
      { new: true }
    );
    res.status(200).json(updatedSoli);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el documento' });
  }
};

export const rechazar = async (req, res) => {
  try {
    const RechazarSoli = await soliM.findOneAndUpdate(
      { _id: req.params.soliId },
      {
        $push: { rechazaron: req.body.username }
      },
      { new: true }
    );
    res.status(200).json(RechazarSoli);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el documento' });
  }
};

export const cambios = async (req, res) => {
  const id = req.params.soliId; // Obtén el ID de la solicitud a través de los parámetros de la solicitud
  const archivos = req.files; // Obtén la lista de archivos recibidos

  try {
    // Lee el contenido de cada archivo y almacénalos como buffers en un arreglo
    const buffers = await Promise.all(archivos.map(async archivo => {
      const contenido = await fs.readFile(archivo.path);
      return contenido;
    }));

    // Actualiza el campo "archivo" del documento correspondiente en la colección "soliM" con el arreglo de buffers
    const result = await soliM.findByIdAndUpdate(id, { archivo: buffers, comentarios: '' }, { new: true });

    archivos.forEach(archivo => {
    if (archivo){
      fs.unlink(archivo.path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
  })
    
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar los archivos' });
  }
};

export const aprobacions = async (req, res) => {
  try {
    const aprosoli = await soliM.findOneAndUpdate(
      { _id: req.params.soliId },
      { aprobacions: true },
      { new: true }
    );
    res.status(200).json(aprosoli);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el documento' });
  }
};

export const concluido = async (req, res) => {
  try {
    const concluir = await soliM.findOneAndUpdate(
      { _id: req.params.soliId },
      { concluido: true },
      { new: true }
    );
    res.status(200).json(concluir);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el documento' });
  }
};

export const comentarios = async (req, res) => {
  try {
    const comentar = await soliM.findOneAndUpdate(
      { _id: req.params.soliId },
      { comentarios: req.body.textarea },
      { new: true }
    );
    res.status(200).json(comentar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el documento' });
  }
};

export const actualizar = async (req, res) => {
  try {
    const folio = await soliM.findOneAndUpdate(
      { _id: req.params.soliId },
      { folio: req.body.folio },
      { new: true }
    );
    res.status(200).json(folio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el documento' });
  }
};



export const getsoli = async (req, res) => {
    const manuals = await soliM.find();
  
    res.json(manuals);
  };

  export const getsolibyID = async (req, res) => {
    const manuals = await soliM.findOne({_id: req.params.soliId});
  
    res.json(manuals);
  };