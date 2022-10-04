"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TopPlayerSchema = new mongoose_1.Schema({
    nickName: {
        type: String,
        required: true
    },
    points: {
        type: Number,
    }
});
module.exports = (0, mongoose_1.model)('TopPlayer', TopPlayerSchema);
