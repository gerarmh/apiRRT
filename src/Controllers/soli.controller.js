import soliM from "../models/model.soli";
import User from "../models/model.user";
import Rol from "../models/model.roles";
import { userInfo } from "os";
const fs = require("fs");
const PDFDocument = require("pdfkit");
const PDFParser = require("pdf-parse");

exports.uploadsoli = async (req, res) => {
  try{
 
  const nombredelsolicitante = req.body.nombredelsolicitante;
  
  const folio = req.body.folio;
  
  const area = req.body.area;

  const fechadesoli=req.body.fechadesoli;

  const fechadeefect=req.body.fechadeefect;

  const razoncambio=req.body.razoncambio;

  const Alcance=JSON.parse(req.body.Alcance);

  const epytit=req.body.epytit;

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


          // Obtener los IDs de los usuarios con rol revisor
    const revisores = await User.find({ rol: { $in: ['Revisor'] } });
    console.log(revisores)
    const revisoresIds = revisores.map((revisor) => revisor._id);

    // Agregar los IDs de los usuarios con rol revisor al campo estado del objeto soli
    soli.estado = revisoresIds;
      // Obtener los IDs de los usuarios con rol revisor
      //const userR = await User.find();
      //const roles = await Rol.find({id:{$in: userR.rol}})
      //console.log(roles)
      //
      //userR.forEach(user => {
        
      // Agregar los IDs de los usuarios con rol revisor al campo estado del objeto soli

  let anexoDoc;

  if (req.file) {
    const archivoPath = req.file.path;
    anexoDoc = fs.readFileSync(archivoPath);
  }

  const soli = new soliM({
    nombredelsolicitante: nombredelsolicitante,
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
    archivo: anexoDoc
  });

  await soli.save();
  
  fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`El archivo ${req.file.path} ha sido eliminado correctamente`);
  });

  console.log();
  res.send("El archivo PDF se agrego correctamente");
  }catch(error){
    return res.status(401).json('No se pudo guardar el archivo')

  }

};
//export const createsoli = async (req, res) => {
//    const {nombredelsolicitante,folio,area,fechadesoli,fechadeefect,razoncambio,Alcance,epytit,cambiod,cambioa,capcitacion,evaluacion,porqueno,requericalif,nocalif,aprre,pruebas,Responsablemod,fechaini,fechater} = req.body;
//    const newprocedimiento = soliM({nombredelsolicitante,folio,area,fechadesoli,fechadeefect,razoncambio,Alcance,epytit,cambiod,cambioa,capcitacion,evaluacion,porqueno,requericalif,nocalif,aprre,pruebas,Responsablemod,fechaini,fechater});
//    console.log(req.body);
//    const solisave = await newprocedimiento.save();
//    res.status(201).json(solisave);
//  };

export const revision = async (req, res) => {
    const Updatedmanual = await soliM.findByIdAndUpdate(
      req.params.soliId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(Updatedmanual);
  };

export const getsoli = async (req, res) => {
    const manuals = await soliM.find();
  
    res.json(manuals);
  };