"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var router_1 = require("../router");
var express_rate_limit_1 = require("express-rate-limit");
var response_time_1 = __importDefault(require("response-time"));
var metrics_1 = require("./metrics");
function createServer() {
    var app = (0, express_1.default)();
    var limiter = (0, express_rate_limit_1.rateLimit)({
        windowMs: 1 * 60 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
    });
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(limiter);
    app.use((0, response_time_1.default)(function (req, res, time) {
        if (req.originalUrl) {
            metrics_1.apiResponseTimeHistogram.observe({
                method: req.method,
                route: req.originalUrl,
                status_code: res.statusCode
            }, time * 1000);
        }
    }));
    (0, router_1.routes)(app);
    return app;
}
exports.createServer = createServer;
