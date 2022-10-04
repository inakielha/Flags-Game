"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { check } = require("express-validator");
const router = (0, express_1.default)();
const { createTopPlayer, getlastTopPlayer, getTopTenPlayers } = require("../controllers/users");
router.post("/", [
    check("nickName", "the nickname is required").not().isEmpty(),
], createTopPlayer);
router.get("/", getlastTopPlayer);
router.get("/bestPlayers", getTopTenPlayers);
module.exports = router;
