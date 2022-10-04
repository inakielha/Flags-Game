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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const axios_1 = __importDefault(require("axios"));
const Country = require("../models/flags");
const saveAllFlags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield axios_1.default.get("https://restcountries.com/v3.1/all");
        const allFlags = info.data;
        if (allFlags[0].name) {
            allFlags.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    let flag = new Country({
                        name: el.name.common,
                        capital: el.capital[0],
                        image: el.flags.png
                    });
                    yield flag.save();
                }
                catch (e) {
                    console.log(e);
                }
            }));
            res.send("mira la base de datos boboo");
        }
        else
            res.send("no se q paso");
    }
    catch (e) {
        console.log(e);
        res.status(404).json({ ok: false, msg: e });
    }
});
const getAllFlags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allFlags = yield Country.find({});
        if (allFlags[0].name)
            return res.json({ ok: true, msg: allFlags });
        res.json({ ok: true, msg: "No se encontro nada en la Db" });
    }
    catch (e) {
        console.log(e);
        res.status(404).json({ ok: false, error: e });
    }
});
module.exports = {
    getAllFlags,
    saveAllFlags
};
