"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { check } = require("express-validator");
const router = (0, express_1.default)();
const { getAllFlags, saveAllFlags } = require("../controllers/flags");
router.get("/noUsar", saveAllFlags);
router.get("/", getAllFlags);
module.exports = router;
