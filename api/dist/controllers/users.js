"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const TopPlayer = require("../models/user");
const getTopTenPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allPlayers = yield TopPlayer.find({});
        let arr = allPlayers.sort((a, b) => {
            if (a.points > b.points)
                return -1;
            else if (a.points < b.points)
                return 1;
            else if (a.points === b.points)
                return 1;
            else
                return 0;
        });
        res.json({ ok: true, msg: arr });
    }
    catch (e) {
        res.status(404).json({ ok: false, msg: e });
    }
});
const getlastTopPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPlayers = yield TopPlayer.find({});
        let lowerRanked = 1000;
        allPlayers.forEach((el) => {
            if (el.points < lowerRanked)
                lowerRanked = el.points;
        });
        res.json({ ok: true, points: lowerRanked });
    }
    catch (e) {
        res.status(404).json({ ok: false, msg: e });
    }
});
const createTopPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickName, points } = req.body;
    try {
        const players = yield TopPlayer.find({ points: { $gt: points } });
        if (players.length < 10) {
            let newTopPlayers = new TopPlayer({
                nickName,
                points
            });
            const badPlayers = yield TopPlayer.find({ points: { $lt: points } });
            if (badPlayers) {
                let lowerPLayerRanked = 1000;
                badPlayers.forEach((ele) => {
                    if (ele.points < lowerPLayerRanked)
                        lowerPLayerRanked = ele.points;
                });
                yield TopPlayer.deleteOne({ points: lowerPLayerRanked });
            }
            yield newTopPlayers.save();
            res.json({ ok: true, msg: "top 10" });
        }
        else {
            res.json({ ok: true, msg: "not top 10" });
        }
    }
    catch (e) {
        res.status(404).json({ ok: false, msg: e });
    }
});
module.exports = {
    createTopPlayer,
    getlastTopPlayer,
    getTopTenPlayers
};
