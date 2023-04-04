import {Schema, model} from "mongoose";
export const ROLES =["SuperUser", "Revisor", "CommonUser"]
const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model ("Rol", roleSchema)