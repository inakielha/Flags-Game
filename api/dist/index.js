"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const userRouter = require("./routes/users");
const flagsRouter = require("./routes/flags");
const { dbConnection } = require("./db/config");
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
dbConnection();
app.set("port", process.env.PORT || 3000);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express_1.default.json());
app.use("/users", userRouter);
app.use("/flags", flagsRouter);
app.listen(app.get("port"), () => {
    console.log("server is on port" + " " + process.env.PORT);
});
