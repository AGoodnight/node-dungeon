"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const chalk_1 = __importDefault(require("chalk"));
server_1.default.use(Logger);
function Logger(req, res, next) {
    console.log(chalk_1.default.blue(req.body));
}
