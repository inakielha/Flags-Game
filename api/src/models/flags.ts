import { Schema, model } from "mongoose";

const CountryInfoSchema = new Schema({
name: {
    unique: true,
    type: String,
    required: true
},
image: {
    type: String,
    unique:true,
    required:true
},
capital:{
    type:String,
    unique:true,
    required:true
}
})
module.exports = model('Country', CountryInfoSchema)