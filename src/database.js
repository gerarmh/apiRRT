import mongoose from "mongoose";
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1/RRT", {
    
    
   
})

    .then(db => console.log('RRT API IS ON LINE'))
    .catch(error => console.log(error))