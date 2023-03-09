"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyBooks = exports.getBookListsHandler = exports.updateCountAndStoreUserId = exports.createNewBookHandler = void 0;
var books_1 = require("../models/books");
var user_1 = require("../service/user");
function createNewBookHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, book, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, user_1.findOneUserByEmail)(req.user)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, books_1.BOOK_MODEL.create(__assign({ author: user === null || user === void 0 ? void 0 : user._id }, req.body))];
                case 2:
                    book = _a.sent();
                    return [2 /*return*/, res.status(201).json({
                            message: 'success',
                            book: book
                        })];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.status(400).json({
                            message: error_1
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createNewBookHandler = createNewBookHandler;
function updateCountAndStoreUserId(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var book, user, updateBookAttrs, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, books_1.BOOK_MODEL.findOne({ _id: req.params.id })];
                case 1:
                    book = _a.sent();
                    return [4 /*yield*/, (0, user_1.findOneUserByEmail)(req.user)];
                case 2:
                    user = _a.sent();
                    if (!book) return [3 /*break*/, 4];
                    return [4 /*yield*/, books_1.BOOK_MODEL.findOneAndUpdate({ name: book.name }, { readCounts: book.readCounts + 1, readBy: user === null || user === void 0 ? void 0 : user._id }, { new: true })];
                case 3:
                    updateBookAttrs = _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            message: 'ok',
                            updateBookAttrs: updateBookAttrs
                        })];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.status(400).json({
                            message: error_2
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateCountAndStoreUserId = updateCountAndStoreUserId;
function getBookListsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var books, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, books_1.BOOK_MODEL.find({}).populate('author', "name").sort({ createdAt: -1 })];
                case 1:
                    books = _a.sent();
                    if (books.length === 0) {
                        return [2 /*return*/, res.status(200).json({
                                message: 'No books available'
                            })];
                    }
                    // redis.set('lists', JSON.stringify(books), 'EX', 30)
                    return [2 /*return*/, res.status(200).json({
                            message: 'ok',
                            source: 'API',
                            books: books
                        })];
                case 2:
                    error_3 = _a.sent();
                    return [2 /*return*/, res.status(400).json({
                            message: error_3
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBookListsHandler = getBookListsHandler;
function getMyBooks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, books, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, user_1.findOneUserByEmail)(req.user)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, books_1.BOOK_MODEL.find({ author: user === null || user === void 0 ? void 0 : user._id })];
                case 2:
                    books = _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            message: 'ok',
                            books: books
                        })];
                case 3:
                    error_4 = _a.sent();
                    return [2 /*return*/, res.status(400).json({
                            message: error_4
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getMyBooks = getMyBooks;
