import jwt from "jsonwebtoken";
import config from "../config";
import user from "../models/model.user";
import Rol from "../models/model.roles";

export const verifytoken = async (req, res, next) => {
try {
    const token = req.headers["x-access-token"];

   // console.log(token);
    if (!token) return res.status(403).json({ message: "Any token provided" })
    const decoded = jwt.verify(token, config.SECRET);
    req.UserId=decoded.id;
  
    const decodeduser = await user.findById(req.UserId, { password: 0 })
  
    if (!decodeduser) return res.status(404).json({ message: 'Any user Found'})
  
    //console.log(decodeduser)
    next();
} catch (error) {
return res.status(405).json({ message: 'Unautorized Transite of this Route'})    
}
};

export const isBoth = async (req, res, next) => {
    
        
    const userS = await user.findById(req.UserId)
    const roles = await Rol.find({_id: {$in:userS.rol} });
    for (let i = 0; i < roles.length; i++) {
     if ((roles[i].name === "SuperUser")||(roles[i].name === "Revisor")) {
       next();
       return;
       
     }
   //  console.log(userS.rol);
          }
    return res.status(426).json({message:'outside of your user limits'});
      
    //return res.status(500).send({ message: "error" });
    
};

export const isRevi = async (req, res, next) => {
  const userR = await user.findById(req.UserId)
  const roles = await Rol.find({_id:{$in: user.roles}})
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "Revisor") {
      next();
    }
      return;
    }
    return res.status(426).send({ message: "outside of your user limits" });
  }


  



export const isSuper = async (req, res, next) => {
  const userS = await user.findById(req.UserId)
  const roles = await Rol.find({_id: {$in:userS.rol} });
  for (let i = 0; i < roles.length; i++) {
   if (roles[i].name === "SuperUser") {
     next();
     return;
     
   }

        }
  return res.status(426).json({message:'outside of your user limits'});
    
}