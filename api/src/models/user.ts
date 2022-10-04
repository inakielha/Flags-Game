import { Schema, model } from "mongoose";

const TopPlayerSchema = new Schema({
nickName: {
    type: String,
    required: true
},
points: {
    type: Number,
}
})
module.exports = model('TopPlayer', TopPlayerSchema)
