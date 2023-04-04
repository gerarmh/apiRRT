import {ROLES} from "../models/model.roles";
export const RoleChecker = (req, res, next) => {
  if (req.body.rol) {
    for (let i = 0; i < req.body.rol.length; i++) {
      if (!ROLES.includes(req.body.rol[i])) {
        return res.status(400).json({
            message: `Rol ${req.body.rol[i]} does not exist`,
          });
      }
    }
  }
  next();
};
