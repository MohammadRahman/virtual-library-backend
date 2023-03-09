"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
var pino_1 = __importDefault(require("pino"));
exports.log = (0, pino_1.default)({
    transport: {
        target: 'pino-pretty'
    },
    pid: false
});
