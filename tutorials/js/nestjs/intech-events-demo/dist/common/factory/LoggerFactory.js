"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerConfig = void 0;
const winston_1 = require("winston");
class LoggerConfig {
    constructor() {
        this.options = {
            exitOnError: false,
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.printf(msg => {
                return `${msg.timestamp} [${msg.level}] - ${msg.message}`;
            })),
            transports: [new winston_1.transports.Console({ level: "debug" })],
        };
    }
    console() {
        return this.options;
    }
}
exports.LoggerConfig = LoggerConfig;
//# sourceMappingURL=LoggerFactory.js.map