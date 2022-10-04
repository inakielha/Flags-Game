import express from "express"
require('dotenv').config()
const userRouter = require("./routes/users")
const flagsRouter = require("./routes/flags")
const userCapitalRouter = require("./routes/capitalUsers")

const {dbConnection} = require("./db/config")
const cors = require('cors')


const app = express()
app.use(cors())

dbConnection()
app.set("port", process.env.PORT || 3000)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json());

app.use("/users", userRouter);
app.use("/flags", flagsRouter);
app.use("/userCapital", userCapitalRouter);


app.listen(app.get("port"),()=>{
    console.log("server is on port" + " " + process.env.PORT)
})