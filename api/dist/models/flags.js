"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CountryInfoSchema = new mongoose_1.Schema({
    name: {
        unique: true,
        type: String,
        required: true
    },
    image: {
        type: String,
        unique: true,
        required: true
    },
    capital: {
        type: String,
        unique: true,
        required: true
    }
});
module.exports = (0, mongoose_1.model)('Country', CountryInfoSchema);
