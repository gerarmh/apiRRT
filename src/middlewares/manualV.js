import manual from '../models/model.manual';
export const Mduplicity = async (req, res, next) => {
      
      const folioFound = await manual.findOne({folio : req.body.folio});
      if (folioFound) {
        return res.status(400).json({ message: "The procedure folio already exists" });
      }
  
      next();
    
      
    };
//
//export const Mduplicity = async (req, res, next) => {
//    try {
//      const NameFound = await manual.findOne({Name:req.body.n});
//      if (NameFound)
//        return res.status(400).json({ message: "The procedure name alrady exists" });
//  
//      const FolioFound = await manual.findOne({Folio:req.body.Folio});
//      if (FolioFound)
//        return res.status(400).json({ message: "The procedure folio already exists" });
//  
//      next();
//    } catch (error) {
//      res.status(500).json({ message: error.message });
//    }
//  };
  