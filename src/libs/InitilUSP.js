import { Promise } from 'mongoose';
import modelroles from '../models/model.roles'

export const createRoles = async()=> {

try{
    const count = await modelroles.estimatedDocumentCount(); 
if (count > 0)return;

const values = await Promise.all([
    
    new modelroles({name:'SuperUser'}).save(),//IsSuper
    new modelroles({name:'Revisor'}).save(),//IsRevi
    new modelroles({name:'CommonUser'}).save(),//IsCommon
    new modelroles({name:'Visualizador'}).save(),//IsV
    
]);
  console.log(values);
}catch (error){ 
    console.error(error);
}
};
