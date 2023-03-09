"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
var zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required' }).min(1, 'Name can not be empty'),
        email: (0, zod_1.string)({ required_error: 'Email is required' }).email('Enter a valid email'),
        password: (0, zod_1.string)({ required_error: 'Password is required' }).min(5, 'too short, 5 chars minimum')
    })
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: 'Email is required' }).email('Enter a valid email'),
        password: (0, zod_1.string)({ required_error: 'Password is required' }).min(5, 'too short, 5 chars minimum')
    })
});
