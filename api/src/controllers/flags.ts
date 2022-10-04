const mongoose = require("mongoose")
import axios from "axios"
const Country = require("../models/flags")
import { RequestHandler } from "express"
import { FinalFlag, FlagInfo } from "../interface/flags"

const saveAllFlags: RequestHandler = async (req,res)=>{
    try{
        const info = await axios.get("https://restcountries.com/v3.1/all");
        const allFlags: Array<FlagInfo> = info.data
        if(allFlags[0].name){
            allFlags.forEach(async (el)=>{
                try{

                    let flag  = new Country({
                        name: el.name.common,
                        capital:el.capital[0],
                        image: el.flags.png
                    })
                    await flag.save()
                } catch (e){
                    console.log(e)
                }
            })
            res.send("mira la base de datos boboo")
        }else res.send("no se q paso")

    }catch (e){
        console.log(e)
        res.status(404).json({ok:false,msg:e})
    }
}
const getAllFlags:RequestHandler = async (req,res)=>{
    try {
        const allFlags:Array<FinalFlag> = await Country.find({})
        if(allFlags[0].name)  return res.json({ok:true,msg:allFlags})
        res.json({ok:true,msg:"No se encontro nada en la Db"})

    }catch (e){
        console.log(e)
        res.status(404).json({ok:false,error:e})
    }
}
module.exports = {
    getAllFlags,
    saveAllFlags
}