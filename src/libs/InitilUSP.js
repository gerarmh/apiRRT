import { Promise } from 'mongoose';
import modelroles from '../models/model.roles'

export const createRoles = async()=> {

try{
    const count = await modelroles.estimatedDocumentCount(); 
if (count > 0)return;

const values = await Promise.all([
    
    new modelroles({name:'SuperUser'}).save(),
    new modelroles({name:'Revisor'}).save(),
    new modelroles({name:'CommonUser'}).save(),
    
      
]);
  console.log(values);
}catch (error){
    console.error(error);
}
};
