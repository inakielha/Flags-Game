import Router from "express"
const {check} = require("express-validator")
const router = Router()
const {createTopPlayer,getlastTopPlayer,getTopTenPlayers} = require("../controllers/capitalUsers")

router.post("/",
[
  check("nickName","the nickname is required").not().isEmpty(),  
],
createTopPlayer
)
router.get("/",getlastTopPlayer)

router.get("/bestPlayers",getTopTenPlayers)

module.exports = router