import {ROLES} from "../models/model.roles";
import User from '../models/model.user';

export const duplicity = async (req, res, next) => {
  try {
    const userFound = await User.findOne({username: req.body.username});
    if (userFound)
      return res.status(400).json({ message: "The user already exists" });

    const email = await User.findOne({employenumber: req.body.employenumber});
    if (email)
      return res.status(400).json({ message: "The employenumber already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
