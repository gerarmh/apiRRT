import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'


const userschema = new Schema({
    username:{
        type:String,
        unique:true
    },
    employenumber:{
        type:Number,
        unique:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    rol:[
        {
            
            ref:"Rol",
            type:Schema.Types.ObjectId
        },
    ],
},
{
    timestamps:true,
    versionKey:false
}
);
userschema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
  userschema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
  }
  
  userschema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  })
export default model('user', userschema);