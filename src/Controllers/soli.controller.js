import soliM from "../models/model.soli";

export const createsoli = async (req, res) => {
    const {nombredelsolicitante,folio,area,fechadesoli,fechadeefect,razoncambio,Alcance,epytit,cambiod,cambioa,capcitacion,evaluacion,porqueno,requericalif,nocalif,aprre,pruebas,Responsablemod,fechaini,fechater} = req.body;
    const newprocedimiento = soliM({nombredelsolicitante,folio,area,fechadesoli,fechadeefect,razoncambio,Alcance,epytit,cambiod,cambioa,capcitacion,evaluacion,porqueno,requericalif,nocalif,aprre,pruebas,Responsablemod,fechaini,fechater});
    console.log(req.body);
    const solisave = await newprocedimiento.save();
    res.status(201).json(solisave);
  };
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