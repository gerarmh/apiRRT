import {Schema, model} from 'mongoose'

const Manualeschema = new Schema({
    Name: String,
    Area: String,
    Folio: Number,
    ImgUrl:String 

},{
timestamps:true, 
versionKey:false

})

export default model ('manual', Manualeschema);
