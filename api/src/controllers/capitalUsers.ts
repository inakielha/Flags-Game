const mongoose = require("mongoose")
const TopPlayerCapital = require("../models/capitalUsers")
import { RequestHandler } from "express"
import {PlayerTopRanked} from "../interface/player"

const getTopTenPlayers: RequestHandler = async (req,res)=>{
    try {
        let allPlayers : PlayerTopRanked[] = await TopPlayerCapital.find({})
        let arr: PlayerTopRanked[] = allPlayers.sort((a , b) => {
            if (a.points > b.points) return -1
            else if (a.points < b.points) return 1
            else if (a.points === b.points) return 1
            else return 0
        })
        res.json({ok:true,msg:arr})
    }catch(e){
        res.status(404).json({ok:false,msg:e})
    }
}
const getlastTopPlayer: RequestHandler = async (req,res)=>{
    try{
        const allPlayers: PlayerTopRanked[] = await TopPlayerCapital.find({})
        if (allPlayers.length < 10) return res.json({ok:true,points:0})
        let lowerRanked = 1000
        allPlayers.forEach((el)=>{
            if(el.points < lowerRanked) lowerRanked = el.points
        })
        res.json({ok:true,points:lowerRanked})
    }catch(e){
        res.status(404).json({ok:false,msg:e})
    }
}
const createTopPlayer: RequestHandler = async (req,res)=>{
    const {nickName,points} = req.body
    try {
        const players = await TopPlayerCapital.find({points:{$gt:points}})
        if(players.length < 10){
            let newTopPlayers = new TopPlayerCapital({
                nickName,
                points
            })
            const badPlayers:Array<PlayerTopRanked> = await TopPlayerCapital.find({points:{$lt:points}})
            if(badPlayers){
                let lowerPLayerRanked:number = 1000
                badPlayers.forEach((ele) => {
                    if(ele.points < lowerPLayerRanked) lowerPLayerRanked = ele.points
                });
                await TopPlayerCapital.deleteOne({points:lowerPLayerRanked})
            }
            await newTopPlayers.save()
            res.json({ok:true,msg:"top 10"})
        } else {
            res.json({ok:true,msg:"not top 10"})
        }
    }catch(e){
        res.status(404).json({ok:false,msg:e})
    }
}
module.exports = {
    createTopPlayer,
    getlastTopPlayer,
    getTopTenPlayers
}