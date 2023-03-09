"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.veryfyToken = exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../utils/config");
function generateToken(payload) {
    return jsonwebtoken_1.default.sign({ payload: payload }, config_1.config.JWT_SECRET, { expiresIn: '1h' });
}
exports.generateToken = generateToken;
function veryfyToken(payload) {
    return jsonwebtoken_1.default.verify(payload, config_1.config.JWT_SECRET);
}
exports.veryfyToken = veryfyToken;
