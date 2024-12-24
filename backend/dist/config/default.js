"use strict";
// config/default.ts
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
    protocol: "http",
    host: "localhost",
    origin: "https://localhost:4000",
    secretKey: "YElq5hKf8vjohgCQ",
    dbUri: "mongodb+srv://tasksApp:YElq5hKf8vjohgCQ@cluster0.et8rk.mongodb.net/tempDB?retryWrites=true&w=majority"
};
exports.default = config;
