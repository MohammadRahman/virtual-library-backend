"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var env_schema_1 = require("env-schema");
var typebox_1 = require("@sinclair/typebox");
var schema = typebox_1.Type.Object({
    PORT: typebox_1.Type.Number({
        default: process.env.PORT
    }),
    DATABASE_URL: typebox_1.Type.String({
        default: process.env.DATABASE_URL
    }),
    SALT_ROUND: typebox_1.Type.Number({
        default: process.env.SALT_ROUND
    }),
    JWT_SECRET: typebox_1.Type.String({
        default: process.env.JWT_SECRET
    })
});
exports.config = (0, env_schema_1.envSchema)({
    dotenv: true,
    schema: schema
});
