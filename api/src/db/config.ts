import mongoose from "mongoose";
require('dotenv').config()

const dbConnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION||"test");
        console.log("DB ONLINE")
    } catch(e){
        console.log(e)
        throw new Error("error al inicializar la base de datos")
    }
}
module.exports = {
    dbConnection
}