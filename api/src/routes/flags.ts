import Router  from "express"
const {check} = require("express-validator")
const router = Router()
const {getAllFlags,saveAllFlags} = require("../controllers/flags")

router.get("/noUsar", saveAllFlags)
router.get("/",getAllFlags)
module.exports = router