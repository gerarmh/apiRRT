import user from "../models/model.user";
import jwt from "jsonwebtoken";
import config from "../config";
import modelRoles from "../models/model.roles";


export const singup = async (req, res) => {
  const { username, employenumber, password, rol } = req.body;

 // console.log(req.body);

  const newuser = new user({
    username,
    employenumber,
    password: await user.encryptPassword(password),
  });

  if (rol) {
    const foundrol = await modelRoles.find({ name: { $in: rol } });
    newuser.rol = foundrol.map((Rol) => Rol._id);
  } else {
    const Rol = await modelRoles.findOne({ name: "CommonUser" });
    newuser.rol = [Rol._id];
  }

  const saveduser = await newuser.save();
  //console.log(saveduser);

  const token = jwt.sign({ id: saveduser._id }, config.SECRET, {
    expiresIn: 86400, //1 day
  });

  res.status(200).json({ token });
};

export const singin = async (req, res) => {
  const userfound = await user
    .findOne({ employenumber: req.body.employenumber })
    .populate("rol");

  if (!userfound)
    return res.status(400).json({ message: "User not found on the system" });

    const matchPassword = await user.comparePassword(
      req.body.password,
      userfound.password
    );

  if (!matchPassword)
    return res.status(403).json({
      token: null,
      message: "Invalid Password",
    });
  const token = jwt.sign({ id: userfound._id }, config.SECRET, {
    expiresIn: 86400,
  });

//  console.log(userfound.password)
//  console.log(req.body.password)
//  console.log(matchPassword)
  res.json({ token})
  
};
