import { Schema, model } from "mongoose";

const TopPlayerCapitalSchema = new Schema({
    nickName: {
        type: String,
        required: true
    },
    points: {
        type: Number,
    }
    })
    module.exports = model('TopPlayerCapital', TopPlayerCapitalSchema)