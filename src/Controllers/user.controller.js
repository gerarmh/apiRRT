import user from '../models/model.user'
import modelroles from '../models/model.roles'



export const createUser = async (req, res) => {
  try {
    const { username, employenumber, password, rol } = req.body;

    const rolesFound = await modelroles.find({ name: { $in: rol} });

    // creating a new User
    const newuser = new user({
      username,
      employenumber,
      password,
      rol: rolesFound.map((Rol) => Rol._id),
    });
    
    //predeterminated user

    if (rol) {
      const foundrol = await modelroles.find({ name: { $in: rol } });
      newuser.rol = foundrol.map((Rol) => Rol._id);
    } else {
      const Rol = await modelroles.findOne({ name: "CommonUser" });
      newuser.rol = [Rol._id];
    }

    // encrypting password
    newuser.password = await user.encryptPassword(newuser.password);


    // saving the new user
    const savedUser = await newuser.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      employenumber: savedUser.employenumber,
      rol: savedUser.rol,
    });
  } catch (error) {
    console.error(error);
  }
};

