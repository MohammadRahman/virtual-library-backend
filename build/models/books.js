"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOOK_MODEL = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var user_1 = require("./user");
var bookSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: user_1.USER_MODEL
    },
    readCounts: {
        type: Number,
        default: 0
    },
    readBy: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: user_1.USER_MODEL
        }]
}, { timestamps: true });
exports.BOOK_MODEL = mongoose_1.default.model('books', bookSchema);
